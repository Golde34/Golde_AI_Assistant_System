import pandas as pd
import joblib
import torch
from torch.utils.data import DataLoader
from sklearn import preprocessing
from sklearn import model_selection
from transformers import AdamW
from transformers import get_linear_schedule_with_warmup

from gaia_bot.models.bert import model_config
from gaia_bot.models.bert import dataset
from gaia_bot.models.bert import engine
from gaia_bot.models.bert.bert_model import EntityModel

def process_data(data_path):
    df = pd.read_csv(data_path, encoding="latin-1")
    df.loc[:, "Sentence #"] = df["Sentence #"].fillna(method="ffill")

    enc_pos = preprocessing.LabelEncoder()
    enc_tag = preprocessing.LabelEncoder()

    df.loc[:, "POS"] = enc_pos.fit_transform(df["POS"])
    df.loc[:, "Tag"] = enc_tag.fit_transform(df["Tag"])

    sentences = df.groupby("Sentence #")["Word"].apply(list).values
    pos = df.groupby("Sentence #")["POS"].apply(list).values
    tag = df.groupby("Sentence #")["Tag"].apply(list).values

    return sentences, pos, tag, enc_pos, enc_tag

def train():
# if __name__ == "__main__":
    sentences, pos, tag, enc_pos, enc_tag = process_data(model_config.TRAINING_FILE)

    meta_data = {
        "enc_pos": enc_pos,
        "enc_tag": enc_tag
    }

    joblib.dump(meta_data, "meta.bin")

    num_pos = len(list(enc_pos.classes_))
    num_tag = len(list(enc_tag.classes_))

    (
        train_sentences,
        test_sentences,
        train_pos,
        test_pos,
        train_tag,
        test_tag
    ) = model_selection.train_test_split(sentences, pos, tag, random_state=42, test_size=0.1)

    train_dataset = dataset.EntityDataset(
        texts=train_sentences, pos=train_pos, tags=train_tag
    )

    train_data_loader = DataLoader(
        train_dataset, batch_size=model_config.TRAIN_BATCH_SIZE, num_workers=4
    )

    valid_dataset = dataset.EntityDataset(
        texts=test_sentences, pos=test_pos, tags=test_tag
    )

    valid_data_loader = DataLoader(
        valid_dataset, batch_size=model_config.VALID_BATCH_SIZE, num_workers=1
    )

    device = torch.device("cuda")
    model = EntityModel(num_tag=num_tag, num_pos=num_pos)
    model.to(device)

    param_optimizer = list(model.named_parameters())
    no_decay = ["bias", "LayerNorm.bias", "LayerNorm.weight"]
    optimizer_parameters = [
        {
            "params": [
                p for n, p in param_optimizer if not any(nd in n for nd in no_decay)
            ],
            "weight_decay": 0.001,
        }, {
           "params": [
               p for n, p in param_optimizer if any(nd in n for nd in no_decay)
           ],
           "weight_decay": 0.0,
        },
    ]

    num_train_steps = int(len(train_sentences) / model_config.TRAIN_BATCH_SIZE * model_config.EPOCHS)
    optimizer = AdamW(optimizer_parameters, lr=3e-5)
    scheduler = get_linear_schedule_with_warmup(
        optimizer, num_warmup_steps=0, num_training_steps=num_train_steps
    )

    print("--Saving--")
    torch.save(model.state_dict(), model_config.MODEL_PATH)
    print("--Saved--")

    best_loss = 100
    for epoch in range(model_config.EPOCHS):
        train_loss = engine.train_fn(train_data_loader, model, optimizer, device, scheduler)
        test_loss = engine.eval_fn(valid_data_loader, model, device)
        print(f"Train Loss = {train_loss} / Valid Loss = {test_loss}")
        if test_loss < best_loss:
            print("--Saving--")
            torch.save(model.state_dict(), model_config.MODEL_PATH)
            print("--Saved--")
            best_loss = test_loss
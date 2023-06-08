import transformers

MAX_LEN = 128
TRAIN_BATCH_SIZE = 32
VALID_BATCH_SIZE = 8
EPOCHS = 10
BASE_MODEL_PATH = "gaia_bot/model/bert/input/bert-base-uncased"
MODEL_PATH = "gaia_bot/model/bert/src/model.bin"
TRAINING_FILE = "gaia_bot/model/bert/input/ner_dataset.csv"
META_MODEL = "gaia_bot/model/bert/src/meta.bin"
TOKENIZER = transformers.BertTokenizer.from_pretrained(
    BASE_MODEL_PATH,
    do_lower_case=True
)
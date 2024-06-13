import gaia_bot_v2
from gaia_bot_v2.kernel.configs.__config__ import __filename__
from gaia_bot_v2.domain.enums import InputMode
from gaia_bot.modules.local.models.task_detect.prompt_to_response.inference import model


ROOT_LOG_CONFIG = {
    'version': 1,
    'root': {
        'level': 'INFO',
        'handlers': ['file'],
    },
    'handlers': {
        'file': {
            'class': 'logging.handlers.RotatingFileHandler',
            'level': 'DEBUG',
            'formatter': 'detailed',
            'filename': __filename__,
            'mode': 'log',
            'maxBytes': 10000000,
            'backupCount': 3,
        },
    },
    'formatters': {
        'detailed': {
            'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        },
    }
}

DEFAULT_GENERAL_SETTINGS = {
    'assistant_name': 'gaia',
    'input_mode': InputMode.TEXT.value,
    'input_language': 'en',
    'response_in_speech': False
}

AI_MODEL_LOCATION = {
    'alpaca': './gaia_bot_v2/models/alpaca/golde_llama'
    # 'gpt2': "./gaia_bot/modules/local/models/gpt/model.pt",
    # 'task_detect': "./gaia_bot/modules/local/models/task_detect/prompt_to_response/TrainData.pth",
}
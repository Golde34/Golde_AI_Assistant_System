from gaia_bot.model.gpt.inference import inference
from gaia_bot.skills.assistant_skill import AssistantSkill
import re


class GPT2GenerateResponse(AssistantSkill):

    @classmethod
    def generate_response(cls, text, **kwargs):
        try:
            response = inference(inp=text)
            last_response = cls._format_response(response)
            cls.response(last_response)
            return last_response
        except Exception as e:
            cls.console_manager.console_output('Failed to generate response.')

    @staticmethod
    def _format_response(response):
        response_boundary = response.find("<bot>:") + len("<bot>:")
        extracted_sentence = response[response_boundary:].strip()
        return extracted_sentence
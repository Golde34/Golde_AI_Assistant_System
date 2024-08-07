import requests
import json
import os

from gaia_bot.kernel.configs.port_configs import PORTS, DOMAIN
from gaia_bot.kernel.configs.auth_config import USER_PROFILE
from gaia_bot.abilities.microservice_connections import MicroserviceConnection
from gaia_bot.domain.enums import AcronymsEnum


class AuthenticationConnector:
    def __init__(self, username, password):
        self.username = username
        self.password = password 
        self.auth_bash = PORTS['authentication_service']['shell_path']
        
        # instances
        self.gaia_port = PORTS['gaia_connector']['port']
        self.router = PORTS['authentication_service']['router']
        self.gaia_url = f"http://{DOMAIN}:{self.gaia_port}/{self.router}"
        
        self.microservice_state = MicroserviceConnection().call_microservice_by_name(AcronymsEnum.AS._value_)
    
    def activate_authentication_command(self):
        self.microservice_state.activate_service()
        
        token_string = self.authenticate_command()
        return token_string
        
    def call_login_api(self):
        username = USER_PROFILE['username']
        password = USER_PROFILE['password']
        
        response = requests.post(f"{self.gaia_url}" + "/sign-in", 
                                 json={'username': username, 'password': password})
        
        if response.status_code == 200:
            result = response.json()
            body = result['response']
            self._save_response_to_file(result['response'])
            if result['authenticated']:
                return body['data']['gaiaAutoSignin']['accessToken']
        else:
            return "Invalid credentials"
        
    def _save_response_to_file(self, result):
        filepath = "../../resources/authen_cache/token.json"
        
        script_dir = os.path.dirname(__file__)
        absolute_path = os.path.join(script_dir, filepath)
        
        os.makedirs(os.path.dirname(absolute_path), exist_ok=True)
        
        with open(absolute_path, 'w') as f:
            json.dump(result, f)
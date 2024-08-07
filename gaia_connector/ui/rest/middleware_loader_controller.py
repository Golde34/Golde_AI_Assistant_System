from flask import request

from ui import app
from kernel.utils.middleware_connection import MiddlewareConnection
from core.services.client.middleware_service import MiddlewareServiceRequest
from core.services.receiver.middleware_service import MiddlewareServiceReponse


middleware_loader_url = MiddlewareConnection('middleware_loader').url
middleware_service_request = MiddlewareServiceRequest(middleware_loader_url)
middleware_service_response = MiddlewareServiceReponse()

@app.route('/middleware/health-check', methods=['GET'])
def health_check():
    user_info = request.get_json()
    return middleware_service_response.health_service(user_info)

@app.route('/middleware/microservices-status', methods=['GET'])
def microservices_status():
    return middleware_service_request.microservices_status()

@app.route('/middleware/gaia-connect', methods=['GET'])
def gaia_connect():
    return middleware_service_response.gaia_connect()

@app.route('/middleware/status', methods=['GET'])
def status():
    return middleware_service_response.status()
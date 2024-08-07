from aiokafka import AIOKafkaProducer
import asyncio
import json
import os

# env variables
KAFKA_TOPIC = os.getenv('KAFKA_TOPIC')
KAFKA_BOOTSTRAP_SERVERS = os.getenv('KAFKA_BOOTSTRAP_SERVERS', 'localhost:9092')

async def send_message(loop):
    producer = AIOKafkaProducer(loop=loop, bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS)
    # get cluster layout and initial topic/partition leadership information
    await producer.start()
    try:
        # produce message
        value = {'text': 'some text'}
        print(f'Sending message with value: {value}')
        value_json = json.dumps(value).encode('utf-8')
        await producer.send_and_wait(KAFKA_TOPIC, value_json)
    finally:
        # wait for all pending messages to be delivered or expire.
        await producer.stop()

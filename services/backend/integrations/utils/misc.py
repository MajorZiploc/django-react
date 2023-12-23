import json


def parse_request_body(body: bytes):
    body_unicode = body.decode('utf-8')
    request_body = json.loads(body_unicode)
    return request_body

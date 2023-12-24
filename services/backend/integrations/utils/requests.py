import requests

def data_from_endpoint(data_request):
    try:
        response = data_request()
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        raise
    if response.ok:
        json_data = response.json()
        return json_data
    root_status_code = response.status_code // 100
    if root_status_code == 4:
        print(f"Client-side error: {response.status_code}")
        print(response.text)
    elif root_status_code == 5:
        print(f"Server-side error: {response.status_code}")
        print(response.text)
    else:
        print(f"Unexpected status code: {response.status_code}")
    return None

def get_data_from_endpoint(url):
    return data_from_endpoint(lambda: requests.get(url))

def post_data_to_endpoint(url, data):
    return data_from_endpoint(lambda: requests.post(url, json=data))

def delete_data_from_endpoint(url):
    return data_from_endpoint(lambda: requests.delete(url))

def put_data_to_endpoint(url, data):
    return data_from_endpoint(lambda: requests.put(url, json=data))

def patch_data_to_endpoint(url, data):
    return data_from_endpoint(lambda: requests.patch(url, json=data))

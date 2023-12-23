import requests

def get_data_from_endpoint(url):
    try:
        response = requests.get(url)
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

def post_data_to_endpoint(url, data):
    try:
        response = requests.post(url, json=data)
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
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
    return None

def delete_data_from_endpoint(url):
    try:
        response = requests.delete(url)
        if response.ok:
            print("Delete successful")
        root_status_code = response.status_code // 100
        if root_status_code == 4:
            print(f"Client-side error: {response.status_code}")
            print(response.text)
        elif root_status_code == 5:
            print(f"Server-side error: {response.status_code}")
            print(response.text)
        else:
            print(f"Unexpected status code: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
    return None

def put_data_to_endpoint(url, data):
    try:
        response = requests.put(url, json=data)
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
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
    return None

def patch_data_to_endpoint(url, data):
    try:
        response = requests.patch(url, json=data)
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
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
    return None

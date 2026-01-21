import requests
import os
import re
import json
import traceback
from urllib.parse import urlparse
from pathlib import Path

auth = 'Bearer '
base_dir = './data'
header = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    'Authorization': auth,
    'Origin': 'https://www.hiclass.net',
    'Priority': 'u=1, i',
    'Referer': 'https://www.hiclass.net/',
    'Sec-Ch-Ua': '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"Windows"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36'
}

def requests_get(url, header):
    for i in range(5):
        res = requests.get(url, headers=header)
        if res.status_code >= 300:
            print(f"retry({i+1}): {url}")
            continue
        return res

    with open(f"{base_dir}/error_log.txt", "a") as f:
        f.write(f"Exception occurred: {url}")
        traceback.print_exc(file=f)
        f.write("\n")
    raise Exception(f"err: {url}")

def requests_post(url, header):
    for i in range(5):
        res = requests.post(url, headers=header)
        if res.status_code >= 300:
            print(f"retry({i+1}): {url}")
            continue
        return res

    with open(f"{base_dir}/error_log.txt", "a") as f:
        f.write(f"Exception occurred: {url}")
        traceback.print_exc(file=f)
        f.write("\n")
    raise Exception(f"err: {url}")


def download_get(url, file_name, header):
    if not os.path.isfile(file_name) or os.path.getsize(file_name) == 0:
        with open(file_name, "wb") as file:
            response = requests_get(url, header)
            file.write(response.content)

def download_post(url, file_name, header):
    if not os.path.isfile(file_name) or os.path.getsize(file_name) == 0:
        with open(file_name, "wb") as file:
            response = requests_post(url, header)
            file.write(response.content)

def makedirs(dirs):
    if not os.path.isdir(dirs):
        os.makedirs(dirs)

def get_comment_reply_json():
    board_list = None
    with open(f'{base_dir}/board_list.json', 'r', encoding='utf-8') as f:
        board_list = json.load(f)
    print(board_list)
    classId = board_list['classId']
    for board in board_list['boardList']:
        boardId = board['boardId']
        boardNm = board['boardNm']
        # if boardId != "03b07a7f-8ea4-4e2c-951b-fed57d63a6a1":
        #     continue
        # if boardId in ["03b07a7f-8ea4-4e2c-951b-fed57d63a6a1", "0d888960-c807-4635-a038-d3f3c3698871"]:
        #     continue
        print(f"{boardNm} - {boardId}")
        attach_dir = f'{base_dir}/{boardId}_attach'
        comment_dir = f'{base_dir}/{boardId}_comment'
        makedirs(attach_dir)

        commentFiles = os.listdir(comment_dir)
        for commentFile in commentFiles:
            commentJson = f'{comment_dir}/{commentFile}'
            print(commentJson)
            with open(commentJson, 'r', encoding='utf-8') as f:
                post_data = json.load(f)
                # print(post_data)
                posts = post_data['_embedded']['postComments']
                if posts is None:
                    continue
                for post in posts:
                    reactions = post['reactions']
                    if reactions is None:
                        continue
                    currentId = post['currentId']
                    postId = name_only = Path(commentFile).stem
                    reply_url = f'https://api.hiclass.net/postComments/!q?parentCommentId={currentId}&postId={postId}&sort=insertedTimestamp%2Cdesc'
                    save_name = f'{comment_dir}/{currentId}.json'
                    print(save_name)
                    download_post(reply_url, save_name, header)



def main():
    get_comment_reply_json()

if __name__ == "__main__":
    main()

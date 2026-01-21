import requests
import os
import re
import json
import traceback

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

def get_comments():
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
        print(f"{boardNm} - {boardId}")
        # attach_dir = f'{base_dir}/{boardId}_attach'
        comment_dir = f'{base_dir}/{boardId}_comment'
        makedirs(comment_dir)
        postFile = f'{base_dir}/{boardId}.json'
        with open(postFile, 'r', encoding='utf-8') as f:
            post_data = json.load(f)
            # print(post_data)
            posts = post_data['_embedded']['posts']
            for post in posts:
                postId = post['postId']
                url_comment = f"https://api.hiclass.net/postComments/!q?postId={postId}&depth=0&del=false&page=0&size=100&sort=insertedTimestamp%2"
                comment_file = f'{comment_dir}/{postId}.json'
                download_post(url_comment, comment_file, header)
                # postContent = post['postContent']
                # files = post['files']
                # for file in files:
                #     fileTranscodePath = file['fileTranscodePath']
                #     fileThumbnailPath = file['fileThumbnailPath']
                #     comments = file['comments']
                # https://download.hiclass.net  다운로드
                # userPhoto
                # https://download.hiclass.net/7e90/8190/9790/c390/32bf10cc-9c41-42a8-8a40-b500e71236b8.png


def main():
    get_comments()

if __name__ == "__main__":
    main()

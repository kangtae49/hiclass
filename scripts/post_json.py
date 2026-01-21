import requests
import os
import re
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
        traceback.print_exc(file=f)  # 예외 정보 전체를 파일에 기록
        f.write("\n")
    raise Exception(f"err: {url}")


def download(url, file_name, header):
    if not os.path.isfile(file_name) or os.path.getsize(file_name) == 0:
        with open(file_name, "wb") as file:
            response = requests_get(url, header)
            file.write(response.content)

def makedirs(dirs):
    if not os.path.isdir(dirs):
        os.makedirs(dirs)


def main():
    # 햇살반
    classId = "04c0cf09-899b-4cdd-a0f8-e35759fe7f81"  # 햇살반
    boardId = "03b07a7f-8ea4-4e2c-951b-fed57d63a6a1"  # 공지사항
    # boardId = "0d888960-c807-4635-a038-d3f3c3698871"  # 우리반 보드
    # boardId = "0b767080-05f0-4e43-88b3-d1292da7f71a"  # 유아 작품
    # boardId = "60864170-c298-44d1-8869-2528e01d7da0"  # 우리집 보드
    pageNo = 0
    pageSize = 73
    url = f'https://api.hiclass.net/v2/clazzes/{classId}/post?page={pageNo}&size={pageSize}&postType=BOARD&postStatus=ALL&commentUsed=false&sort=posted%2Cdesc&keywordCommentUsed=false&boardId={boardId}'
    download(url, f"{base_dir}/{boardId}.json", header)

if __name__ == "__main__":
    main()
        # https://api.hiclass.net/v2/clazzes/04c0cf09-899b-4cdd-a0f8-e35759fe7f81/post?page=0&size=7&postType=BOARD&postStatus=ALL&commentUsed=false&sort=posted%2Cdesc&keywordCommentUsed=false&boardId=03b07a7f-8ea4-4e2c-951b-fed57d63a6a1

"""
:authority
api.hiclass.net
:method
GET
:path
/v2/clazzes/04c0cf09-899b-4cdd-a0f8-e35759fe7f81/post?page=0&size=7&postType=BOARD&postStatus=ALL&commentUsed=false&sort=posted%2Cdesc&keywordCommentUsed=false&boardId=03b07a7f-8ea4-4e2c-951b-fed57d63a6a1
:scheme
https
accept
application/json, text/plain, */*
accept-encoding
gzip, deflate, br, zstd
accept-language
ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7
authorization
Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJjbGllbnRSZWdpc3RyYXRpb25JZCI6Imdvb2dsZSIsImgiOiJ0MWFMU3pnVFwvQTAwM0lGWHdudGI2TzFMeG8ydGpTU2VzM3QuSGkxd21Dbk13dGpEUnczeVMiLCJwaG90byI6Imh0dHBzOlwvXC9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tXC9hXC9BQ2c4b2NKYWt6alFOcEx3aHd0bVYxdjZ4Tk5tOUY4OHBsaHVRd25pazlnczM2dzlyTGhObVE9czk2LWMiLCJwcmluY2lwYWxOYW1lIjoiMTEyMjYzMTU0OTE1MzE4Mjc2MDc1IiwidXVpZCI6ImY1OGY4MGI0LTgyMWQtNDAwMy1hYjRkLTM3NDZjNDNlOGFhNyIsImF1dGhvcml0aWVzIjpbIlJPTEVfVEVBQ0hFUiJdLCJvY3JJZCI6Imdvb2dsZSIsImFjY2Vzc1Rva2VuQXQiOnsiaXNzdWVkQXQiOiIyNi4gMS4gMTkg7Jik7ZuEIDQ6NDAiLCJleHBpcmVzQXQiOiIyNi4gMS4gMTkg7Jik7ZuEIDU6NDAifSwibmFtZSI6InN1b2sga2ltIiwiZXhwIjoxNzY4OTgxMjE5LCJpYXQiOjE3Njg4MDg0MTksImlkVG9rZW5BdCI6eyJpc3N1ZWRBdCI6IjI2LiAxLiAxOSDsmKTtm4QgNDo0MCIsImV4cGlyZXNBdCI6IjI2LiAxLiAyMSDsmKTtm4QgNDo0MCJ9LCJlbWFpbCI6IndoeWNpZWxvQG5hdmVyLmNvbSJ9.klRoohs37IEe3rNKwZzNZmUoqJ1Ae1T3gIF8fT08JQ5vHSLcMk9jmQJM9jLpOYA4Zu2Z4wTIPALuF_KD72xJ_-2r972ciHyZXAgW1uKeO5RHBD-tAhD0YYu1pV5QH_4L98F_Zhx13zBl_vf35j8Gpc7Fux71Gc6z9Srj0cutP5YWH-JSJycpBHusEQx2fuPUlXQr0nkoBF_qqcu22K-aRPWlbfH1FRWAn4LVmI_6K6iekFVshqlCKIlSX6XfUwWKYBp2TBKCwE1z8geXuzVp98WPJHcJ7p-8yhyrqjzLV6xgOcwVoFEuAiJl7zWA4oMUSyklcHtLW1dCHaVmOFrmCw
origin
https://www.hiclass.net
priority
u=1, i
referer
https://www.hiclass.net/
sec-ch-ua
"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"
sec-ch-ua-mobile
?0
sec-ch-ua-platform
"Windows"
sec-fetch-dest
empty
sec-fetch-mode
cors
sec-fetch-site
same-site
user-agent
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36

"""

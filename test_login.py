import requests
import os
from dotenv import load_dotenv
import json

def main():
    # Load environment variables
    load_dotenv()

    LOGIN_URL = "https://clients.mindbodyonline.com/Login?studioID=836167&isLibAsync=true&isJson=true"
    PRE_LOGIN_URL = "https://clients.mindbodyonline.com/ASP/su1.asp?studioid=836167"

    # Headers to mimic the browser request
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
        "Origin": "https://clients.mindbodyonline.com",
        "Referer": "https://clients.mindbodyonline.com/ASP/su1.asp?studioid=836167&tg=&vt=&lvl=&stype=&view=&trn=0&page=&catid=&prodid=&date=1%2f26%2f2025&classid=0&prodGroupId=&sSU=&optForwardingLink=&qParam=&justloggedin=&nLgIn=&pMode=0&loc=1"
    }

    # Payload to replicate browser behavior
    payload = {
        "requiredtxtUserName": "alex@safayan.com",
        "requiredtxtPassword": "raT-0Nu-11X-JdT",
        "tg": "",
        "vt": "",
        "lvl": "",
        "stype": "",
        "qParam": "",
        "view": "",
        "trn": "0",
        "page": "",
        "catid": "",
        "prodid": "",
        "date": "1/26/2025",
        "classid": "0",
        "SSU": "",
        "optForwardingLink": "",
        "isAsync": "false"
    }

    # Start a session to persist cookies
    session = requests.Session()

    # Get necessary cookies before login
    pre_login_response = session.get(PRE_LOGIN_URL, headers=headers)
    if pre_login_response.status_code == 200:
        print("Pre-login successful, cookies obtained.")
        print(json.dumps(dict(pre_login_response.headers), indent=4))
        print(json.dumps(dict(pre_login_response.cookies), indent=4))
    else:
        print("Pre-login failed:", pre_login_response.status_code, pre_login_response.text)

    # Print the session cookies
    print("\nSession cookies after pre-login:")
    for cookie in session.cookies:
        print(f"{cookie.name}: {cookie.value}")
        """
        SessionFarm%5FGUID: %7B1AF2C5DB%2D462A%2D4CDD%2DBDC0%2D43A295F88A49%7D
        __cflb: 0H28vYZVtJfvNQhAhqViMmp2otirP22YZik8ejDgukh
        __cf_bm: hBASFukJ9OYvuKWLc8bjo3k7aCu05trfTYBpLz0smOo-1737916017-1.0.1.1-R4sCWaJlZrXn2mnrVsT27_vMRmqCkmDWwKrlH_D9i60QIPmiEiHqZtUQBjh8Ic0PKCFx.FUC_Iou0g64mxaOVbo0aQfjIsiEgNck_9bSDwc
        __cfruid: fa15827dd377221fe11c0ff72bea4703d4d7a48b-1737916017
        """
    



    # URL for the logout request
    LOGOUT_URL = "https://clients.mindbodyonline.com/IdentityLogin/InitiateIdentityLogout"

    # Headers for the logout request
    logout_headers = {
        "authority": "clients.mindbodyonline.com",
        "method": "POST",
        "path": "/IdentityLogin/InitiateIdentityLogout",
        "scheme": "https",
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "content-length": "65",
        "content-type": "application/x-www-form-urlencoded",
        "origin": "https://clients.mindbodyonline.com",
        "pragma": "no-cache",
        "priority": "u=0, i",
        "referer": "https://clients.mindbodyonline.com/ASP/su1.asp?studioid=836167",
        "sec-ch-ua": '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36"
    }

    # Send the logout request
    print("\nSending logout request...")
    logout_response = session.post(LOGOUT_URL, headers=logout_headers)

    # Debugging output for the logout request
    if logout_response.status_code == 200:
        print("Logout successful!")
        print("Headers:")
        print(json.dumps(dict(logout_response.headers), indent=4))
        print("Text:")
        print(logout_response.text)
    else:
        print("Logout failed:", logout_response.status_code, logout_response.text)

    # Print the session cookies after logout
    print("\nSession cookies after logout:")
    for cookie in session.cookies:
        print(f"{cookie.name}: {cookie.value}")

    return

    # Send the login request
    response = session.post(LOGIN_URL, data=payload, headers=headers)

    # Debugging output
    if response.status_code == 200:
        print("Login successful!")
        print("Cookies:")
        for cookie in session.cookies:
            print(f"{cookie.name}: {cookie.value}")
        print("Headers:")
        print(json.dumps(dict(response.headers), indent=4))
        print("Text:")
        print(json.dumps(response.json(), indent=4))
    else:
        print("Login failed:", response.status_code, response.text)

if __name__ == "__main__":
    main()

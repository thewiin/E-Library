import json
from idlelib.iomenu import encoding
from traceback import walk_tb


def auth_user(username, password):
    with open("data/users.json", encoding='utf-8') as f:
        users = json.loads(f)

        for u in users:
            if u['username']==username and u['password']==password:
                return True

    return False

if __name__=="__main__":
    print(auth_user("user", 345))
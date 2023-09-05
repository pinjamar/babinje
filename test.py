import requests

BASE_HOST = "http://localhost:5000"

# response = requests.post(BASE_HOST + "/api/v1/44ba0bb01331a2c0c9d6a835d0091c2c9033721afd612c30", json={"name": "Baby Sjedalica Joie", "desc": "Sjedalica za auto", "link": "https://www.magicbaby.hr/joie-autosjedalica-i-spin-360-grupa-0-1-0-18-kg-konfigurabilni.html"})
# print(response.json())

# response = requests.get(BASE_HOST + "/api/v1/items")
# print(response.json())

response = requests.post(BASE_HOST + "/api/v1/item/1/mutate", json={"email": "brbulic@gmail.com"})
print(response.json())

# response = requests.get(BASE_HOST + "/api/v1/confirm/1/aabd352c4e8c7c4d92dd36c069eaf392e1d0513260b5d7f1")
# print(response.json())
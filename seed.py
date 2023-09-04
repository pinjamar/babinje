import requests

BASE_HOST = "http://localhost:5000"

response = requests.post(BASE_HOST + "/api/v1/44ba0bb01331a2c0c9d6a835d0091c2c9033721afd612c30", json={"name": "Baby Sjedalica Joie", "desc": "Sjedalica za auto", "link": "https://www.magicbaby.hr/joie-autosjedalica-i-spin-360-grupa-0-1-0-18-kg-konfigurabilni.html"})
response = requests.post(BASE_HOST + "/api/v1/44ba0bb01331a2c0c9d6a835d0091c2c9033721afd612c30", json={"name": "Hranilica za bebi", "desc": "Ovo se koristi kad baby malo naraste pa da je stavimo na povišeno da može jest s nami", "link": "https://www.magicbaby.hr/kinderkraft-hranilica-sienna-konfigurabilni.html"})
response = requests.post(BASE_HOST + "/api/v1/44ba0bb01331a2c0c9d6a835d0091c2c9033721afd612c30", json={"name": "Mobilni sklopivi baby krevet", "desc": "Za na put", "link": "https://www.babycenter.hr/freeon-prijenosni-krevetic-safari-safari-dvostruko-dno-953856.html"})
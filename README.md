# Babinje

Bilo bi ljepo da uspije

## Getting started

Python 3 je nužnost. VS Code je dobar za imat. Git bash za sve ostalo sa skriptama

## Kako pokrenit kod

Rinejmaj `config.json.template` u `config.json`
Pokreni `python -m venv ./venv`
Pa onda pokreni `./start-backend.sh`
Ako sve bude dobro, upalit će se backend. Ako bude problema, javi na whatsapp/diskord.

Bekend radi na `localhost:5000`. Pri paljenju backenda prvi put ako nema baze koristeći `start-backend.sh` skriptu se dodaju testni podaci. Nakon pokretanja barem jednom, kasnije se backend može pokrenit kako god.

<<<<<<< HEAD
Prvi put kad pokreneš backend, pokreni jednom `./seed-data.sh` (dok backend radi, iz drugog terminala). Ovu skriptu treba svaki put pokretat kad kažem da treba izbrisat bazu.

Baza se briše brisanjem `instance` foldera. Nakon toga pokrenit backend i može se seed opet pokrenit.

seed-backend je potrebno samo jednom pokrenit nakon starta servera sa friškom bazom, inače će postojat duplikati u bazi. I WILL KNOW
=======
Baza se briše brisanjem `instance` foldera. Nakon toga pokrenit backend preko skripte i onda će i seedat prve podatke.
>>>>>>> ff61375e94fbf708f3565c56889e0f0433bc4f4a

Eto!

## Kako pokrenit frontend

Treba imat što noviji node.js. U `frontend` folderu se nalazi frontend, pokrenit sa `yarn install` pa `yarn start`
Frontend radi na `localhost:1234`

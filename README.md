# Babinje

Bilo bi ljepo da uspije

## Getting started

Python 3 je nužnost. VS Code je dobar za imat. Git bash za sve ostalo sa skriptama

## Kako pokrenit kod

Rinejmaj `config.json.template` u `config.json`
Pokreni `python -m venv ./venv`
Pa onda pokreni `./start-backend.sh`
Ako sve bude dobro, upalit će se backend. Ako bude problema, javi na whatsapp.

Bekend radi na `localhost:5000`. Pri paljenju baze prvi put koristeći `start-backend.sh` skriptu se dodaju testni podaci. Nakon pokretanja barem jednom, kasnije se backend može pokrenit kako god.

Baza se briše brisanjem `instance` foldera. Nakon toga pokrenit backend i sve će bit dobro

Eto!

## Kako pokrenit frontend

Treba imat što noviji node.js. U `frontend` folderu se nalazi frontend, pokrenit sa `yarn install` pa `yarn start`
Frontend radi na `localhost:1234`

# python -m venv ./venv
source ./venv/bin/activate
pip install -r requirements.txt
ENV=dev python main.py

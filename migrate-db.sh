# python -m venv ./venv
source ./venv/bin/activate
pip install -r requirements.txt

FLASK_APP=main flask db upgrade
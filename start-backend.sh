# python -m venv ./venv
source ./venv/bin/activate
pip install -r requirements.txt
ENV=dev FLASK_APP=main flask --debug run

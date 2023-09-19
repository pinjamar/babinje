# python -m venv ./venv
source ./venv/bin/activate
pip install -r requirements.txt
ENV=dev SQLALCHEMY_WARN_20=1 FLASK_APP=main flask --debug run

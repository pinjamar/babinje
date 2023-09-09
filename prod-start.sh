source venv/bin/activate
ENV=prod waitress-serve --host localhost --port 8723 main:app
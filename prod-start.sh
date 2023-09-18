source venv/bin/activate
ENV=prod kill -9 $(pgrep waitress); waitress-serve --host localhost --port 8723 main:app
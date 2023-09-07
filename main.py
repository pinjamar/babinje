from babinje import create_app
import os

app = create_app(os.environ["ENV"] == "dev")

if __name__ == '__main__':
    app.run(debug=True)
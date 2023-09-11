from babinje import create_app
import os

env = os.environ["ENV"] if "ENV" in os.environ else "dev"

app = create_app(env == "dev")

if __name__ == '__main__':
    app.run(debug=True)
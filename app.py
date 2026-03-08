from flask import Flask, render_template
from helpers import getDynamicData


app = Flask(__name__)


@app.route('/')
def home_page():
    data = getDynamicData()
    return render_template("index.html", data=data)


if __name__ == '__main__':
    app.run(debug=False, host="0.0.0.0", port=5000)

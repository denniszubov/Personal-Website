from flask import Flask, jsonify, abort, request, make_response, url_for, session
from flask import render_template, redirect


app = Flask(__name__)


@app.route('/', methods=['GET'])
def home_page():
    return '<h1>Hello, World!</h1>'


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)

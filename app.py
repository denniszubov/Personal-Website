from flask import Flask, jsonify, abort, request, make_response, url_for, session
from flask import render_template, redirect
from datetime import date

app = Flask(__name__)

def calculate_age(birthdate):
    # Calculate Age
    today = date.today()
    birthdate = date(year=2001, month=11, day=26)
    age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))
    return age

@app.route('/', methods=['GET'])
def home_page():
    data = {}
    age = calculate_age(date(year=2001, month=11, day=26))
    email = "***REMOVED***"
    based = "Atlanta, GA"
    languages = "English, French, Russian"

    data["age"] = age
    data["email"] = email
    data["based"] = based
    data["languages"] = languages

    return render_template("index.html", data=data)


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)

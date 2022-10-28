from flask import Flask, jsonify, abort, request, make_response, url_for, session, render_template, redirect, send_file
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

    skills = [
        {"skill": "Python", "level": 100},
        {"skill": "C/C++", "level": 70},
        {"skill": "Java", "level": 70},
        {"skill": "JavaScript", "level": 50},
        {"skill": "SQL", "level": 80},
        {"skill": "NoSQL Databases", "level": 60},
        {"skill": "Django", "level": 60},
        {"skill": "Flask", "level": 60},
        {"skill": "AWS", "level": 50},
        {"skill": "Git", "level": 90},
    ]

    year = date.today().year

    links = {
        "linkedin": "https://www.linkedin.com/in/dennis-zubov/",
        "facebook": "https://www.facebook.com/dennis.zubovv/",
        "github": "https://github.com/denniszubov",
        "instagram": "https://www.instagram.com/dennis.zubov/",
    }

    data["age"] = age
    data["email"] = email
    data["based"] = based
    data["languages"] = languages

    data["skills"] = skills
    data["len_skills"] = len(skills)

    data["test"] = 'style="width: 60%;'

    data["year"] = year

    data["links"] = links

    return render_template("index.html", data=data)


@app.route('/download', methods=['GET'])
def download():
    path = 'static/Dennis Zubov Resume.pdf'
    return send_file(path, as_attachment=True)


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)

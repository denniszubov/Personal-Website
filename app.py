from flask import Flask, request, url_for, session, render_template, redirect, send_file, flash, request
from flask_mail import Mail, Message
from datetime import date


app = Flask(__name__)
mail = Mail(app)

app.config["MAIL_SERVER"] = "***REMOVED***"
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = "***REMOVED***"
app.config['MAIL_PASSWORD'] = '***REMOVED***'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

def calculate_age(birthdate):
    # Calculate Age
    today = date.today()
    birthdate = date(year=2001, month=11, day=26)
    age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))
    return age


def getHomePageData():
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

    data["year"] = year

    data["links"] = links

    return data


def send_email(request):
    msg = Message(f"Personal Website Message - Subject: {request.get('Subject')}", sender= "***REMOVED***", recipients=["***REMOVED***", "***REMOVED***"])
    msg.body = f"Automated Message from denniszubov.com.\nSent by: {request.get('name')}\nReply to: {request.get('_replyto')}\n\nMessage:\n{request.get('message')}"
    mail.send(msg)


@app.route('/', methods=['GET', 'POST'])
def home_page():
    if request.method == "POST":
        send_email(request.form)
        return redirect("/")
    data = getHomePageData()
    return render_template("index.html", data=data)


@app.route('/download', methods=['GET'])
def download():
    path = 'static/Dennis Zubov Resume.pdf'
    return send_file(path, as_attachment=True)


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)

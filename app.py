from flask import Flask, request, url_for, render_template, redirect, send_file, request
from flask_mail import Mail, Message
from datetime import date
from env import DATA


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


def getDynamicData(DATA):
    age = calculate_age(date(year=2001, month=11, day=26))
    year = date.today().year

    data = DATA

    data["age"] = age
    data["year"] = year

    return data


def send_email(request):
    subject = request.get('subject')
    sent_by = request.get('name')
    reply_to = request.get('replyto')
    message_body = request.get('message')
    # Implemented to fix bug where empty email was sent
    if not subject or not sent_by or not reply_to or not message_body:
        return
    msg = Message(f"Personal Website Message - Subject: {subject}", sender= "***REMOVED***", recipients=["***REMOVED***", "***REMOVED***"])
    msg.body = f"Automated Message from denniszubov.com.\nSent by: {sent_by}\nReply to: {reply_to}\n\nMessage:\n{message_body}"
    mail.send(msg)


@app.route('/', methods=['GET', 'POST'])
def home_page():
    data = getDynamicData(DATA)
    if request.method == "POST":
        send_email(request.form)
    return render_template("index.html", data=data)


@app.route('/download', methods=['GET'])
def download():
    path = 'static/Dennis Zubov Resume.pdf'
    return send_file(path, as_attachment=True)


if __name__ == '__main__':
    app.run(debug=False, host="0.0.0.0", port=5000)

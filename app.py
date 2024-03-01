from flask import Flask, request, render_template, send_file, request
from flask_mail import Mail, Message
from helpers import getDynamicData
from dotenv import load_dotenv
import os


load_dotenv()

app = Flask(__name__)
mail = Mail(app)

app.config["MAIL_PORT"] = int(os.getenv("MAIL_PORT"))
app.config["MAIL_SERVER"] = os.getenv("MAIL_SERVER")
app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD")
app.config["MAIL_USE_TLS"] = os.getenv("MAIL_USE_TLS").lower() in ("true", "1", "t")
app.config["MAIL_USE_SSL"] = os.getenv("MAIL_USE_SSL").lower() in ("true", "1", "t")
mail = Mail(app)

sender = os.getenv("EMAIL_SENDER")
recipient1 = os.getenv("EMAIL_RECIPIENT1")
recipient2 = os.getenv("EMAIL_RECIPIENT2")
recipients = [recipient1, recipient2]


def send_email(request):
    subject = request.get('subject')
    sent_by = request.get('name')
    reply_to = request.get('replyto')
    message_body = request.get('message')
    # Implemented to fix bug where empty email was sent
    if not subject or not sent_by or not reply_to or not message_body:
        return
    msg = Message(f"denniszubov.com - Subject: {subject}", sender=sender, recipients=recipients)
    msg.body = f"Automated Message from denniszubov.com\nSent by: {sent_by}\nReply to: {reply_to}\n\nMessage:\n{message_body}"
    mail.send(msg)


@app.route('/', methods=['GET', 'POST'])
def home_page():
    data = getDynamicData()
    if request.method == "POST":
        send_email(request.form)
    return render_template("index.html", data=data)


@app.route('/download', methods=['GET'])
def download():
    path = 'static/Dennis Zubov Resume.pdf'
    return send_file(path, as_attachment=True)


if __name__ == '__main__':
    app.run(debug=False, host="0.0.0.0", port=5000)

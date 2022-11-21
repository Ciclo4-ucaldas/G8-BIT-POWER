# -*- coding: utf-8 -*-
"""
@author: MAGNUS
"""

import os
from flask import Flask
from flask import request

# Download the helper library from https://www.twilio.com/docs/python/install
from twilio.rest import Client

# using SendGrid's Python Library
# https://github.com/sendgrid/sendgrid-python
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# smtp
from email.message import EmailMessage
import ssl, smtplib


app = Flask(__name__)

@app.route('/')
def inicio():
    test = os.environ.get('Test')
    
    return test

@app.route('/sms')
def sms():
    try:
        # Find your Account SID and Auth Token at twilio.com/console
        # and set the environment variables. See http://twil.io/secure
        account_sid = os.environ['TWILIO_ACCOUNT_SID']
        auth_token = os.environ['TWILIO_AUTH_TOKEN']
        
        twilio_phone = os.environ['twilio_phone']
        
        client = Client(account_sid, auth_token)
        
        contenido = request.args.get('mensaje')
        destino = request.args.get('telefono')
        
        message = client.messages \
                        .create(
                             body = contenido,
                             from_ = twilio_phone,
                             to = '+57' + destino
                         )
        
        print(message.sid)
        
        return 'Enviado correctamente.'
    
    except Exception as e:
        print(e)
        
        return 'Error enviando el mensaje.'

@app.route('/email')
def email():
    my_email = os.environ['my_email']

    destino = request.args.get('destino')
    asunto = request.args.get('asunto')
    mensaje = request.args.get('contenido')
    
    message = Mail(
    from_email = my_email,
    to_emails = destino,
    subject = asunto,
    html_content = mensaje)
    
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        
        response = sg.send(message)
        
        print(response.status_code)
        print(response.body)
        print(response.headers)
        
        return 'Correo electrónico enviado.'
        
    except Exception as e:
        print(e.message)
        
        return 'Error enviando el mensaje.'

@app.route('/whatsapp')
def whatsapp():
    try:
        # Find your Account SID and Auth Token at twilio.com/console
        # and set the environment variables. See http://twil.io/secure
        account_sid = os.environ['TWILIO_ACCOUNT_SID2']
        auth_token = os.environ['TWILIO_AUTH_TOKEN2']
        
        twilio_phone = os.environ['twilio_phone2']
        
        client = Client(account_sid, auth_token)
        
        contenido = request.args.get('mensaje')
        destino = request.args.get('telefono')
        
        message = client.messages.create(
                                      from_= 'whatsapp:' + twilio_phone,
                                      body = contenido,
                                      to = 'whatsapp:+57' + destino
                                  )
        
        print(message.sid)
        
        return 'Mensaje de whatsapp enviado.'
        
    except Exception as e:
        print(e.message)
        
        return 'Error enviando el mensaje.'

# Invocar envio de correo con smtpllb
@app.route('/gmail')
def gmail():
    try:
        gmail = os.environ['GMAIL']
        password = os.environ['PASSWORD']
    
        destino = request.args.get('destino')
        mensaje = request.args.get('contenido')
    
        print(gmail)
        print(password)
        print(mensaje)
        print(destino)
    
        msg = EmailMessage()
    
        msg['Subject'] = request.args.get('asunto')
        msg['From'] = gmail
        msg['To'] = destino
    
        msg.set_content(mensaje)
    
        context = ssl.create_default_context()
    
        with smtplib.SMTP_SSL( 'smtp.gmail.com', 465, context = context) as smtp:
            smtp.login(gmail, password)
            smtp.sendmail(gmail, destino, msg.as_string())
    
        return 'Correo electrónico enviado con gmail.'

    except Exception as e:
        return 'Error: ' + str(e)

if __name__ == '__main__':
    app.run()

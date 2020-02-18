#!/usr/bin/python

"""Sends email to an address."""

from google.appengine.api import mail

from datetime import date
import logging
import sys

debug = False

def send_mail(serverURL='smtpauth.earthlink.net',
         cc=None, sender='cwcornelius@gmail.com', to='',
         subject='', text='', debugging=True):
  # From: http://www.eskimo.com/~jet/python/examples/mail/smtp_email.html
  message = mail.EmailMessage(sender=sender, subject=subject)
  message.to = to
  if cc:
    message.cc = cc
  message.body = text
  if debugging:
    logging.info('Emailing for %s: %s', sender, subject)
    logging.info('Message to %s = %s' %(to, text))

  try:
    message.send()
    return "OK"
  except mail.InvalidSenderError as error_msg:
    logging.info('Cannot send from user %s', sender)
    return 'error for sender <%s>' % sender

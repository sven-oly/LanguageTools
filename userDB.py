# -*- coding: utf-8 -*-
#!/usr/bin/env python
#
import main

import json
import logging
import os
import urllib
import webapp2

from google.appengine.api import users
from google.appengine.ext.webapp import template

from google.appengine.ext import blobstore
from google.appengine.ext.webapp import blobstore_handlers
from google.appengine.ext import db

class UserDB(db.Model):
  userName = db.StringProperty(u'')
  userEMail = db.StringProperty(u'')
  userId = db.StringProperty(u'')
  userLevel = db.StringProperty(u'')
  privileges = db.ListProperty(str, default=[])
  lastUpdate = db.DateTimeProperty(auto_now=True, auto_now_add=True)
  defaultDB = db.StringProperty(u'')
  comment = db.StringProperty('')
  affiliation = db.StringProperty('')


# Return info based on current user.
def getUserInfo(login_target='/', logout_target='/'):
  current_user = users.get_current_user()
  user_nickname = None
  user_logout = None
  user_login = None
  isAdmin = None

  user_login = users.create_login_url(login_target)

  if current_user:
    user_logout = users.create_logout_url('/')
    user_nickname = current_user.nickname()
    user_login = users.create_login_url('/words/getWords/')
    isAdmin = users.is_current_user_admin()

#  logging.info('%s, %s, %s, %s' % (current_user, user_nickname, user_logout, user_login))

  return (current_user, user_nickname, user_logout, user_login, isAdmin)


class manageUsers(webapp2.RequestHandler):
  def get(self):
    user_info = getUserInfo(self.request.url)

    q = UserDB.all()
    userCount = 0
    userList = []
    roleList = ['Admin', 'Edit', 'View']
    for p in q.run():
      userCount += 1
      userList.append(p)

    template_values = {
      'language': main.Language,
      'roleList': roleList,
      'userList': userList,
      'userInfo': user_info,
      'user_nickname': user_info[1],
      'user_logout': user_info[2],
      'user_login_url': user_info[3],
    }

    path = os.path.join(os.path.dirname(__file__), 'users.html')
    self.response.out.write(template.render(path, template_values))


class addUser(webapp2.RequestHandler): 
  def get(self):
    newUserEmail = self.request.get('userEmail', None)
    userRole = self.request.get('role', None)
    privileges = self.request.GET.getall('privileges')
    userName = self.request.get('userName', None)
    self.response.out.write('\nArguments = %s' % self.request.arguments())
    self.response.out.write('\nEMail = %s' % newUserEmail)
    self.response.out.write('\nuserName = %s' % userName)
    self.response.out.write('\nprivileges = %s' % privileges)

    q = UserDB.all()
    q.filter('userEMail =', newUserEmail)
    
    p = q.get()  # Get all the matching emails.
    if p:
      self.response.out.write('\n!!!: User %s already in database: %s\n' % (
        p, p.userLevel))
    else:
      newUser = UserDB(userEMail=newUserEmail,
        userName=userName,
        userLevel=userRole,
        privileges=privileges,)
      newUser.put()
      
      self.response.out.write('\n!!!: Added User %s (%s) in role %s' % (
        newUser.userName, newUser.userEMail, newUser.userLevel))


class deleteUser(webapp2.RequestHandler):
  def get(self):
    userEMails = self.request.GET.getall('userDelete')
    logging.info('Emails to delete: %s' % userEMails)
    confirm = self.request.get('confirmDelete', None)

    if not confirm:
      self.response.out.write('\n!!!: Delete not confirmed!')

    numDeleted = 0
    for email in userEMails:
      q = UserDB.all()
      q.filter('userEMail =', email)
      self.response.out.write('\n!!!: email = %s\n' % (email))

      p = q.get()  # Get all the matching emails.
      self.response.out.write('\n!!!: p=: %s)\n' % (p))
      if p is not None:
        self.response.out.write('\n!!!: User %s to be deleted from database: %s \n' % (p.userName, p.userEMail))
        UserDB.delete(p)
        numDeleted += 1
      else:
        self.response.out.write('\n!!!: No such email in database: %s\n' % (
          email))

    self.response.out.write('\n!!!: %d users were deleted from database\n' % (numDeleted))



class clearUsers(webapp2.RequestHandler): 
  def get(self):
    q = UserDB.all()
    numDeleted = 0
    for p in q.run():
      UserDB.delete(p)
      numDeleted += 1
    self.response.out.write('\n%d users deleted' % numDeleted)


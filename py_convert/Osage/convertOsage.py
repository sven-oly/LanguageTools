from __future__ import print_function
import httplib2
import os
import re

import sys

from apiclient import discovery
from oauth2client import client
from oauth2client import tools
from oauth2client.file import Storage

import osageConversion


try:
    import argparse
    flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
except ImportError:
    flags = None

# If modifying these scopes, delete your previously saved credentials
# at ~/.credentials/slides.googleapis.com-python-quickstart.json
SCOPES = 'https://www.googleapis.com/auth/drive'
CLIENT_SECRET_FILE = 'client_secret.json'
APPLICATION_NAME = 'Google Slides API Python Quickstart'


def convertToOsageUnicode(oldText):
  newText = osageConversion.oldOsageToUnicode(oldText)  # FOR TESTING oldText[::-1]
  return newText
  

def get_credentials():
    """Gets valid user credentials from storage.

    If nothing has been stored, or if the stored credentials are invalid,
    the OAuth2 flow is completed to obtain the new credentials.

    Returns:
        Credentials, the obtained credential.
    """
    home_dir = os.path.expanduser('~')
    credential_dir = os.path.join(home_dir, '.credentials')
    if not os.path.exists(credential_dir):
        os.makedirs(credential_dir)
    credential_path = os.path.join(credential_dir,
                                   'slides.googleapis.com-python-quickstart.json')

    store = Storage(credential_path)
    credentials = store.get()
    if not credentials or credentials.invalid:
        flow = client.flow_from_clientsecrets(CLIENT_SECRET_FILE, SCOPES)
        flow.user_agent = APPLICATION_NAME
        if flags:
            credentials = tools.run_flow(flow, store, flags)
        else: # Needed only for compatibility with Python 2.6
            credentials = tools.run(flow, store)
        print('Storing credentials to ' + credential_path)
    return credentials


def replaceShapeTextById(requests, shape_id, newText):
  # Remove existing text in the shape, then insert new text.
  if not newText or newText == '':
    return
  requests.append({
    'deleteText': {
        'objectId': shape_id,
        'textRange': {
            'type': 'ALL'
        }
    }
  })
  requests.append({
    'insertText': {
        'objectId': shape_id,
        'insertionIndex': 0,
        'text': newText
    }
  })


# {u'textElements': [{u'endIndex': 9, u'paragraphMarker':
#    {u'style': {u'spacingMode': u'NEVER_COLLAPSE', u'direction': u'LEFT_TO_RIGHT', u'lineSpacing': 80,
#     u'indentStart': {u'unit': u'PT'}, u'spaceAbove': {u'unit': u'PT'}, u'indentEnd': {u'unit': u'PT'},
#     u'indentFirstLine': {u'unit': u'PT'}, u'alignment': u'CENTER'}}},
#    {u'endIndex': 9, u'textRun':
#      {u'content': u':people \n', u'style': {u'foregroundColor': {u'opaqueColor': {u'themeColor': u'DARK1'}},
#         u'bold': False, u'baselineOffset': u'NONE', u'strikethrough': False, u'smallCaps': False,
#        u'fontFamily': u'Calibri', u'fontSize': {u'magnitude': 22.200000762939453, u'unit': u'PT'},
#        u'italic': False, u'underline': False}}}]}
def processTextElements(service, slides, presentationId):
  requests = []
  
  # If true, should not convert.
  dontConvert = re.compile(':[a-z: ]*')
  doConvert = re.compile('^[A-Z\[\]\^\`ams, ]+$')
  
  slideIndex = 1
  for slide in slides:
    elements = slide.get('pageElements')
    print('SLIDE # %d with id %s' % (slideIndex, slide['objectId']))
    textIndex = 1
    for element in elements:
      shape = element['shape']
      shapeType = shape['shapeType']
      shapeId = element.get('objectId')
      textObj = shape['text']
      #print('%s, %s, %s' % (shapeType, shapeId, textObj))
      if textObj:
        # Get the text content for each shape, then process it.
        for text in textObj:
          textElements = textObj['textElements']
          for tElem in textElements:
            if 'textRun' in tElem:
              textRun = tElem['textRun']
              textContent = textRun['content'].replace("\n", "")
 
              if doConvert.search(textContent):
                newText = convertToOsageUnicode(textContent)          
                # Get ready to update this.
                replaceShapeTextById(requests, shapeId, newText)

                print('  %3d Content = %s, REV = **%s**' % (textIndex, textContent, newText))
      textIndex += 1
    slideIndex += 1
    print ('\nNUMBER REQUESTS[0] = %d' % len(requests))

  # And make the changes!
  # Execute the requests.
  print ('\nREQUESTS[0] = %s' % requests[0])
  print ('\nREQUESTS[1] = %s' % requests[1])

  index = 0
  increment = 20
  max = len(requests)
  while index < max:
    body = {
      'requests': [requests[index:index+increment]],
    }
    response = service.presentations().batchUpdate(
      presentationId=presentationId, body=body).execute()
    print('\nindex = %d, RESPONSE = %s' % (index, response))
    
    index += increment
  

def main():
    """Shows basic usage of the Slides API.

    Creates a Slides API service object and prints the number of slides and
    elements in a sample presentation:
    https://docs.google.com/presentation/d/1EAYk18WDjIG-zp_0vLm3CsfQh_i8eXc67Jo2O9C6Vuc/edit
    """
    credentials = get_credentials()
    http = credentials.authorize(httplib2.Http())
    service = discovery.build('slides', 'v1', http=http)

    presentationId = '1EAYk18WDjIG-zp_0vLm3CsfQh_i8eXc67Jo2O9C6Vuc'  # Test
    presentationId = "1nrflUlT7b702ZB6GAeRKrb2-okpzEAfHtOMkgAyQDQI"  # Shared from ccornelius
    presentationId = "1yb1THgLWlT8N7mDPb6IlhLWGelIpfLZ6TGERkkXjaL8"  # Osage words copy
    presentation = service.presentations().get(
        presentationId=presentationId).execute()
    slides = presentation.get('slides')

    print('*** sys.maxunicode = %s ***' % sys.maxunicode)
    print('TEST CONVERT = %s' % osageConversion.testConvert())
    print ('The presentation contains {} slides:'.format(len(slides)))
    for i, slide in enumerate(slides):
        print('- Slide #{} contains {} elements.'.format(i + 1,
            len(slide.get('pageElements'))))
    
    processTextElements(service, slides, presentationId)


if __name__ == '__main__':
    main()

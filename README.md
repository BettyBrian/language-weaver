# language-weaver action steps

This project contains the following custom action steps:
-  Generate token 1.0
    This step generates an accessToken for you to be seen as a logged in user to communicate with the API.
-  Translate Document 1.0
    This step will send a document to the Language Weaver API. The result of the action step is an object with key value pairs.
- Translate Text 1.0
   This step will send text to the Language Weaver API. The result of the action step is an object with key value pairs.
-  Check Status 1.0
    This step will check the status of the text/file you wish to translate. 
    This returns an object with key value pairs.
-  Retrieve Translation 1.0
    This step will return the translated data.
    If the inserted data was text, this will return an object with key value pairs.
    If the inserted data was a file, this will return a file pointer that you can use in an update action step.
-  Fetch JSON variable 1.0
    This step will return the value of a key value pair in text.

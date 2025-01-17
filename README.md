# SUSI.AI Web Application

[![Weblate](https://hosted.weblate.org/widgets/susi-ai/-/chat/svg-badge.svg)](https://hosted.weblate.org/engage/susi-ai/?utm_source=widget)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/db948e1eb4b2457386ba80388e8390cf)](https://www.codacy.com/app/rishiraj824/susi.ai?utm_source=github.com&utm_medium=referral&utm_content=fossasia/susi.ai&utm_campaign=badger)
[![Build Status](https://travis-ci.org/fossasia/susi.ai.svg?branch=master)](https://travis-ci.org/fossasia/susi.ai)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/fossasia/susi_webchat?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Twitter Follow](https://img.shields.io/twitter/follow/susiai_.svg?style=social&label=Follow&maxAge=2592000?style=flat-square)](https://twitter.com/susiai_)

SUSI.AI is an artificial intelligence system, combining pattern matching, internet data, data flow, and inference engine principles. Through some abilities to reflect, it can remember the user input to produce deductions and personalized feedback. Its purpose is to explore the abilities of an artificial companion and to answer the remaining unanswered questions. The SUSI.AI web chat is a front-end developed for web access of SUSI.


[![Deploy to Docker Cloud](https://files.cloud.docker.com/images/deploy-to-dockercloud.svg)](https://cloud.docker.com/stack/deploy/?repo=https://github.com/fossasia/susi.ai)

## Communication

Please join our mailing list to discuss questions regarding the project: https://groups.google.com/group/susiai/

Our chat channel is to be found on Gitter: https://gitter.im/fossasia/susi_webchat

## Technology Stack

### Components
* HTML - Generated structure of the web page.
* CSS - Web page styling options and details.
* Javascript(JSON) - Used to store information for deploying the application, such as dependencies.
* ReactJS - Structure for deployment of the web page.

## Requirements
* node --version >= 6
* yarn --version >= 3

## How to deploy?

### Running on [localhost](./docs/INSTALLATION_LOCAL_ENGLISH.md)

* **Step 1:** Fork the susi.ai repository and clone it to your machine
* **Step 2:** Cd into the cloned folder
* **Step 3:** Install all the dependencies with:```$ yarn install```
* **Step 4:** Run on http://localhost:3000 with:```$ yarn run start```
* **Step 5:** Build locally with: ```$ yarn run build ```
* **Step 6:** To deploy at a URL use: ```$ yarn run deploy ```

### Running on [Surge](./docs/INSTALLATION_SURGE_ENGLISH.md)

* **Step 1:** Install Surge:```$ yarn install -g surge```
* **Step 2:** Then cd into the cloned susi.ai folder
* **Step 3:** Install the node modules:```$ yarn install```(if not already)
* **Step 4:** Build the app:```$ yarn run build```
* **Step 5:** Go to the build directory:```cd build```
* **Step 6:** Run Surge:```surge```
* **Step 7:** Follow the prompts and provide an e-mail address and a password.
* **Step 8:** Go to the URL that appears after the above process is finished, and provide this link in the PR for testing your changes.

Still having problems? Watch this video to clear your doubts [How to setup SUSI web-chat with surge](https://www.youtube.com/watch?v=vM9cD1pHMDQ&t=240s) or watch [How to set it up with Surge](https://www.youtube.com/watch?v=Gvc0uz13U1M)

### Deploying on Firebase
[Click Here to read the set up guide](https://github.com/fossasia/susi.ai/blob/master/docs/FIREBASE_DEPLOY.md)

[Click here to watch a video for deploying on Firebase](https://youtu.be/7iVKBwR40N8)

## Speech Recognition and Synthesis

The SUSI.AI WebChat uses [Web Speech API](https://github.com/mdn/web-speech-api/) for speech recognition and synthesis. To test whether your browser supports Text To Speech, open your browser console and run the following:

```
var msg = new SpeechSynthesisUtterance('Hello World');
window.speechSynthesis.speak(msg)
```

If you get speech output, then the Web API Speech Synthesis is supported by your browser and the text-to-speech features of SUSI.AI Web Chat will work. The Web Speech API has support for all latest Chrome/-ium browsers as mentioned in the [Web Speech API Mozilla docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API). However there are a few bugs with some Chromium versions please check [this link](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=742758) on how to fix them locally.

## Accounting, Anonymous User, Logged in Users

SUSI.AI can be used anomymously or as a logged in user by using the account features. The advantage logged in users is, that they the interaction history is synced across devices. More about [accounting here](./docs/ACCOUNTING.md).


## Development

### Retrieving User Chat History

Whenever a user logs in he must be able to view his chat history in the chat client.
A user might also be using multiple chat clients, so the history across all platforms must be in sync.

A [memory servlet](https://github.com/fossasia/susi_server/blob/development/src/ai/susi/server/api/susi/UserService.java) is used to retrieve the user history.
>api.susi.ai/susi/memory.json?access_token=ACCESS_TOKEN

When the client makes a call to the server to the above endpoint  with the ```ACCESS_TOKEN``` of the logged in user,  the server returns a list of cognitions which contain susi responses to the queries in the history.

The response from the memory servlet is of the form:
```
{
	"cognitions" : [],
	"session" : {},
}
```
A sample SUSI.AI response is of the form :
```
{
	"query" :
	"answers" : [ {
		"data" : [],
		"actions" : []
	}],
}
```
So each cognition has ```query``` as well as  ```answer ``` and thus we get a conversation message pair in the chat history.

The cognitions contain a list of SUSI.AI responses of the above form using which chat history is rendered.

All the user messages are stored in a log file. The memory servlet digs out the history of the required user from the log file. The log uses the identity of the user and accesses only that information which has been stored for the user. If the user is not logged on, no information is available.
The conversation log is NOT stored for a particular IP. It’s stored for an Identity within the AAA system.
That identity can be represented with an email address, or there can be others.

Thus the synchronization of history across all chat platforms is maintained.


### Folder Structure

After creation and a successful build, your project should have the following file structure:

```
susi.ai/
  README.md
  node_modules/
  docs/
  build/
  package.json
  public/
    index.html
  src/
    __tests__/
    actions/
    components/
    constants/
    images/
    stores/
    utils/
    App.js
    App.test.js
    history.js
    index.css
    index.js
    setupTests.js
  .eslintrc
  .travis.yml
  deploy.sh
  LICENSE
```

* `public/index.html` is the page template.
* `docs` contains instructions for setting up the project locally and also for deploying it with Surge. It also contains information regarding Accounting.
* `src/index.js` is the JavaScript entry point.
* `src/App.js` is the component which contains React routes to all other components.
* `src/__tests__/` new tests related to all the components can be created in this folder, this project follows a `jest` testing suite.
* `src/actions/` contains related action types which can be defined in this folder.
* `src/components/` any new component can be added in this folder, given that the file is reused or should be unique in some way. All static files are present in this component as well.
* `src/components/Translate/` has all the pot files required to integrate the project with [Weblate](http://weblate.org).
* `src/constants/` contains all the action types which are being used in the Application.
* `src/images/` contains all the static images being used in the App.
* `src/stores/` contains all application related stores for the Dispatcher Service which can be defined in this folder.
* `src/utils/` contains all utilities are files which help us in communicating efficiently between the stores and the actions.
* `src/App.test.js/` is the entry point for all tests in the `__tests__` folder.
* `src/history.js/` registers a history for the `react-router` service in the application.
* `src/setupTests.js/` is the file containing custom scripts written for failing tests to pass due to the deprecated libraries.
* `.eslintrc` is the config file for the ESLint testing.
* `deploy.sh` handles the continuous Travis Deployment of the project on `gh-pages`.
* `.travis.yml` is the config file for Travis CI.


## Translations

### How to add translations in new languages for SUSI.AI Web Chat Components using Weblate
* Go to [https://hosted.weblate.org/projects/susi-ai/chat/](https://hosted.weblate.org/projects/susi-ai/chat/) and Login using your Github Account.
* Select Chat component to add new translations.
* Click on `Start new translation` and choose a new language for which you want to add translations.
* After selecting the language, you can add your own translations for the different strings.
* Save the translations.
* Click on the Manage Tab to commit your changes to the local repository based on the translations.

**Note**
- To make changes to a repository make sure you are Authenticated
- To read more about Weblate and about its integration go to [https://docs.weblate.org/en/](https://docs.weblate.org/en/)

## Colors and Fonts

### Component Colors of Light theme


* Application Background Colour: ![#ffffff](https://placehold.it/15/ffffff/000000?text=+) `#ffffff`
* Message History Background Colour: ![#f5f4f6](https://placehold.it/15/f5f4f6/000000?text=+) `#f5f4f6`
* Chat Bubble Colour
    * SUSI.AI Chat bubbles: ![#fffff](https://placehold.it/15/ffffff/000000?text=+) `#ffffff`
    * User Chat bubbles: ![#e0e0e0](https://placehold.it/15/e0e0e0/000000?text=+) `#e0e0e0`
* Top Bar Colour: ![#4285f4](https://placehold.it/15/0084ff/000000?text=+) `#4285f4`
* Buttons Colour: ![#4285f4](https://placehold.it/15/0084ff/000000?text=+) `#4285f4`
* Search Result Colour: ![#ff5e00](https://placehold.it/15/ff5e00/000000?text=+) `#ff5e00`

* Toggle Colour
    * thumbOnColor: ![#5ab1fc](https://placehold.it/15/5ab1fc/000000?text=+) `#5ab1fc`
    * trackOnColor: ![#4285f4](https://placehold.it/15/0084ff/000000?text=+) `#4285f4`

* User Feedback Colour
    * Thumbs Up Colour
         **Voted**: ![#1685e5](https://placehold.it/15/1685e5/000000?text=+) `#1685e5`
         **Unvoted**: ![#90a4ae](https://placehold.it/15/90a4ae/000000?text=+) `#90a4ae`
    * Thumbs Down Colour-
    	 **Voted**: ![#d1462f](https://placehold.it/15/d1462f/000000?text=+) `#d1462f`
         **Unvoted**: ![#90a4ae](https://placehold.it/15/90a4ae/000000?text=+) `#90a4ae`

* Fonts

	* Chat Message Font: "Product Sans", sans-serif
	* Message Composer Font: "Product Sans", sans-serif
	* Chat Message Font Size: 14px
	* Chat Composer Font Size: 16px
	* Chat Message Font Colour: ![#001d38](https://placehold.it/15/001d38/000000?text=+) `#001d38`
	* Message Composer Font Colour: ![#001d38](https://placehold.it/15/001d38/000000?text=+) `#001d38`

### Component Colors of Dark theme

* Application Background Colour: ![#000000](https://placehold.it/15/000000/000000?text=+) `#000000`
* Message History Background Colour: ![#183850](https://placehold.it/15/183850/000000?text=+) `#183850`
* Chat Bubble Colour
    * SUSI.AI Chat bubbles: ![#199393](https://placehold.it/15/199393/000000?text=+) `#199393`
    * User Chat bubbles: ![#199393](https://placehold.it/15/199393/000000?text=+) `#199393`
* Top Bar Colour: ![#000000](https://placehold.it/15/000000/000000?text=+) `#000000`
* Buttons Colour: ![#000000](https://placehold.it/15/000000/000000?text=+) `#000000`
* Search Result Colour: ![#ff5e00](https://placehold.it/15/ff5e00/000000?text=+) `#ff5e00`

* Toggle Colour
    * thumbOnColor: ![#5ab1fc](https://placehold.it/15/5ab1fc/000000?text=+) `#5ab1fc`
    * trackOnColor: ![#4285f4](https://placehold.it/15/0084ff/000000?text=+) `#4285f4`

* User Feedback Colour
    * Thumbs Up Colour
         **Voted**: ![#00FF7F](https://placehold.it/15/00FF7F/000000?text=+) `#00FF7F`
         **Unvoted**: ![#7eaaaf](https://placehold.it/15/7eaaaf/000000?text=+) `#7eaaaf`
    * Thumbs Down Colour-
    	 **Voted**: ![#f23e3e](https://placehold.it/15/f23e3e/000000?text=+) `#f23e3e`
         **Unvoted**: ![#7eaaaf](https://placehold.it/15/7eaaaf/000000?text=+) `#7eaaaf`

* Fonts

	* Chat Message Font: "Product Sans", sans-serif
	* Message Composer Font: "Product Sans", sans-serif
	* Chat Message Font Size: 14px
	* Chat Composer Font Size: 16px
	* Chat Message Font Colour: ![#FFFFFF](https://placehold.it/15/FFFFFF/000000?text=+) `#FFFFFF`
	* Message Composer Font Colour: ![#FFFFFF](https://placehold.it/15/FFFFFF/000000?text=+) `#FFFFFF`


## License

This repository is under a GNU LESSER GENERAL PUBLIC LICENSE 2.1.

#Calendar Webapp

Webapp link: https://calendar-backend-webapp.herokuapp.com/

Webapp created to improve my skills on several React features such as:

* create a calendar screen, form and event with the use of the react-big-calendar library
* create responsive components by using react-bootstrap
* acquire knowledge on a user-friendly interface mixed with our custom calendar component to retrieve user date data by using the react-datetime-picker library
* user authorization included by using JWT (Jason Web Token) defined on the webapp backend logic
* data storage with MongoDB (please refer to the calendar-backend repository for more information)
* troubleshoot Redux by using Redux DevTools
* private and public routes with React Router V6
* CRUD by using a custom API as backend (please refer to the calendar-backend repository for more information)
* adding multiple reducers to a store
* date formatting with moment.js
* popup displays with sweetalert2
* use Redux store with asynchronous actions, dispatch, states, and middlewares
* several new unit testing methods (more information on the test section and each test file in the source folder)

Additional information about each of the webapp can be found on each of the files or in this readme 
document which has been extensively documented for educational purposes. Thanks for taking your 
time to review my code or notes and leave either a comment or a star if you find it useful.

**Folders are explained by alphabetical order below** <br>
**dependencies on this project are enlisted at the bottom of the readme file**

## actions 

### auth:
Contains all the functions related to the user login/logout logic. It will use an asynchronous functions 
to retrieve the users information from our custom calendar-backend database, some will have sweetalert2 
methods to popup messages to either confirm the login interaction or an error popup displaying a wrong username 
information message. Every function has proper dispatch callings for the reducers to send the proper 
information on the store, that way we can keep a track on every single action done on the webpage. Finally, 
every interaction will be authorized with the use of a Jason Web Token (JWT) from the calendar-backend 
(please refer to the calendar-backend repository for further information)

### events:


### ui:

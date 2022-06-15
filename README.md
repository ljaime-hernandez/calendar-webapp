# Calendar Webapp

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
(please refer to the calendar-backend repository for further information).

### events:
Has the CRUD requests to our calendar-backend API (create, delete, update or retrieve events), some of them has either 
custom error messages or attached body messages from the requests which are not fulfilled correctly due to incorrect or 
missing information. Some of the functions contains actions prepping the modal component to either create a new event 
or retrieve the information of an existing event to display its information in the calendar modal and update it if 
the user is authorized.

### ui:
Has the objects used by the store to set the modal status either as active or inactive (to render it on the page or to close 
it).

## components:

### auth:

#### LoginScreen:
Has two forms, one for the user to login with its credentials (set with a default user so anyone can access the page to see
its contents and functionality) and a register form for anyone to input its information and create a personal user.
It has a filter to check for both the registration password and the registration password confirm to display a popup error
in case they do not match.

### calendar:

#### CalendarEvent:
This component will render the events individually using the event title and the user name which created the event.

#### CalendarModal:
Will render the component as a form to either visualize the existing events information or create a new event based on the users 
behavior on the page (either clicking the new event button or clicking existing events). If the event is new it will use todays 
date and time as default and increase it by one hour, it will handle any changes on the user input to let it know if the
title is not long enough or if the dates for the events are invalid (if the event start date is previous to the event end date 
then it wont allow the user to submit any request) and if the event exists then it will allow the event creator to modify it if 
desired.

#### CalendarScreen:
Some of the features included on this component is the use of the localizer, which will use the users information retrieved on
the browser with the use of moment.js to know the users time zone, for it to be used on the events display. The main component
rendered is the Calendar from react-big-calendar, it has some useful properties which you can customize such as the events on them,
selection and click events, views for each day, week, month and full agenda, and some extra features explained in the file.

### ui:

#### AddNewFab:
Button designed to add new events by launching the modal on the screen.

#### DeleteEventFab:
Button designed to delete events by using the active event id.

#### NavBar:
Navigation bar component retrieved from the react-bootstrap library used to display the users name and logout from the main page.

## Helpers:

### calendarMessagesEsp:
Object containing strings used in case the developer wants to change the calendar into spanish mode.

### fetch:
Contain the functions for both request with or without token, which are used to authorize certain operations with the use of JWT 
to modify events. Both of them are going to use an endpoint, data and the method as parameters, which we will mix with both the
base URL, the GET, POST, PUT and DELETE requests and the data (if needed) attached to the header for the information input.

### fixEvents:
This helper will reformat the date value we receive from the backend request as sometimes the data gets on conflict with the calendar 
formatting of the events so, along with the moment.js, the date data will be properly received and fixed.

## Hooks:

### useForm:
Previously used in my other projects, its helpful to retrieve the value on input boxes by using onChange events, it also has a 
reset function which will help us to reset its values when needed.

## Reducers:

### authReducer:
Will handle the login, logout, registration and checking status of the user.

### calendarReducer:
Will every event status to either delete, get, update or create events. It will also define the events which will be on an 
"active" status, used to render its event information on the modal in case the user wants to either read its contents or update
the whole event (if authorized).

### rootReducer:
File containing the combination of all reducer files used on the store file.

### uiReducer:
Will handle the modal status for it to be open or close. 

## Store:
Our store will combine all the reducers created for us to use them all at the same time if needed, the createStore method will 
contain all the reducers in our webpage, along with the middleware needed to execute asynchronous tasks.

## Styles:
I used SASS as the styling method for this project, so the main styles file contain the imported files of all components on the 
project, the base folder contain the files for the global variables and the global classes used on the project.

## Types:
Used for all custom reducers, the string will help us have a brief description of what the action does in the redux extension debugger.

## Unit Testing:
This webapp test environment requires specific testing dependencies and variables which are explained in each test file, the test
environment includes .env files for production, development and tests, all of which will either have links to a local host or a live 
server. For both tests, i used my local machine with MongoDB Compass installed to keep a track on each data request, the 
calendar-backend script was deployed on my machine with the nodemon command for me to check on every request status and finally I 
used postman to review each of my method requests, with or without a JWT token, and the response content to match it with an adequate
set of tests for each situation.

Most of the tests will require enzyme, enzyme-to-json, enzyme-adapter-react-17, react-hooks, redux-mock-store, and the calendar-backend
running on the background for them to work, each of the testing files has a step by step for you to be able to execute them properly.

Please refer to each of the testing files for further information, as each tests is fully documented. I took my time to explain
each and every step on them for educational purposes, as well for additional reference for anyone willing to check on them as well. 

### Actions tests:

#### auth:
* test for startLogin function proper execution
* test for startLogin function incorrect execution
* test for startRegister function proper execution
* test for startChecking function proper execution

### Components tests:

#### LoginScreen:
* test on proper LoginScreen component render
* test on automatic login dispatch method
* test on register form validation for password confirmation
* test on register form execution after input fields are filled properly

#### CalendarModal:
* test on proper CalendarModal component display
* proper update action call and modal close
* error display if the title input is incorrect
* test on new events execution
* test on dates validation

#### CalendarScreen:
* test on proper CalendarScreen component render
* tests on calendar property interactions

### ui tests:

#### DeleteEventFab:
* test on proper DeleteEventFab component render
* test on proper EventStartDelete function execution after a click event

### Helpers tests:

#### fetch:
* tests for FetchWithoutToken function to return valid information
* tests for FetchWithToken function to return valid information

### Reducers tests:

#### authReducer:
* tests on every user status (register, login, logout, default and authenticated states)

#### uiReducer:
* tests on every modal status (open, close and default)

### Routers tests:

#### AppRouter:
* tests on public, private and unchecked routes

### Types test:

#### types:
* tests on full types object return


## Dependencies:

- react
- react-router-dom
- react-big-calendar
- react-bootstrap
- react-daytime-picker
- react-modal
- sass
- mongoose
- redux
- redux-thunk (middleware)
- moment (for proper date formatting)
- Sweetalert2 (for alert and confirm popups)
- enzyme
- enzyme-to-json
- enzyme-adapter-react-17
- jest
- jest-canvas-mock
- react-hooks (for hooks tests)
- redux-mock-store (for store tests)
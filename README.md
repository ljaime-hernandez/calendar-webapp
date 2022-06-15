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
(please refer to the calendar-backend repository for further information)

### events:
Has the CRUD requests to our calendar-backend API (create, delete, update or retrieve events), some of them has either 
custom error messages or attached body messages from the requests which are not fulfilled correctly due to incorrect or 
missing information. Some of the functions contains actions preping the modal component to either create a new event 
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
This component will render the events individually using the event title and the user name which created the event

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
Button designed to add new events by launching the modal on the screen

#### DeleteEventFab:
Button designed to delete events by using the active event id

#### NavBar:
Navigation bar component retrieved from the react-bootstrap library used to display the users name and logout from the main page

## Helpers:

### calendarMessagesEsp:
Object containing strings used in case the developer wants to change the calendar into spanish mode

### fetch:
Contain the functions for both request with or without token, which are used to authorize certain operations with the use of JWT 
to modify events. Both of them are going to use an endpoint, data and the method as parameters, which we will mix with both the
base URL, 

### Dependencies:

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
- redux-mock-store (for Firestore tests)
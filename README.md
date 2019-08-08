# RestauRank

To start the server:

1. start mongodb using mongod
2. node src\server\server.js # backend
3. npm run dev # frontend

## RestauRank

#### Project Design

Our project is based on react, redux, and saga, as requested, to manage the front-end requests and state-handling.
We used React-Bootstrap as our UI framework.
We divided our projects to 2 main parts - users and restaurants.
The user component handles the user components logic
such as login, logout, register, profile view, and user search.
The restaurants component handles the components logic
such as adding restaurants, add reviews, edit reviews, restaurants etc.

Each component has its own reducers, sagas, constants, actions, etc.

#### Features

- Register an account with a picture, username and location
- User profile view
- Write a restaurant review
- Restaurant view
- Search restaurant ability
- Search username ability
- Login/Logout ability

#### Model

We used Mongoose to implement the Model.
We have three models - restaurant, review and user.
Each one contains fields that are relevant to itself, as follows:

User - username, password, image, location
Restaurant - name, location, rating, nbReviews(# of reviews)
Review - description, reviewer, restaurant, creationDate, bathroomQuality, staffKindness, cleanliness, driveThruQuality, deliverySpeed, foodQuality, pictures

In the Review model, the reviewer field is a forgein key to the User model.
In addition, the restaurant key is a reference to the Restaurant model (also a foreign key)

#### Flow

An example to a flow in the system could be the registration process.

The UI component for registration displays a form which accepts the basic details for registration - username, password, image, and location.
Once the user enters all the details and presses the submit button, an event is created, and the event-handler we set-up is called.
The event handler is in charge of taking all the data that was given as input by the user, and dispatch an action.
Once the action is dispatched, either the reducer of the component handles it, or a saga handles it, depending on whether or not an API call to the server is necessary.
In case of registration, a saga takes the action dispatched, and make an API call to the server. Once a response has been received by the saga, the relevant action is being dispatched (SUCCESS or FAILURE). The action dispatched by the saga is handled by the reducer, which update the redux store accordingly, so that the UI can be re-rendered and display the result to the user.

This process is quite similar to all actions being performed in the system.

#### Extra Features

- We made an option to add a restaurant to the system by anyone - even without a user
- We created a special page for each component so that the details of it can be displayed in a convenient way
- We made sure to create a special URL for each component display so that pages in the website can be shared with other users. For instance if I want to share a page of a specific restaurant, it can be done by copying the URL with the relvant URL parameters inside
- We used the google API to allow choice of any location possible in an accurate way
- We put a lot of affort into the design of the system, and made sure to make it convenient for the user

#### Extra libraries

- Json Web Token - used for session management and cookie handling without the need to save data on the server for each user.
- cookieParser - a library used to create and delete cookies, as well as parse them
- React Bootstrap - Used to implement the UI views.
- React Autosuggest - Used for searching users and restaurants.
- React Geosuggest - Used to find geo locations as properties for restaurants and users and to search by location.
- React Star Ratings - UI component represents the rating.

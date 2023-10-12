# Software requirements documentation: ExpoJunction

The following specifications are for a fictitious website called ExpoJunction, created from the following prompt for learning purposes:

"An application that a conference centre could use to advertise upcoming
events. Normal end-users might be able to see a list of upcoming events. In
contrast, an administrator might be able to add information about new
events, cancel events, edit information about events, etc."
(Credit: HyperionDev, 2021).

# How to Use

You can use the app either locally by downloading the source code, or online at the links found below. To begin, either use one of the test accounts or make one of your own (but be aware you can only make non-admin accounts on the front end).

### Test Accounts

Two test accounts you can use are as follows:

**Admin** Account:

- Username: test
- Password: test

**Normal User** Account:

- Username: test2
- Password: test2

## Using The App

Once you're logged in, as a normal user you'll see a view consisting of cards that show all of the events currently in the database. The link to buy tickets is nonfunctional, for now. To sign back out, click "Log Out" on the top bar.

Logging in as an admin gets you a different view that lets you add new events to the database by filling in the form at the top, the image URL field can be either a local image in /public/images/ or a full external URL.

You can also scroll down to access the view that lets you edit and delete any individual event by clicking the relevant button.

## Installation

To install the app, navigate to both the "frontend" and "backend" folders and run "npm install" on both root folders to install the dependencies.

Then, run "npm start" inside both root folders to start up the backend server and the frontend app.

Go to http://localhost:3000/ and you should now be able to use the app.

### Switching Databases

Swapping out the MongoDB database is incredibly simple, simply edit or create a ".env" file in the root of the backend folder, and add/edit the following line:

API_KEY="Your MongoDB URL"

E.g. API_KEY="mongodb+srv://userName:password@mycluster.gjh67yf.mongodb.net/?retryWrites=true&w=majority"

The program will attempt to pull in the URL from this file as the connection URL to MongoDB. Ensure, however, that you have a database set up with the exact same Schema outlined in the eventSchema and userSchema files, in two collections called "events" and "users".

## Links

Frontend React Application: https://capstone-react-frontend.netlify.app

Backend Express Server: https://capstone-backend-j2oi.onrender.com/

# Security

To secure the app, the MongoDB connection key is stored in an .env file instead of local storage or state.

Plain text password and username data is also cleared out of state as soon as it's been used.

The only major flaw with security design is storing sensitive info in the JSON web token, which is stored in the state, but this could be easily remedied by removing the sensitive info from the JWT or using a more secure storage method.

The JSON Web Tokens also are set to have an expiration time of 1 hour, meaning even if they are intercepted they will not be useful for long.

# Third-Party APIs

No third-party API data is used in this project.

# Deployment

The app has been deployed to Netlify for the front-end React App and Render.com for the Express back end. This has been done for convenience's sake, as they both offer free hosting for their respective parts of the project and easy deployment that doesn't require rewriting the front or back end of the site to let it live on a single platform.

# System Architecture

ExpoJunction will be made using the MERN stack (MongoDB, Express, React and Node.js) because it is a full-stack application that needs to provide both back-end and front-end functionality.

The focus will be on quickly creating a Minimum Viable Product (MVP) which can then be expanded upon later once the core functionality is established.

## Front-end

The front end of the app will be created using React and styled using the React Bootstrap library. React is chosen for its virtual DOM which enables seamless rendering and the easy creation of single-page applications like this app.

React Bootstrap will be used for styling due to its easy integration with React and its library of prebuilt responsive elements which will speed up and improve development.

The focus will be on creating a minimalist UI that's focused on functionality, and can be added onto later.

## Back-end

The back-end of the app will be managed using a custom Express web server which interfaces with the MongoDB database for CRUD operations, performs user validation and restricts access based on roles.

## Data Storage

Data will be stored in a MongoDB database, which was chosen for its easy scalability that will ensure data storage stays efficient even as the app grows to potentially hundreds or thousands of events.

## Deployment/Hosting

It will be deployed using Netlify for the React frontend app, and Render.com for the backend Express app. This will be done for ease of deployment, as deploying only to Netlify, for example, requires converting all of the program's functions to serverless functions instead.

This allows an easier 1:1 transition with the dev and live environment.

# System Requirements

Below we will outline the set of features and requirements ExpoJunction will need to be a successful app.

## Functional Requirements:

- User authentication and authorization for administrators and normal users. Administrators should have access to CRUD features and normal users should only have access to a "read-only" view.
- Database storage and retrieval of event information and stored user details from MongoDB.
- CRUD operations for events (Create, Read, Update, Delete) using a back-end Express server.
- Responsive UI design for various devices using the React front-end.

## Non-Functional Requirements:

- Performance: The application should have low latency and high responsiveness, even during peak usage.
- Security: Ensure data security and privacy by implementing secure authentication and authorization mechanisms.
- Scalability: The system should be easily scalable to handle more users and events over time.
- Reliability: The application should be available and reliable, with minimal downtime for maintenance or upgrades.

## User Stories:

- As an end-user, I want to view a list of upcoming events to plan my attendance.
- As an administrator, I want to easily add new events and provide relevant event details for advertising.
- As an administrator, I want the ability to edit event information to keep it accurate and up to date.
- As an administrator, I want to be able to cancel events to reflect any changes, cancellations or concluded events as needed.

# Point of Differentiation

Below we will briefly highlight how our app will differ from the current market offerings.

## Current Competitors

There are many similar apps currently on the market for finding events, such as Eventbrite, Ticketmaster, Quicket and more, many of which also allow you to purchase tickets directly on the platform.

## Differentiation

The app will be differentiated from the existing options by providing a more niche-focused service at a lower price point. It will be made with the intention of creating a template that can easily be reused with custom branding etc. by existing venues to create information portals for their own events.

It will serve as a template for hyper-local (single venue) event browsing apps that we can then offer as a service to existing venues. # Software requirements documentation: ExpoJunction

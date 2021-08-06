# Social Listening Tool Console

This tool console is an internal management system for the `Social Listening Tool`. Through this tool, we can easily query all user information. e.g.  add users, delete users and download all user information. And also we can query and download all the existing universes information. Let's get started!

## Project outline

This project consists a front-end and a back-end. The front-end is in the **client**folder, and the back-end is the **server**. The back-end queries the `MongoDB` and returns to the front-end through the `API`.

This is a typical `MEVN `full stack project for practice purposes. `MEVN` these 4 letters respectively indicate `MongoDb` / `ExpressJS` / `Vue` / `NodeJS`.

## Project setup

1. Clone the whole project
2. Install dependencies. Run `npm install` in **client** and **server**
3. Start the server
   1. Create a `.env` under the **server** folder and add the environments to it.
   2. Run `npm start` to launch the `server`, besides we also have `npm run dev` for `dev` mode
4. Run `npm run serve` under the **client** folder to launch the web app

Enjoy it!



## Feature list

- [x] fetch all users
- [x] search user
- [x] add user
- [x] delete user
- [x] download user list
- [x] fetch existing universes
- [x] search universe
- [x] download all universes
- [x] Login Page
- [x] adapt to small screen
- [x] enter to login in login page
- [x] deploy to Azure



## Bug list

- [ ] list scroll issue keep the bar at the top

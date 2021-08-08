# Social Listening Tool Console

This tool console is an internal management system for the `Social Listening Tool`. Through this tool, we can easily query all user information. `e.g.` add users, delete users and download all user information. And also we can query and download all the existing universes information. Let's get started!

## Outline

This project consists a front-end and a back-end. The front-end is in the **client** folder, and the back-end is the **server**. The back-end queries the `MongoDB` and returns to the front-end through the `API`.

This is a typical `MEVN` full stack project for practice purposes. `MEVN` these 4 letters respectively indicate `MongoDb` / `ExpressJS` / `Vue` / `NodeJS`.

## Setup

1. Clone the whole project
2. Install dependencies. Run `npm install` in **client** and **server**
3. Start the server
   1. Create a `.env` under the **server** folder and add the environments to it.
   2. Run `npm start` to launch the `server`, besides we also have `npm run dev` for `dev` mode
4. Run `npm run serve` under the **client** folder to launch the web app


Enjoy it!

## Deploy

There are many ways to deploy to a remote server. Here are two methods I have succeed.

### Deploy to Aliyun ECS

1. Similar to the above `setup`, clone and install dependencies

2. Build the client to create the  `dist` folder.

   * You can run `npm run build` under the **client** folder to create the `dist` folder and then move it to the **server** folder, but we have a better way make it directly

   * Run `npm run sbuild`. This command can build and move it to the right place directly

3. In this way, we use the `pm2` to host our app. If you haven't install it before. Install it with `npm install pm2 -g`. Refer: [pm2](https://pm2.keymetrics.io/)

4. Under the **server** folder, run `NODE_ENV=production pm2 start app.js --update-env`

5. Done!

### Deploy to Azure App Service

Similar to the above, build and move the dist to the **server** folder. We need to deploy the **server** folder to the `Azure App Service`. I recommend to use the `VS code` extension to deploy. This is quite easy. Refer: [Deploy Express.js to Azure App Service using Visual Studio Code](https://docs.microsoft.com/en-us/azure/developer/javascript/tutorial/deploy-nodejs-azure-app-service-with-visual-studio-code?tabs=bash)


## Feature list

- [x] fetch all users
- [x] search user
- [x] add user
- [x] delete user
- [x] download user list
- [x] fetch existing universes
- [x] search universe
- [x] download all universes
- [x] login Page
- [x] adapt to small screen
- [x] enter to login in login page
- [x] deploy to Azure
- [x] jwt

## Bug list

- [ ] list scroll issue keep the bar at the top

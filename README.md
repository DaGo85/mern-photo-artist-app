# MERN Photo Artist App

> A fullstack MERN (MongoDB, Express, React, Node.js) Photo Artist Application, using Firebase for authentification, framer motion and Tailwind.

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Project Status](#project-status)
- [Room for Improvement](#room-for-improvement)
- [Contact](#contact)
- [License](#license)

## General Information

This project was created with the purpose of learning MongoDB, Express, React, Node.js, Firebase auth, framer motion and Tailwind.

The intention was to create a

## Technologies Used

- React - version 18.0.0
- Node.js - version 16.15.0
- Express - version 4.17.3
- Mongoose - version 6.2.1
- Firebase - version 9.6.8
- Firebase-admin - version 10.1.0
- Framer-Motion - version 6.2.8
- Tailwind - version 3.0.23
- React-Router-Dom - version 6.3.0

For more informations check package.JSON in ./client for frontend dependencies and in ./server for backend.

## Features

- Fully functional blog with own content management system

- Styled pages for login, register, reset and welcome
- Fully functional login, register, reset process with Email and Google login
- Less dependencies, because i implemented own Firebase functionality

## Setup

For running it on your local environment first:

`npm install or yarn install`

To run development server:

`npm start or yarn start`

Open http://localhost:3000 with your browser to see the result.
For a full list of dependencies take a look at package.json.

You have to setup an own Firebase project and create an .env with your Firebase config.

## Usage

You can register either with your Email or Google Account.
After that you can login with your Email credentials oder your Google Account and enter a protected route. If you forget your password, you can request a reset link via Email.

## Project Status

Project is: _complete_

This is the finished advanced version of my Firebase auth.

## Room for Improvement

- Adding React useContext or Redux
- Adding darkmode

## Contact

## License

Feel free to use this code for your own projects!

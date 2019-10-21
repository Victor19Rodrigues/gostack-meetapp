<h1 align="center">
    <img alt="Bootcamp GoStack" src="https://github.com/Victor19Rodrigues/gostack-meetapp/blob/master/assets/logo-bootcamp.svg" />
    <br />
    Bootcamp GoStack - Meetapp Challenge
</h1>

<h3 align="center">
    A challenge to get Rocketseat GoStack Bootcamp certification. 👨🏻‍🚀🚀
</h3>

## Overview

This application is a developer event aggregator app called Meetapp (an acronym for Meetup + App).

![App Screenshot](https://github.com/Victor19Rodrigues/gostack-meetapp/blob/master/assets/home.png)
![App Screenshot](https://github.com/Victor19Rodrigues/gostack-meetapp/blob/master/assets/home_logged.png)
![App Screenshot](https://github.com/Victor19Rodrigues/gostack-meetapp/blob/master/assets/home_mobile.png)
![App Screenshot](https://github.com/Victor19Rodrigues/gostack-meetapp/blob/master/assets/home_logged_mobile.png)

## Table of contents

- :sunglasses: [Technologies](#technologies)
- :floppy_disk: [Installation](#installation)

## Technologies

:hammer: In this project the following technologies were used:

### Backend

- [Node.js](https://nodejs.org)
- [express](https://expressjs.com/)
- [nodemon](https://nodemon.io/)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js/tree/master/dist)
- [bee-queue](https://bee-queue.com/)
- [crypto](https://nodejs.org/api/crypto.html)
- [date-fns](https://date-fns.org/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [mongoose](https://mongoosejs.com/)
- [multer](https://github.com/expressjs/multer)
- [sequelize](https://sequelize.org/)
- [pg](https://node-postgres.com/)
- [youch](https://github.com/poppinss/youch)
- [yup](https://github.com/jquense/yup)
- [sucrase](https://sucrase.io/)
- [faker](https://github.com/marak/Faker.js/)
- [supertest](https://github.com/visionmedia/supertest)
- [jest](https://jestjs.io/)
- [factory-girl](https://github.com/aexmachina/factory-girl)
- [nodemailer](https://nodemailer.com/about/)
- [redis](https://redis.io/)
- [docker](https://www.docker.com/docker-community)

### Frontend

- [ReactJS](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Redux-Saga](https://redux-saga.js.org/)
- [rocketseat/unform](https://github.com/Rocketseat/unform)
- [Polished](https://polished.js.org/)
- [Immer](https://github.com/immerjs/immer)
- [React-toastify](https://fkhadra.github.io/react-toastify/)
- [Reactotron](https://infinite.red/reactotron)
- [history](https://www.npmjs.com/package/history)
- [React Datepicker](https://reactdatepicker.com/)
- [Redux Persist](https://github.com/rt2zz/redux-persist)
- [React Perfect Scrollbar](https://github.com/goldenyz/react-perfect-scrollbar)
- [React Icons](https://react-icons.netlify.com/#/)
- [Styled Components](https://www.styled-components.com/)

### Mobile

- [React Native](https://facebook.github.io/react-native/)
- [react-native-gesture-handler](https://kmagiera.github.io/react-native-gesture-handler/docs/getting-started.html)
- [react-native-linear-gradient](https://github.com/react-native-community/react-native-linear-gradient)
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)

## Installation

First of all, to run this application you'll need to install [Node.js v10.15](https://nodejs.org) or higher, [Yarn v1.17](https://yarnpkg.com/lang/en/) or higher, [Docker](https://www.docker.com/docker-community), [Genymotion](https://www.genymotion.com/) for emulate device and [Android Studio SDK](https://developer.android.com/studio) on your computer.

### How to use:

```bash
# Clone this repository
$ git clone https://github.com/Victor19Rodrigues/gostack-meetapp.git
```

#### Backend

```bash
# Go into the repository
$ cd gostack-meetapp/backend

# Install dependencies
$ yarn

# Created docker container postgree
$ docker run --name meetapp -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=meetapp -p 5432:5432 -d postgres

# Created docker container mongo
$ docker run --name mongo_meetapp -p 27017:27017 -d -t mongo

# Created docker container redis
$ docker run --name redis_meetapp -p 6379:6379 -d -t redis:alpine

# Run migrates
$ yarn migrate

# Run seeds in that order
$ yarn sequelize db:seed --seed 20191004210144-users
$ yarn sequelize db:seed --seed 20191007191936-files
$ yarn sequelize db:seed --seed 20191007185533-meetapps

# Run the Backend
$ yarn dev
```

#### Frontend

```bash
# Go into the repository
$ cd gostack-meetapp/frontend

# Install dependencies
$ yarn

# Run the Frontend
$ yarn start
```

#### Mobile

Access Genymotion and open an emulate device.
P.S.: Tested on Android system only.

```bash
# Go into the repository
$ cd gostack-meetapp/mobile

# Install dependencies
$ yarn

# Run the Mobile
$ react-native start

# Open another window in terminal and run
$ react-native run-android
```

---

<p align="center">Made with :heart: by Victor Rodrigues :smiley: [Get in touch!](https://www.linkedin.com/in/victor-rodrigues-676563ba/) </p>

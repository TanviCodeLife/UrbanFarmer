# **Urban Farmer**
##### Internship Project at Development Now , 04/08/2019
##### Alex Garcia, Ben Kirby, Tanvi Garg, Robert Lee

## Description
This app was bootstrapped with Create React Native App

A native application for iOS and Android users. Urban Farmer helps small scale growers manage their inventory and customer sales.

Hosted on App Store and Google Play Store

![project](src/img/projectDemo.png)

## Table of Contents
* [Available Scripts](#available-scripts)
  * [npm start](#npm-start)
  * [npm test](#npm-test)
  * [npm lint-fix](#npm-lint-fix)
  * [npm react-devtools](#npm-react-devtools)
* [Setup Firebase](#setup-firebase)
* [Technology Used](#technology-used)


## Available Scripts

### `npm start`

Starts Metro Bundler. To view the app open iOS simulator or Android emulator and run the respective build:

    react-native run-ios
    react-native run-android

### `npm test`

Runs the Jest test runner.

### `npm lint-fix`

Fixes auto-fixable problems defined in the .eslint.json file.

### `npm react-devtools`

Runs react-devtools

## Setup Firebase
* Add file `config.js` under src/ directory.
* Add firebase credentials:

      import Firebase from 'firebase';

      const config = {
        apiKey: 'XXXX',
        authDomain: 'XXXX',
        databaseURL: 'XXXX',
        projectId: 'XXXX',
        storageBucket: 'XXXX',
        messagingSenderId: 'XXXX'
      };

      Firebase.initializeApp(config);

      export const db = Firebase.database();
      export const auth = Firebase.auth();
      export default Firebase;`



## Technology Used
* React Native
* Firebase
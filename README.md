Checkout the live demo here http://borderguru.herokuapp.com/

## Prerequisites

Make sure you have [Node.js](http://nodejs.org) and [mongodb](http://mongodb.org) up and running.

## Setup:

```sh
$ git clone https://github.com/madhums/borderguru.git
$ cd borderguru
$ npm install
$ export NODE_PATH=./config:./app/controllers
$ export NODE_ENV=development
$ npm start
```

Then visit `http://localhost:3000`

## Structure

Main application logic can be found in [order controller](/app/controllers/orders.js) and [order model](/app/models/order.js)

P.S: Part of this setup has been taken from my own boilerplate which can be found [here](https://github.com/madhums/node-express-mongoose)

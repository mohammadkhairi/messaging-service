# Mongodb Mockup Server Package

## Introduction
`mongodb-mockup-server` is a wrapper package use to wrapped around 'mongodb-memory-server'. This wrapper is to ensure that the code written by the developers will be reduced.

## Installation
``npm install https://github.com/mohammadkhairi/Mockup-Server.git``

## Import
``` const mongoMockupServer = require('mongodb-mockup-server'); ```



<br /><br />

# How To Use

## Initialization
``const mongoMockupServer = mongoMockupServer();``

### Example
```
before(() => {
  mongoMockupServer = mongoMockupServer();
});
```

<br />

## Destroy
``mongoMockupServer.cleanup();``

### Example
```
after(() => {
   mongoMockupServer.cleanup();
});

```

<br />

## Code Example With Mongoose Model
```
const mongoMockupServer = mongoMockupServer();
const connection = await mongoMockupServer.setup();

const model = connection.model('Account', accountSchema);
```

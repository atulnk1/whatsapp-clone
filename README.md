# WhatsApp Clone

This is a simple WhatsApp clone made by mostly following this tutorial: https://www.youtube.com/watch?v=tBr-PybP_9c&ab_channel=WebDevSimplified

However, parts of of the code were updated due to the updates to the various front end (react-bootstrap) and back end (socket.io) dependency changes. 

## Description

This WhatsApp clone uses React for the front end trying to employ typical React hooks like useState, useEffect, useContext and useCallback. It also uses custom hooks to manipulate data on in local storage.

For the back end, it uses Express and socket.io for the communication between two browsers on the same device.

As the idea was to practice React and to test out express, it currently harcodes the front end and back end domains to the localhost + ports that I used for my testing. 

## Getting Started


### Executing program

After installing the app:

* To Run React, use 
```
npm start 

```

* To Run the server.js, use 
```
nodemon server.js
```

## Authors

Just me

## Acknowledgments

Inspiration, code snippets, etc.
* [WhatsApp Clone](https://www.youtube.com/watch?v=tBr-PybP_9c&ab_channel=WebDevSimplified)
* [Quickstart socket.io](https://socket.io/get-started/chat)
* [Handling cors for socket.io](https://socket.io/docs/v3/handling-cors/)

## Video

Demo of how this WhatsApp Clone works:
(https://drive.google.com/file/d/1LC2dSVoa64qj6zUWO0EBlYcGyp-ovCpo/view?usp=sharing "WhatsApp Clone")
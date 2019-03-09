# RESTful API Nodejs URL Shortner Boilerplate

MVC is optional, this can be used as a RESTful API instead and it defaults to REST

## A flexible and lightweight node URL shortner. 

Features include:

* Optional authentication
* Quick set up within 5 minutes
* Admin route to view all URLs at the same time
* Responses of JSON from the API makes it easy to build an application area to view statistics
* Tracking how many times and when a URL is used
* Easily extend functionality and what you track
* Optional MVC attachment

## Instructions for setup:

1. Required installs are Node.js and MongoDB
2. Clone the repository using `git clone https://github.com/riderjensen/nodejs-url-shortner`
3. npm install
4. Edit the settings at the top of app.js
5. run the application with `npm start`

## Instructions for using the API

If you enable auth in app.js, all routes will be protected and require the following headers
<br />
`name:`
<br />
`password:`

GET `/` - Returns a message to visit the documentation <br />
GET `/:id` - returns a response with a 'url' property with the associated URL to the id <br />
GET `/a` - returns all short URLs currently supported in the database including all stats associated <br />
GET `/a/:id` - returns one specific shortened URL with the stats attached. The :id is not the id in the database, but instead the id that is in the URL that someone is requesting <br />
POST `/c/:id` - this is used to check a URL to see if the shortId is already in use. It also includes a URL checker to see if we get a response from the URL that the requester needs. <br />

<strong>If there is a 'message' property attached to the response, any errors will be attached there.</strong>

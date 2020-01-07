# Validation - Exercise #3 - Custom Error Messages & Outsourcing

In this exercise we are going to make our validation messages a bit more user friendly and self-explanatory. Instead of just telling the user that an input is invalid we want to provide detailed information what exactly is wrong and how to correct it.

## Setup custom error messages

Continue working on your previous exercise code OR copy your previous server.js file to here and repeat the installation of express and express-validator.

* Adapt the field error messages in your check functions
    * Give more explanatory validation error messages to the user
        * either use `check("field", "<errMessage>")` or `check("field").withMessage("<errMessage>")`

## Setup validation for specific sources only
* Import additionally the "body" function from the express validator package
* Replace the check() calls to validate your form body fields by calls to body()
* Test if your form submit still works

## Outsource validators into middleware
* Bundle the check routes to an array
* Outsource the array to a variable outside the route
* Add a middleware for your POST route and attach the array as middleware
    * This will cause that on each call to the POST register route this array / chain
    of middleware function checks will run FIRST
    * Do not forget to call next() within the middleware function


## BONUS TASK
* Create a new GET route /users/:id
* Create an array of three users within that route:
    `
        let users = [
            {id: 1, user: "Leandro"},
            {id: 2, user: "Leon"},
            {id: 3, user: "Rob"},
        ]
    `
* If the user provides the param ID: deliver back the user with that ID as response
* If no param ID given: deliver back ALL users
* If a query param "search" was given 
    * search for this user an return it back
    * also allow partly searches, e.g. "Le" should deliver "Leandro" AND "Leon"
    * also allow case insensitive search, e.g. "ro" should deliver "Leandro" AND "Rob"

* Add field validation
    * Check for param ID and assure, if it is given, it is an integer
    * Validate the field "search" in the query string only. Use the query() check function for that
    * We also want that the search term is optional and does not need to be stated
        * use the .optional({checkFalsy: true}) function to make the search term optinal
        [.optional()](https://express-validator.github.io/docs/validation-chain-api.html#optionaloptions)

const express = require('express');
const app = express();
const {check, body, validationResult} = require("express-validator")

app.use(express.urlencoded())

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// ADD JOURNAL ENTRY FORM
app.get('/register', (req, res) => {
    let strForm = `
        <h1>Register</h1>
        <form action="/register" method="POST">
            <label for="email">Email</label><br />
            <input type="text" id="email" name="email" />
            <br />
            <label for="password">Password</label><br />
            <input type="password" id="password" name="password" />
            <br />
            <button type="submit">Register</button>
        </form>
    `
    res.send(strForm)
})

// chain of validation checks
const validation = [
    body("email", "Not a valid email, please use format: 'email@hoster.domain'").isEmail(), 
    body("password", "Password must have between 4 and 10 characters").isLength({min: 4, max: 10})
]

// validation middleware
// apply the validation checks on the given /register POST route
// = so when we receive the data from the registration form
app.post('/register', validation, (req, res, next) => {
    next()
})

// the register POST route
// => processes the registration
// we now have outsourced all validation checks from our logic
// and have a more clear separation of concerns now
app.post('/register', (req, res) => {
    
    console.log(req.body)

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.send(errors)
    }

    res.send(req.body)
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

//Run app, then load http://localhost:3000 in a browser to see the output.
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User.model');

router.get('/signup', (req,res) => {            //when call the /signup
    res.render('signup');                       //render hbs 'signup'
});

router.post('/signup', (req,res,next) => {

    const { username, password } = req.body;

    if(password.length < 2){
        res.render('signup', {message: 'must be 2 chars min'})
    }
    if(username === ''){
        res.render( 'signup', {message : 'cannot be empty'})
    }
    User.findOne({ username : username })
    .then( found =>{
        if( found !== null)  
            res.render('signup', { message :'The username is already exist' })
        else{
            const salt = bcrypt.genSaltSync();
            console.log(salt);
            const hash = bcrypt.hashSync(password, salt);

            User.create({ username : username, password : hash })                
            .then(dbUser => {
               // req.session.user = dbUser;
                res.redirect('/');
            })
            .catch(err => {
                next(err);
            })

        }
    })

});

module.exports = router;
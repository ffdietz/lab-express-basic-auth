const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
    const loggedinUser = req.session.user;
    res.render('index', { user: loggedinUser })

});

const loginCheck = () => {
    return(req, res, next) => {
        if(req. session.user)   next();                     //  if user is logged proceed as intended
        else                    res.redirect('/login');     //  if not logged redirect to login
    }
}

/// middleware f()
router.get('/private', loginCheck(), (req, res, next) => {
    res.render('private');

});

module.exports = router;

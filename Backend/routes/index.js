const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
// testing

router.get('/test',(req,res)=> res.json({msg:'Working'}));

// register
router.post('/register',authController.register);

// login
router.post('/login',authController.login);


module.exports = router;
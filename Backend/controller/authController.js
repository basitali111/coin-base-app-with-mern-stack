const Joi = require('joi');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const UserDTO = require('../dto/userDTO'); // 

const passwordPattern = new RegExp('^[a-zA-Z0-9]{3,30}$');
const authController = {
    async register(req,res,next) {
        // validate user input
        const userRegisterSchema = Joi.object({
            username: Joi.string().min(3).max(30).required(),
            name: Joi.string().max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(passwordPattern).required(),
            confirmPassword: Joi.ref('password')
        });

       const {error} = userRegisterSchema.validate(req.body);

        // if error in validation return error via middleware
        if(error) {
            return next(error);
        }
        // check if user already exists // if user exists return error via middleware
        const {username,name,email,password} = req.body;
        try{
            const emailInUse = await User.exists({email});
            const usernameInUse = await User.exists({username});
            if(emailInUse) {
               const error = {
                status: 409,
                message: 'Email already in use'
               }
               return next(error);
            }

            if(usernameInUse) {
                const error = {
                 status: 409,
                 message: 'Username already in use'
                }
                return next(error);
             }
        }
        catch(error){
                return next(error);
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password,10);
        // save user to database
        const userToSave = new User({
            username,
            email,
            name,
            password: hashedPassword
        });

        const user = await userToSave.save();
        // response send
        const userDto = new UserDTO(user);

        return res.status(201).json({user: userDto});
    },
    async login(req,res,next) {
        // 1. validate user input
        const userLoginSchema = Joi.object({
            username: Joi.string().min(3).max(30).required(),
            password: Joi.string().pattern(passwordPattern).required(),
        })
        const {error} = userLoginSchema.validate(req.body);

        // 2. if error in validation return error via middleware
        if (error){
            return next(error)
        }
        const {username,password} = req.body;
        // 3. check if user exists // if user exists return error via middleware
        let user;
        try{
             user = await User.findOne({username:username});
            if(!user) {
                const error = {
                    status: 401,
                    message: 'Invalid username/password'
                }
                return next(error);
            }
            // match password

            const match =await bcrypt.compare(password,user.password);
            if(!match) {
                const error = {
                    status: 401,
                    message: 'Invalid password'
                }
                return next(error);
            }
        }catch(error){
            return next(error);
        }

        const userDto = new UserDTO(user);
        return res.status(200).json({ user: userDto }); /// Now it should return only _id, username, and name.
        // 4. compare password
        // 5. if password is correct generate token
        // 6. send token to user

    },
   
    
}

module.exports = authController;
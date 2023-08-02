const Joi = require('joi');

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

        // hash password
        // save user to database
        // response send

    },
    async login() {},
   
    
}

module.exports = authController;
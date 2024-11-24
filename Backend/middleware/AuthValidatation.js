const Joi=require('joi')

const signinValidation=(req,res,next)=>{
    console.log('Request Body:', req.body);
    const schema=Joi.object({
        name:Joi.string().min(3).max(100).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(15).required(),
        contact: Joi.string().pattern(/^[0-9]{10}$/).required()
    })
    const {error}=schema.validate(req.body);
    if(error){
        const errorMessage = error.details[0].message;
        return res.status(400).json({ message: `Bad request: ${errorMessage}` });
    }
    next()
}

const loginValidation=(req,res,next)=>{
    const schema=Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(15).required()
    })
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"Bad request: ",error})
    }
    next()
}

module.exports={
    signinValidation,
    loginValidation
}
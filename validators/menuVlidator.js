import Joi from "joi";

const validateMenu = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required().messages({
            "any.required": " name is required!"
        }),
        description: Joi.string().required().min(5).max(50).messages({
            "any.required": " description is required!",
            "string.min": "description name cannot be less than three letters!",
            "string.max": "description name cannot be more than fifty letters!",
        }),
        price: Joi.number().required().messages({
            "any.required": " Price is required!"
        })

    });
    const validation = schema.validate(req.body);
    const { error } = validation;
    if (error) {
        const message = error.details.map((x) => x.message);
        return res.status(400).json({ message });
    }
    next();
};

export default validateMenu;
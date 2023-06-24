import Joi from "joi";

//sign up validator
const signUpValidator = (req, res, next) => {
  const schema = Joi.object({
    full_name: Joi.string().required().messages({
        "any.required": "Company name is required!"
      }),

    email: Joi.string().required().email({ minDomainSegments: 2 }).messages({
      "string.email":
        "Invalid email format. Please provide a valid email address!",
      "any.required": "Email is required!"
    }),

    password: Joi.string().min(8).required().regex(/^(?=.*[!@#$%^&*])(?=.*[A-Z])/) .messages({
        "string.pattern.base":"Password must include at least one special character, lowercase, and uppercase letter!",
        "string.min": "Password must be at least 8 characters!",
        "any.required": "Password is required!",
      }),

    confirm_password: Joi.string()
      .required()
      .equal(Joi.ref("password"))
      .messages({
        "any.only": "Passwords do not match!",
      }),

    phone_number: Joi.string().required().regex(/^[0-9+]+$/).messages({
        "string.pattern.base":
          "Phone number can contain only numbers and must start with +",
        "string.length": "Phone number must be exactly 13 digits",
        "any.required": "Phone number is required!",
      }),
    address: Joi.string().messages({
      "any.required": "Address is required!"
    }),
  });
  const validation = schema.validate(req.body);
  const { error } = validation;
  if (error) {
    const message = error.details.map((x) => x.message);
    return res.status(400).json({ message });
    }
    next();
};

//validate company login
const signInValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }).with("email", "password");
  const { email, password } = req.body;
  const { error } = schema.validate({ email, password });
  if (error) return res.status(400).json("email or password required");
  next();
};

export { signUpValidator, signInValidator };

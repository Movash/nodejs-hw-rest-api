const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    
    const { error } = schema.validate(req.body);
    // const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const someError = error.details[0];
      let errorMsg;
      
      if (Object.keys(req.body).length === 0) {
        errorMsg = `Missing fields`;
      } else if (someError.type === "any.required") {
        errorMsg = `Missing required ${someError.context.key} field`;
      } else {
        errorMsg = `${someError.message}`;
      }

      next(HttpError(400, errorMsg));
    }
    
    // if (error) {
    //   const details = error.details.map((detail) => {
    //     if (detail.type === "any.required") {
    //       return `Missing required ${detail.context.key} field`;
    //     } else {
    //       return `Invalid type for ${detail.context.key} field`;
    //     }
    //   });

    //   const errorMsg = details.join(", ");
    //   next(HttpError(400, errorMsg));
    // }

    next();
  };

  return func;
};

module.exports = validateBody;

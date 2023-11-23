// property  = body ~ req.body

const Joi = require("joi");

const validator = (schema, property = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]); // property chính là body
    if (!error) {
      next();
    } else {
      // có lỗi -> lấy lỗi ra
      // nó sẽ hiện ra 1 cái detail là để thông báo lỗi
      // vì vậy bắt details
      console.log(JSON.stringify(error, null, 2)); // xuất ra toàn bộ lỗi
      const { details } = error;
      const message = details[0].message;
      const path = details[0].path;
      // nếu validate ko được thì trả về 422
      res.status(422).json({
        success: false,
        error: {
          message,
          path,
        },
      });
    }
  };
};

module.exports = validator;

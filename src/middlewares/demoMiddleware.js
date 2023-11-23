// const logMiddleware = (req, res, next) => {
//   const method = req.method;
//   const url = req.url;
//   const ip = req.ip;
//   const currentTimme = new Date().toISOString();
//   console.log(`[${currentTimme}] - ${method} - ${url} - ${ip}`);
//   next();
// };

// const bodyMiddleware = (req, res, next) => {
//   console.log("body ::", req.body);
//   next();
// };

const loginMiddleware = (req, res, next) => {
  // Phải làm: email : thì phải string, password cũng là string
  // email phải có @gmail.com
  // password >= 6 kí tự
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(404).json({
      success: false,
      message: "Invalid",
    });
    return;
  }
  // check email
  // + : 1 hoặc nhiều kí tự
  // . : là kí tự
  // * : là không hoặc nhiều
  // ? : 0 hoặc 1
  const isValidEmail = /.+@gmail.com$/g.test(email);
  const isValidPassword = typeof password === "string" && password.length >= 6;

  if (isValidEmail && isValidPassword) {
    next();
    return;
  }

  res.status(422).json({
    success: false,
    message: "Invalid Body",
  });
};

// module.exports = logMiddleware;
// module.exports = bodyMiddleware;
// module.exports = loginMiddleware;

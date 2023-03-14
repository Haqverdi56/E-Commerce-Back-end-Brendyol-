const jwt = require("jsonwebtoken");

let privateKey = "ironmaidenironmaidenironmaidenironmaiden";

const requireAuth = (req, res, next) => {
    const cookies = req.headers?.cookie.split('; ');
    let token;

    cookies?.forEach(cooki => {
        const [name, value] = cooki.split('=');
        if (name === 'jwt') {
            token = value;
        }
    });

  if (token) {
    jwt.verify(token, privateKey, (err, decodedToken) => {
      if (err) {
        console.log("err",err.message);
        // res.redirect('/login');
      } else {
        console.log("decoded",decodedToken);
        next();
      }
    });
  } else {
    // res.redirect('/login')
  }
};

module.exports = {
    requireAuth
}

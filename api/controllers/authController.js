const auth = require("../helpers/auth");

exports.login = function(req, res, next) {
  let role = req.swagger.params.role.value;
  let username = req.body.username;
  let password = req.body.password;

  if (role != "user" && role != "admin") {
    let response = { message: 'Error: Role must be either "admin" or "user"' };
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(response));
  } else {
    let tokenString = auth.issueToken(username, role);
    let response = { token: tokenString };
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(response));  
  }
};

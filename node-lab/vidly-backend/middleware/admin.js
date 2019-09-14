module.exports = function(req, res, next) {
  // Assuming this will be executed after authorizatrion middleware fn.
  if (!req.user.isAdmin) return res.status(403).send("Access Denied");
  next();
};

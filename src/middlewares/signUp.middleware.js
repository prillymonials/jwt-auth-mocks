import models from '../models/index.js';

export default {
  checkDuplicateUsernameOrEmail(req, res, next) {
    const userByUsername = models.user.findByUsername(req.body.username);

    if (userByUsername) {
      return res.status(400).json({
        message: "Username is already in use."
      });
    }

    const userByEmail = models.user.findByEmail(req.body.email);

    if (userByEmail) {
      return res.status(400).json({
        message: "Email is already in use."
      });
    }

    next();
  },
};

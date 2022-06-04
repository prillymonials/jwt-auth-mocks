import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import jwtConfig from '../config/jwt.config.js';

import models from '../models/index.js';

export default {
  async signUp(req, res) {
    const user = await models.user.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });

    res.status(200).json({ message: 'User registered successfully.' });
  },
  async signIn(req, res) {
    const user = models.user.findByEmail(req.body.email);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    const token = jwt.sign(
      { id: user.id },
      jwtConfig.secret,
      { expiresIn: jwtConfig.jwtExpiration },
    );

    const refreshToken = await models.refreshToken.create({ userId: user.id });

    return res.status(200).json({
      accessToken: token,
      accessTokenExpiry: Date.now() + (jwtConfig.jwtExpiration * 1000),
      refreshToken: refreshToken.token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  },
  async refreshToken(req, res) {
    const { token } = req.body;

    if (!token) {
      return res.status(403).json({
        message: 'Refresh token is required.'
      });
    }

    const refreshToken = models.refreshToken.findByToken(token);

    if (!refreshToken) {
      return res.status(403).json({
        message: 'Refresh token is not in database.'
      });
    }

    const currentTime = Date.now();
    if (refreshToken.expiresAt < currentTime) {
      await models.refreshToken.deleteById(refreshToken.id);

      return res.status(403).json({
        message: "Refresh token was expired.",
      });
    }

    const newToken = jwt.sign(
      { id: refreshToken.id },
      jwtConfig.secret,
      { expiresIn: jwtConfig.jwtExpiration },
    );

    await models.refreshToken.updateExpiresById(refreshToken.id);

    return res.status(200).json({
      accessToken: newToken,
      accessTokenExpiry: Date.now() + (jwtConfig.jwtExpiration * 1000),
      refreshToken: refreshToken.token,
    });
  },
};

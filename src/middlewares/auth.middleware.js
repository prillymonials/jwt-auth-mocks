import jwt from 'jsonwebtoken';

import jwtConfig from '../config/jwt.config.js';

export default {
  verifyToken(req, res, next) {
    const auth = req.headers.authorization;
    
    if (!auth) {
      return res.status(403).json({ message: 'No token provided.' });
    }

    const token = auth.replace('Bearer ', '');

    jwt.verify(token, jwtConfig.secret, (err, decoded) => {
      if (err) {
        if (err instanceof jwt.TokenExpiredError) {
          return res.status(401).json({ message: 'Access token was expired.' });
        }
      
        return res.status(401).json({ message: 'Unauthorized.' });
      }

      req.userId = decoded.id;
      next();
    });
  },
};

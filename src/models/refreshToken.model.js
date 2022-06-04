import { v4 as uuidv4 } from 'uuid';

import jwtConfig from '../config/jwt.config.js';

export default function(db) {
  return {
    async create(payload) {
      const expiresAt = Date.now() + (jwtConfig.jwtRefreshExpiration * 1000);
      
      const refreshToken = {
        ...payload,
        id: db.data._tokensId,
        expiresAt,
        token: uuidv4(),
      };

      db.data.tokens.push(refreshToken);

      db.data._tokensId += 1;

      await db.write();

      return refreshToken;
    },
    findByToken(refreshToken) {
      return db.data.tokens.find(
        token => token.token === refreshToken,
      );
    },
    async updateExpiresById(id) {
      const index = db.data.tokens.findIndex(token => token.id === id);
      
      if (index !== -1) {
        const expiresAt = Date.now() + (jwtConfig.jwtRefreshExpiration * 1000);
        db.data.tokens[index].expiresAt = expiresAt;
      }

      await db.write();
    },
    async deleteById(id) {
      db.data.tokens = db.data.tokens.filter(token => token.id !== id);

      await db.write();
    }
  };
};

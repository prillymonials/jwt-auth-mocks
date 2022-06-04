import middleware from '../middlewares/index.js';
import authController from '../controllers/auth.controller.js';

export default function(app) {
  app.post(
    '/api/auth/register',
    [
      middleware.signUpMiddleware.checkDuplicateUsernameOrEmail,
    ],
    authController.signUp
  );

  app.post('/api/auth/login', authController.signIn);

  app.post('/api/auth/refresh', authController.refreshToken);
};

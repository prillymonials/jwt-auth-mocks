import middleware from '../middlewares/index.js';
import employeeController from '../controllers/employee.controller.js';

export default function(app) {
  app.get(
    '/api/employees',
    [
      middleware.authMiddleware.verifyToken,
    ],
    employeeController.list
  );
};

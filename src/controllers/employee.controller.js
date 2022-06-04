import models from '../models/index.js';

export default {
  list(_req, res) {
    res.status(200).json({ data: models.employee.findAll() });
  },
};

import { Low, JSONFile } from 'lowdb';
import path from 'path';

import userModel from './user.model.js';
import refreshTokenModel from './refreshToken.model.js';
import employeeModel from './employee.model.js';

const dbPath = path.resolve(process.cwd(), './database/db.json');

const adapter = new JSONFile(dbPath);
const db = new Low(adapter);

await db.read();

const user = userModel(db);
const refreshToken = refreshTokenModel(db);
const employee = employeeModel(db);

export default {
  user,
  refreshToken,
  employee,
};

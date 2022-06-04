import express from 'express';
import cors from 'cors';

import authRoute from './routes/auth.route.js';
import employeeRoute from './routes/employee.route.js';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors({
  origin: ['http://localhost:3000', 'https://coach-app.vercel.app']
}));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get('/', (_req, res) => {
  res.json({ message: 'Welcome to bezkoder application.' });
});

// routes
authRoute(app);
employeeRoute(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

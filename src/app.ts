import express from 'express';
import bodyParser from 'body-parser';
import contractRoutes from './routes/contract.route';
import jobRoutes from './routes/job.route';
import profileRoutes from './routes/profile.route';
import adminRoutes from './routes/admin.route';
import { sequelize } from './models';

const app = express();

app.use(bodyParser.json());

app.use(contractRoutes);
app.use(jobRoutes);
app.use(profileRoutes);
app.use(adminRoutes);

app.set('sequelize', sequelize);
app.set('models', sequelize.models);

export default app;

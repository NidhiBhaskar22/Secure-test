import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import authRoutes from './routes/auth.js';
import testRoutes from './routes/tests.js';
import sessionRoutes from './routes/sessions.js';
import dashboardRoutes from './routes/dashboard.js';
import assignRoutes from './routes/assign.js';

const app = express();

app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
);
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/assign', assignRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

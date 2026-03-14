import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = parseInt(process.env.API_PORT || '3001', 10);

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5000'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some(o => origin.startsWith(o))) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
}));
app.use(express.json());

app.use('/api', authRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[api] PETTODO API server running on port ${PORT}`);
});

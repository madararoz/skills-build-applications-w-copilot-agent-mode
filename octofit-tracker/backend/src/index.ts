import express from 'express';
import mongoose from 'mongoose';

const PORT = Number(process.env.PORT ?? 8000);
const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit';

const app = express();
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/', (_req, res) => {
  res.send('OctoFit Tracker backend is running.');
});

async function start() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB at', MONGODB_URI);

    app.listen(PORT, () => {
      console.log(`Backend listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
}

start();

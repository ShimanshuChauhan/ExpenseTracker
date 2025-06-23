import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.status(401).json({
    status: 'server is running'
  });
});

export default app;
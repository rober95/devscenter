import express from 'express';
import mongoose from 'mongoose';

import { router as users } from './routes/api/users.js';
import { router as profile } from './routes/api/profile.js';
import { router as posts } from './routes/api/posts.js';

const app = express();

// DB Config
import { mongoURI } from './config/keys.js';

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

app.get('/', (req, res) => res.send('Hello'));

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

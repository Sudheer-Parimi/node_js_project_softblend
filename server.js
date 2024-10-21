const express = require('express');
const connectDB = require('./config/db');
const swaggerDocs = require('./swagger');

require('dotenv').config();

const app = express();
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// Swagger Documentation
swaggerDocs(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

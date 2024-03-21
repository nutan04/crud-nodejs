const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const session = require('express-session');

const app = express();
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
}));
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/books', bookRoutes);
app.use('/users', userRoutes);



mongoose.connect('mongodb://localhost:27017/myDataBase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.error('Error connecting to MongoDB:', err.message));

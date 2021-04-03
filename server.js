const path = require('path');
const express= require('express')
const dotenv = require('dotenv');

const app= express()
const connectDB = require('./config/db');
const profileroutes = require('./routes/api/profile')
const authroutes= require('./routes/api/auth')
const postroutes=require('./routes/api/posts')
const usersroutes = require('./routes/api/users')

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Mouting the users:

app.use('/api/profile/', profileroutes)
app.use('/api/auth/', authroutes)

app.use('/api/post/', postroutes)
app.use('/api/users/', usersroutes)

app.use('/', (req,res)=>{
    res.json({"msg": "The api is running"})
})

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  // server.close(() => process.exit(1));
});

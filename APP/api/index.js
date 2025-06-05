/*const Transaction = require('./models/transaction.js');
const app=express();
const cors=require('cors');
*/


import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Transaction from './models/transaction.js';
import dotenv from 'dotenv';

dotenv.config();


const app=express();
//const cors=require('cors');

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

/*
app.get('/api/test', (req,res) => {
    res.json('test ok');
});
*/

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));


app.listen(PORT,() => {
    console.log('Server is running on port ${PORT}');
})

app.post('/api/transaction', async (req, res) => {
  try {
    const { name, price, description, datetime } = req.body;
    const transaction = await Transaction.create({ name, price, description, datetime });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



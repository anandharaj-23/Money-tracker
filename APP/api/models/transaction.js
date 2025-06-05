/*import express from 'express';
import cors from 'cors';
const app = express();*/

import mongoose from 'mongoose';
const {Schema,model} = mongoose;


const TransactionSchema = new Schema({
    name : {type:String,required:true},
    price:{type:Number,required:true},
    description:{type:String,required:true},
    datetime: {type:Date,required:true},
});

const TransactionModel = model('Transaction',TransactionSchema);

export default TransactionModel;


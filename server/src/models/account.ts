import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    accountName: {
        type: String,
        required: true,
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true,
        // default: function() {
        //     let accountNumber = "";
        //     for (let i = 0; i < 10; i++) {
        //         accountNumber += Math.floor(Math.random() * 10);
        //     }
        //     return accountNumber;
        // }
    },
    type: {
        type: String,
        required: true,
        enum: ['savings', 'current'],
    },
    balance: {
        type: Number,
        default: 0,
    },
    currency: {
        type: String,
        required: true,
        enum: ['usd', 'inr'],
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    // transactions
});

const Account = mongoose.model('Account', accountSchema);

export default Account;

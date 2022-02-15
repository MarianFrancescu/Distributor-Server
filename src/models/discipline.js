require('dotenv').config()
const mongoose = require('mongoose');
mongoose.connect(process.env.APP_DATABASE_URL, { useNewUrlParser: true });

const wSchema = mongoose.Schema({
    name: String,
    students: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }
    ],
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Disciplines', wSchema);
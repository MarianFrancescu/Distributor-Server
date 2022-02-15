require('dotenv').config()
const mongoose = require('mongoose');
mongoose.connect(process.env.APP_DATABASE_URL, { useNewUrlParser: true });

const wSchema = mongoose.Schema({
    name: String,
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }
    ,
    discipline: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplines' },
    preferences: [String],
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Preferences', wSchema);
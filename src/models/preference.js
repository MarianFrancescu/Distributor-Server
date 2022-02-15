require('dotenv').config()
const mongoose = require('mongoose');
mongoose.connect(process.env.APP_DATABASE_URL, { useNewUrlParser: true });

const wSchema = mongoose.Schema({
    name: String,
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }
    ,
    disciplineID: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplines' },
    options: [String],
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Preferences', wSchema);
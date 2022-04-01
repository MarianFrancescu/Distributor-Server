require('dotenv').config()
const mongoose = require('mongoose');
mongoose.connect(process.env.APP_DATABASE_URL, { useNewUrlParser: true });

const wSchema = new mongoose.Schema({
    studyInstitution: String,
    faculties: [{
      faculty: String,
      departments: [String]  
    }],
    created: { type: Date, default: Date.now },
},{
    collection: "Institutions"
});

module.exports = mongoose.model('Institutions', wSchema);

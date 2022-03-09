require('dotenv').config()
const mongoose = require('mongoose');
mongoose.connect(process.env.APP_DATABASE_URL, { useNewUrlParser: true });

const ROLE = require('./roles');

const wSchema = new mongoose.Schema({
    //TODO: add validation for all fields
    email: String,
    firstName: String,
    lastName: String,
    registrationNumber: String,
    password: String,
    studyInstitution: String,
    faculty: String,
    department: String,
    studyYear: String,
    // disciplinesID: [{ type: String, ref: 'Disciplines', unique : true }],
    created: { type: Date, default: Date.now },
    role: { type: String,
            default: ROLE.BASIC,
            enum: [ROLE.ADMIN, ROLE.BASIC, ROLE.SUPERADMIN]
        },
},{
    collection: "Users"
});

module.exports = mongoose.model('Users', wSchema);

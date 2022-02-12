require('dotenv').config()
const mongoose = require('mongoose');
mongoose.connect(process.env.APP_DATABASE_URL, { useNewUrlParser: true });

const ROLE = {
    ADMIN: 'admin',
    BASIC: 'basic',
    SUPERADMIN: 'superAdmin'
  }

const wSchema = new mongoose.Schema({
    //TODO: add validation for all fields
    email: String,
    username: String,
    password: String,
    faculty: String,
    department: String,
    yearOfStudy: String,
    created: { type: Date, default: Date.now },
    role: { type: String, 
            default: ROLE.BASIC,
            enum: [ROLE.ADMIN, ROLE.BASIC, ROLE.SUPERADMIN] 
        },
},{
    collection: "Users"
});

module.exports = mongoose.model('Users', wSchema);
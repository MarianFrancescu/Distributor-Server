const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Users', { useNewUrlParser: true });

const ROLE = {
    ADMIN: 'admin',
    BASIC: 'basic',
    SUPERADMIN: 'superAdmin'
  }

const wSchema = new mongoose.Schema({
    username: String,
    password: String,
    created: { type: Date, default: Date.now },
    role: { type: String, default: ROLE.BASIC },
},{
    collection: "Users"
});

module.exports = mongoose.model('Users', wSchema);
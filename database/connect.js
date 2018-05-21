const mongoose = require ("mongoose");
mongoose.connect("mongodb://localhost:27017/casas");
module.exports = mongoose;

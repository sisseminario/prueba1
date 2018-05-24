const mongoose = require ("mongoose");
mongoose.connect("mongodb://localhost:27017/casas1");
module.exports = mongoose;

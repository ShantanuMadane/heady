const mongoose = require("mongoose");
module.exports.connect = dbName => {
  // var mongodbUri = 'mongodb://localhost:27017/'+dbName;
  var mongodbUri =
    "mongodb+srv://shantanuHeady:shantanu@237@cluster0.lmlzk.mongodb.net/"+dbName+"?retryWrites=true&w=majority";
  mongoose.connect(
    mongodbUri,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    },
    (err, result) => {
      if (!err) {
        console.log("database connected successfully");
      }
    }
  )
};

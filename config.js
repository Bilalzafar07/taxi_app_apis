const mongoose = require('mongoose')
//allahisgreat
const url = 'mongodb://localhost:27017/shafiquedb';

mongoose.set('bufferCommands', true);

const connectionDB = async()=>{
   await mongoose.connect(url,{
       useNewUrlParser:true,
       useUnifiedTopology:true,
       useFindAndModify:false
   },()=>{
       console.log('Connected to the database!')
   })
}




module.exports = connectionDB

//mongodb+srv://dbUser:allahisgreat@cluster0.uwzzc.mongodb.net/NewAuth?retryWrites=true&w=majority
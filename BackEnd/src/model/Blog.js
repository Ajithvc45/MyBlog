const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Blog');

mongoose.connection.on('connected',()=>{
    console.log('connected to database mongodb @ 27017');
});

mongoose.connection.on('error',(err)=>{
    if(err)
    {
        console.log('Error in Database conncetion:'+err)
    }
});

 
const Schema = mongoose.Schema;

var Blog = new Schema({
    blogName: String,
    authorName: String,
    story:String
})

const bloglist = mongoose.model('blogs', Blog);
module.exports = bloglist;
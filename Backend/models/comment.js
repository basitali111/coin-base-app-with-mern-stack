const  mongoose  =  require('mongoose');

const {Schema} = mongoose;

const commentSchema = new Schema({
    comment: {type:String,required:true},
    blog: {type:mongoose.Schema.Types.ObjectId,ref:"Blog"},
    auther: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
},
{timestamps:true}
);

module.exports = mongoose.model("Comment",commentSchema,"comments");
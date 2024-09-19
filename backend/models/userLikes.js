const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// UserLikes schema
const userLikesSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        Ref: 'User',
        required: true
    }, 
    anime: {
        type: String,  
        required: true
    }
}, {timestamps: true});

const UserLikes = mongoose.model('UserLikes', userLikesSchema);
module.exports = UserLikes;








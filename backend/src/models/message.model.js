import mongoose from "mongoose";

// define schema
const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String, //not required since we can send only image messages
    },
    image: {
        type: String, //not required since we can send only text messages
    }    
},
{
    timestamps: true 
}
);


// create model
const Message = mongoose.model("Message", messageSchema);
// export model
export default Message;
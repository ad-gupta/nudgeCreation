import mongoose from "mongoose";

const schema = new mongoose.Schema({
    tag: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    coverNudgeimg: {
        type: String, 
        required: true
    },
    ScheduledDate: {
        type: String, 
        required: true
    },
    ScheduledTime: {
        type: String, 
        required: true
    },
    desc: {
        type: String, 
        required: true
    },
    iconImg: {
        type: String, 
        required: true
    },
    invitationLine: {
        type: String, 
        required: true
    }
})

export default mongoose.model('wireframe', schema)
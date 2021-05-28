import mongoose from 'mongoose'
 
const answersSchema=new mongoose.Schema({
    answer:{
        type:String,
        required:true
    },
    questionId:{
        type:Object,
        required:true
    },
    userId:{
        type:Object,
        required:true
    },
    upVoteCount:{
        count:{
            type:Number,
            default:0
        },
        likedUsers:{
            type:Array,
            default:[]
        }
    },
    downVoteCount:{
        count:{
            type:Number,
            default:0
        },
        likedUsers:{
            type:Array,
            default:[]
        }
    }
})

const answers=mongoose.model('answers',answersSchema)
export{answers}
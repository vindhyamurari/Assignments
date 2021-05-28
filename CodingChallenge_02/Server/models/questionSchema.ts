import mongoose from 'mongoose'
 
const questionsSchema=new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    userId:{
        type:Object,
        required:true
    },
    category:{
        type:Array,
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

const questions=mongoose.model('questions',questionsSchema)
export{questions}
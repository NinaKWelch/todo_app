import mongoose from 'mongoose'
const { Schema } = mongoose

const todoSchema = new Schema({
  text: {
    type: String,
    required: [true, 'text is required'],
    minlength: 4,
  },
  completed: Boolean,
})

export const Todo = mongoose.model('Todo', todoSchema)

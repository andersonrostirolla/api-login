import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    alias: 'email'
  },
  password: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true
  }
})

export default mongoose.model('TryLogin', Schema)

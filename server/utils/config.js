// https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import * as dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.NODE_ENV !== 'test' && process.env.PORT
export const MONGODB_URI = process.env.MONGODB_URI
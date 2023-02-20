import {config} from 'dotenv'

config()

export const bucketName = process.env.AWS_NAME
export const bucketRegion = process.env.AWS_REGION
export const publicKey = process.env.AWS_PUBLIC_KEY
export const secretKey = process.env.AWS_SECRET_KEY 
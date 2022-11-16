
import * as dotenv from 'dotenv'
import * as AWS from 'aws-sdk';
import * as crypto from 'crypto'
import { promisify } from "util"

//This file contains the connection to my aws-s3 bucket where  all the contact's photo's will be saved.
//In this file you can find the function generateUploadURL which generates a secured url which the client-side
// can use to upload images directly to the aws-s3.
//All the connection properties are extracted fron the .env file.

const randomBytes = promisify(crypto.randomBytes)
dotenv.config()

const region = process.env.REGION
const bucketName = process.env.BUCKET_NAME
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY


const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})


export async function generateUploadURL() {
  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex')
  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  })
  

  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  return uploadURL
}
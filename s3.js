import {S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand} from '@aws-sdk/client-s3'
import fs from 'fs'
import {bucketRegion, publicKey, secretKey, bucketName} from './config.js'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const client = new S3Client({
    region: bucketRegion,
    credentials:{
        accessKeyId:publicKey,
        secretAccessKey:secretKey
    }
})

export async function uploadFile(file){
    const stream = fs.createReadStream(file.tempFilePath)
    const uploadParams = {
        Bucket: bucketName,
        Key: file.name,
        Body:stream
    }
const command = new PutObjectCommand(uploadParams)
return await client.send(command)
}

export async function getFiles(){
    const command = new ListObjectsCommand({
        Bucket: bucketName
    })
    return await client.send(command)
    
}

export async function getOneFile(filename){
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: filename
    })
    return await client.send(command)
    
}

export async function downloadOneFile(filename){
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: filename
    })
    const result = await client.send(command)
    console.log(result)

    result.Body.pipe(fs.createWriteStream(`./downloads/${filename}`))
}

export async function getFileURL(filename){
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: filename
    })
    return await getSignedUrl(client, command, {expiresIn: 3600})
    
}
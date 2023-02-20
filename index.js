import express from 'express'
import fileUpload from 'express-fileupload'
import { downloadOneFile, getFileURL, getFiles, getOneFile, uploadFile } from './s3.js'
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'

// import './config.js'

const app = express()

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: "./uploads"
}))

app.get('/files', async(req, res) =>{
    const result = await getFiles()
    res.json(result.Contents)
})

app.get('/files/:fileName', async(req, res) =>{
    const result = await getFileURL(req.params.fileName)
    res.json({
        url: result
    })
})

app.get('/downloadfile/:fileName', async(req, res) =>{
    await downloadOneFile(req.params.fileName)
    res.json('archivo descargado') 
})

app.post('/files', async (req, res) =>{
    const result = await uploadFile(req.files.file)
    res.json({result})
})

app.use(express.static('downloads'))

app.listen(3000)
console.log(`escuchando en el puerto ${3000}`)
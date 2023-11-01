const AWS = require('../Config/awsConfig')
const s3 = new AWS.S3();
const p = require('path')
const bucketName=process.env.S3_BUCKET_NAME

function generateName(oldName){
    const extension = p.extname(oldName);
    const newName = Math.random().toString(36).substring(7)

    const finalName = newName + extension;

    return finalName
}

exports.uploadFile = async (key, body) => {
    try{
        console.log(body)
        const b = Buffer.from(body[0].split(',')[1], 'base64')
        const name = generateName(key)
        const params = {
        Bucket: bucketName,
        Key: name,
        Body: b,
        };
        const res = await s3.upload(params).promise();

        return{
            err: false,
            link: res.Location,
        }
    }catch (error){
        return{
            err: true,
            message: error.message,
        }
    }
};
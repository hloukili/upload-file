const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _  = require('lodash');


const app = express();

// enable files upload

app.use(fileUpload({
    createParentPath: true,
    useTempFiles: true,
}));

//add other middleware
app.use(cors());
//body-parser extract the entire body portion of an incoming request stream and exposes it on req.body.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev'));

//start app

const port = process.env.PORT || 3000;

// Route for allows users to upload their profile pictures.
app.post('/upload-profile', (req,res) =>{

    try {
        if(!req.files) {
            res.send({
                status:false,
                message: 'No file Uploaded'
            });
        } else {
            // Use the name of the input field to retrieve the uploaded file
            let avatar = req.files.avatar;
         
            // Use the mv() method to place the file in upload directory
            avatar.mv('./uploads/' + avatar.name);
     
           //send response
            res.send({
                status:true,
                message: 'File is uploaded succesfully',
                data: {
                    name: avatar.name,
                    mimetype:avatar.mimetype,
                    size:avatar.size,
                    tempFilePath:avatar.tempFilePath,
                    tempFileDir : avatar.tempFileDir
                }
            });
            
        }
    }catch (err) {
        res.status(500).send(err);
    }
});

 
app.listen(port,() =>
console.log(`App is listening on port ${port}.`)
);

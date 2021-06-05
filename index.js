const express = require('express')
const mongoose = require('mongoose')


const bodyParser = require('body-parser')
const multer = require('multer')


const authRouter = require('./routes/auth')


const app = express()


const url = "mongodb+srv://Sherif:rAzCmDang1ZCsYnc@cluster0.qwr9u.mongodb.net/course-app-api?retryWrites=true&w=majority"


const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
    }
})


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}


app.use(bodyParser.json())
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))
app.use('/images', express.static('images'))


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/api/auth', authRouter)

app.use(function (error, req, res, next) {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
})


mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(result => {
    app.listen(3000)
    console.log("Connected")
}).catch(err => {
    console.log(err)
})

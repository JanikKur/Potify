require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const { connect } = require('./db/conntect');
const podcasts = require('./routes/podcasts');
const users = require('./routes/users');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = process.env.BACKEND_PORT || 8080;
const environment = process.env.NODE_ENV;
const isDevelopment = environment === 'development'; 
const app = express();

/*--STATIC ROUTES--*/
app.use('/images', express.static(path.join(__dirname + '/public/images'))); //images
app.use('/', express.static(path.join(__dirname + '/../build'))); //webapp

/*--FILE UPLOADING--*/
app.use(fileUpload({
    createParentPath: true
}));

/*--COOKIES AND CREDENTIALS--*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/*--SECURITY--*/
!isDevelopment && app.use(helmet());

/*--PERFORMANCE--*/
app.use(compression()); 

/*--CORS--*/
isDevelopment && app.use(cors({
    origin: ['http://localhost:3000', 'http://192.168.2.100:3000', 'http://172.20.10.2:3000'],
    credentials: true
}));

/*----ROUTES----*/
app.use('/api/v1/podcast', podcasts);
app.use('/api/v1/user', users);


app.get('*', function(req, res){
    res.sendFile(path.join(__dirname + '/../build/index.html'));
});

const start = async () => {
    try {
        await connect(process.env.MONGO_URL);
        /* const httpsServer = https.createServer({

            key: fs.readFileSync(path.join(__dirname + '/certificates/server.key'), 'utf8'),
            cert: fs.readFileSync(path.join(__dirname + '/certificates/server.cert'), 'utf8'),
        }, app); */

        app.listen(5080, () => console.log(`HTTP Server is listening on port ${5080}`));
        //httpsServer.listen(PORT, () => console.log(`HTTPS Server is listening on port ${PORT}`));
    }
    catch (err) {
        console.log(err);
    }
}

start();
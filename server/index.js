const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const express = require('express');
const mongoose = require('mongoose');

const Monitors = require('./monitors');
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(bodyParser.json());

const username = process.env.User || 'Sreeman';
const password = process.env.Pass || 'Sree@123';

const url = `mongodb+srv://${username}:${password}@cluster0.yq86o.mongodb.net/<dbname>?retryWrites=true&w=majority`;

const connect = mongoose.connect(url,{
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
  });

connect.then(() => {
    console.log('Connected correctly to server');
})
.catch((err) => console.log(err));

app.get('/GetMonitors/',(req,res,next) => {
    Monitors.find({})
    .then((monitors) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(monitors);
    }, (err) => next(err))
    .catch((err) => next(err));
})
app.post('/CheckResponse/',(req,res,next) => {

    let resp = {
        success : ''
    };

    const headers = {
        method: 'GET'
    };

    let didTimeOut = false;

    const timeout = setTimeout(() => {
        didTimeOut = true;
    }, req.body.seconds * 1000);


    fetch(req.body.url, headers)
    .then(() => {
        clearTimeout(timeout);
        if(!didTimeOut) {
            console.log("done")
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({
                "done" : true
            });
            resp.success = "done";
        }
        else{
            console.log("not done");
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({
                "done" : false
            });
            resp.success = "time exceeded";
        }
        Monitors.findOne({url:req.body.url})
        .then((mon) => {
            if (mon !== null) {
                    mon.responses.push(resp);
                    mon.save()
                    .then((data) => {
                        console.log(data) 
                    })
            }
            else
            {
                const mon = {
                    name: req.body.name,
                    url : req.body.url,
                    seconds : req.body.seconds,
                    responses : [resp]
                }
                Monitors.create(mon)
                .then((data) => {
                    console.log(data) 
                })
            }
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .catch( error => {
        console.error('There was an error!', error);
        res.statusCode = 500;
        res.send("Server Error, verify the URL provided");
        resp.success = "Unvalid Url";
        Monitors.findOne({url:req.body.url})
        .then((mon) => {
            if (mon !== null) {
                    mon.responses.push(resp);
                    mon.save()
                    .then((data) => {
                        console.log(data) 
                    })
            }
            else
            {
                const mon = {
                    name : req.body.name,
                    url : req.body.url,
                    seconds : req.body.seconds,
                    responses : [resp]
                }
                Monitors.create(mon)
                .then((data) => {
                    console.log(data) 
                })
            }
        }, (err) => next(err))
        .catch((err) => next(err));
    })


});




app.get('*' ,(req,res) => {
  res.statusCode = 400;
  res.end("Bad Sree Request path");
});

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running at port ${port}/`);
});
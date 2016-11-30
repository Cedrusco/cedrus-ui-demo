var express = require('express');
var morgan = require('morgan');
// var bodyParser = require('body-parser');
var path = require('path');
var port = 3000;
var app = express();

app.use(morgan('dev'));

app.set('root', path.join(__dirname, '../'));

app.use('/lib', express.static(app.get('root') + '/bower_components'));
app.use('/', express.static(app.get('root') + '/client/app'));
app.use(express.static(app.get('root') + '/client'));
app.use(express.static(app.get('root') + '/client/assets'));


app.use(function (req, res, next) {

    if (path.extname(req.path).length > 0) {
        res.status(404).end();
    } else {
        next(null);
    }

});

app.get('/*', function (req, res, next) {

    res.sendFile(path.join(app.get('root'), '/client/app/index.html'));

});

app.listen(port, function () {

    console.log(`Now listening on port: ${port}`);

});
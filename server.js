let express = require("express")
let app = express()
const PORT = 3000;
let path = require("path")
let hbs = require('express-handlebars');
let formidable = require('formidable');


let uploadedFiles = []

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));
app.set('view engine', 'hbs');
app.use(express.static('static'))
app.use(express.urlencoded({
    extended: true
}));

let context = {}

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

app.post('/handleUpload', function (req, res) {

    let form = formidable({});

    form.uploadDir = __dirname + '/static/upload/';
    form.keepExtensions = true;
    form.multiples = true;

    form.parse(req, function (err, fields, files) {
        let a = files.filesUpload;
        console.log(a);
        if (Array.isArray(a)) {
            for (let i = 0; i < a.length; i++) {
                console.log(i);
                uploadedFiles.push(a[i]);
            }
        }
        else {
            uploadedFiles.push(a)
        }
        //console.log("----- przesłane formularzem pliki ------");
        //console.log(files)
        //console.log("----- tablica ------");
        //console.log(uploadedFiles)
        res.send(uploadedFiles)
    });
});

app.get("/", function (req, res) {
    res.render('upload.hbs', context);
})
app.get("/upload", function (req, res) {
    res.render('upload.hbs', context);
})
app.get("/fileManager", function (req, res) {
    res.render('fileManager.hbs', context);
})
app.get("/info", function (req, res) {
    res.render('info.hbs', context);
})
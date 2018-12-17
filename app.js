const fs = require("fs");
const express = require('express');
const morgan = require("morgan");
const multer = require("multer");

const uploadsPath = './public/uploads';
const upload = multer({dest: uploadsPath});

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

let uploadedPhotos = [];

app.use(morgan('dev'));
app.use(express.static('./public'));

app.post('/upload', upload.array('image', 3), (req, res) => {
  console.error("kkkkk req.file kkkkk", req.files);
  uploadedPhotos = [];
  for(let file of req.files) {
    uploadedPhotos.push(file.filename);
  }
  res.redirect('/photos');
});

app.get('/photos', (req, res) => {
  res.render('photos', {photos: uploadedPhotos});
});

app.route('/photos/:photoid')
  .delete((req, res) => {
    const photoname = req.params.photoid;
    console.log("deleting", photoname);
    fs.unlink(`${uploadsPath}/${photoname}`, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      const index = uploadedPhotos.indexOf(photoname);
      uploadedPhotos.splice(index, 1);
      res.send({message: 'successful'});
    });
  });

app.use((err, req, res, next) => {
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(401).send({message: 'max of 3 file'});
  }
  next(err);
});

const port = 3001;

app.listen(port, () => {console.log("server listening on port", port)})

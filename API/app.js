const express = require('express');
const app = express();
const port = 44100;
var fs = require('fs');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fileupload = require("express-fileupload");

var sqlite3 = require("sqlite3"),
    TransactionDatabase = require("sqlite3-transactions").TransactionDatabase;

const DBSOURCE = "imagesdb.sqlite";

var db = new TransactionDatabase(
    new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    } 
    else {
             
        db.run(`CREATE TABLE ProductImages (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            Mimetype TEXT,                         
            Filename TEXT,                         
            Size INTEGER,                         
            DateCreated DATE
            )`,
        (err) => {
            if (err) {
                // Table already created
            }
        });  
    }
  })
);

module.exports = db

app.use(
    express.urlencoded(),
    cors(),
    fileupload()    
);
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => res.send('API Root'));

// G E T   A L L
app.get("/api/images", async (req, res, next) => {
    var sql = "SELECT * FROM ProductImages"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.post("/api/upload-multiple-files", (req, res) => {    
    var dir = `./uploads/`;    
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    var fileCount = 0;
    var files = [];
    var fileKeys = Object.keys(req.files);
    
    fileKeys.forEach(function(key) {
        files.push(req.files[key]);
    });
    
    files.forEach(element => {                
        var newFileName = `${uuidv4()}.jpg`;        
        var newPath = `./uploads/${newFileName}`;        
        fileCount++;
        
        
        var imageBinary = element.data;

        try {
            fs.writeFile(newPath, imageBinary, 'base64', function(err){});                
        } catch (error) {
            console.log(error);
        }                

        var data = {            
            Filename: newFileName,
            Mimetype: element.mimetype,
            Size: element.size,
            DateCreated: Date('now')
        }

        var sql ='INSERT INTO ProductImages (Filename, Mimetype, Size, DateCreated) VALUES (?,?,?,?)'
        var params = [data.Filename, data.Mimetype, data.Size, Date('now')]

        db.run(sql, params, function (err, result) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
        });       
    });

    res.json({
        message: `Successfully uploaded files`
    })    
    
});


app.listen(port, () => console.log(`API listening on port ${port}!`));
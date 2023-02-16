const mongoose = require("mongoose");
const postModel = require("./schema")
const express = require("express");
const cors = require("cors");
const path = require('path');
require("dotenv").config();
// const UserController = require('./routes/userR')

const app = express();

//middleware 
app.use(express.json({limit: "30mb", extended: true}));
app.use(cors());
app.use(express.urlencoded({extended:false}));

//database
mongoose.connect(process.env.MONGOKEY, (db)=> {
    console.log("connected to db")
}, (err)=> {
    console.log(err);
});
// static files
app.use(express.static(path.join(__dirname, './instaclone/build')));

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, './instaclone/build/index.html'))
})

// const DB = "mongodb://localhost/instaclone";

const port = process.env.PORT || 3005;

const server = app.listen(port, () => {
  console.log("Server is up listening on port:" + port);
});

app.get("/postform", (req,res)=>{
    postModel.find().sort({time : 1}).then((post)=> {
        res.status(200).send( post );
    }).catch((err)=>{
        res.status(400).send(err);
    })
})

//post data
//http://localhost:3005/postform
app.post("/postform",(req,res)=>{
    const postdate = new Date();
    let datepost = postdate + ""
    datepost = datepost.split(" ");
    datepost = datepost.splice(1, 3).join(" ");

    postModel.create({
        image : req.body.image,
        likes: req.body.likes,
        author: req.body.author,
        date: datepost,
        location: req.body.location,
        description : req.body.description
    }).then((db)=>{
        res.status(200).send("Post Created Successfully")
    }).catch((err)=>{
        res.status(400).send(err);
    })
})
app.delete("/delete/:_id",(req,res)=>{
    postModel.find({_id: req.params._id}).then(()=>{
        try{
            postModel.deleteOne({_id: req.params._id}).then((post)=>{
                console.log("post deleted  successfully")
                res.status(200).send("Post Deleted")

            }).catch((err)=>{
                console.log(err)
                res.status(400).send("Post Deleted")
            })
        }catch(err){
            res.status(400).send("Post Not found")
        }
    })
})

// app.use('/user', UserController);
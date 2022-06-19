const express = require('express');
const bloglist = require('./src/model/Blog');
const cors = require('cors');
const bodyparser = require('body-parser');
const { Router } = require('express');

const app = new express();
app.use(cors());
app.use(bodyparser.json());


app.get('/blog', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    bloglist.find() 
        .then(function (blog) {
            res.send(blog);
        })
})

app.post('/insert', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    
    var blogs = {
        blogName: req.body.item.blogName,
        authorName: req.body.item.authorName,
        story: req.body.item.story
    }

    var blog = new bloglist(blogs);
    blog.save();
})



app.delete('/remove/:id', (req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    // id = req.params.id;
    id = req.params.id;
    bloglist.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log("Success") 
        res.send();
    })
})

// app.delete('/blog/:id', (req, res, next)=>{
//     bloglist.deleteOne({_id:req.params.id}).then(result=>{
//         console.log(result);
//         res.status(200).json({
//         message:"Blog deleted"
//     });
    
//     });
// });

app.get('/blog/:id', (req, res) => {
    const id = req.params.id;
    bloglist.findOne({"_id":id})
    .then((blog)=>{
        res.send(blog); 
    });
});

app.put('/update',(req, res)=>{
    console.log(req.body)
    id=req.body._id,
    blogName=req.body.blogName,
    authorName=req.body.authorName,
    story=req.body.story
    bloglist.findByIdAndUpdate({"_id":id},
                                {$set:{"blogName":blogName,
                                        "authorName":authorName,
                                        "story":story}})
    .then(function(){
        res.send
    })
})

app.listen(3000);
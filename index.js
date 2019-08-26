// implement your API here
const express = require('express')
const db = require('./data/db.js')
const server = express();

server.use(express.json());



server.get('/users', (req,res) =>{
    db.find().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        res.status(500).json({ error: "The users information could not be retrieved." })
    })
})

server.post('/users', (req, res)=>{

    const userInformation = req.body;
    userInformation.bio && userInformation.name ?  db.insert(userInformation).then(newUser =>{
        res.status(201).json(newUser);
    }) : res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
   
    .catch(err =>{
        res.status(500).json({ error: "There was an error while saving the user to the database" })
    })
})

server.get('/users/:id', (req, res) =>{
    const {id} = req.params;

    db.findById(id)
    .then(user => {
        if(user){
        res.status(200).json(user)
        } else{
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
    .catch(err =>{
        res.status(500).json({ error: "The user information could not be retrieved." })
    })
})

server.delete('/users/:id', (req,res)=>{
    const userId = req.params.id;

    db.remove(userId)
    .then(user =>{
        if(user){
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
        
    })
    .catch(err =>{
        res.status(500).json({ error: "The user could not be removed" })
    })
})






server.put('/users/:id', (req, res) =>{
    const {id} = req.params;
    const changes = req.body;

    changes.name && changes.bio? db.update(id, changes) .then(updated =>{
        if(updated){
            res.status(200).json(updated)
        } else{
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    }) .catch(err =>{
        res.status(500).json({ error: "The user information could not be modified." })
    }) : res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
 
    
})
const port = 8000;
server.listen(port, () => console.log('\napi running\n'));
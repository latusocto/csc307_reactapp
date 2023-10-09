import express from "express";
import cors from 'cors';

const app = express();
const port = 8000;
const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    res.send(users);
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    const newUser = addUser(userToAdd);
    res.status(201).send(newUser);
});

function addUser(user){
    const id = generateID();
    user['id'] = id;
    users['users_list'].push(user);
    return user;
}

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    const user = findUserById(id);
    if (user === undefined || user.length == 0)
        res.status(404).send('Resource not found.');
    else {
        const index = users['users_list'].indexOf(user);
        users['users_list'].splice(index, 1);
        res.status(204).send(user);
    }
});

app.get('/users/:name/:job', (req, res) => {
    const name = req.params['name'];
    const job = req.params['job'];
    let users = findUsersByNameAndJob(name, job);
    if (users === undefined || users.length == 0)
        res.status(404).send('Resource not found.');
    else {
        users = {users_list: users};
        res.send(users);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

function findUsersByNameAndJob(name, job) {
    return users['users_list'].filter( (user) => user['name'] === name && user['job'] === job);
}

function generateID() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let id = '';
    for (let i = 0; i < 3; i++) {
      const randomLetter = letters[Math.floor(Math.random() * letters.length)];
      id += randomLetter;
    }
    for (let i = 0; i < 3; i++) {
      const randomNumber = Math.floor(Math.random() * 10);
      id += randomNumber;
    }
    return id;
  }

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});     

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// const port = 3001;

// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/mydatabase', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error(' MongoDB error:', err));

// app.get('/', (req, res) => {
//   res.send('Hello from backend!');
// });

// app.listen(port, () => {
//   console.log(` Server running at http://localhost:${port}`);
// });

// const express = require('express');
// const path = require('path');

// const app = express();

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// app.get('/', (req, res) => {
//   res.render('index'); // Will look for views/index.ejs
// });

// app.listen(3001, () => {
//   console.log('Server running on http://localhost:3001');
// });
const express = require('express');
const app = express();
const PORT = 5000;
const userModel=require('./models/user')
const dbConnection=require('./config/db')
app.use(express.json()); // for parsing JSON request bodies
app.use(express.urlendcoded({extended:true}))
app.use(express.static("public"))
app.set("view engine",'ejs')
let tasks = []; // In-memory task list
let idCounter = 1; // To give each task a unique ID
app.get('/',(req,res)=>{
  res.render('index')
})
// POST /addTask → Add new task
app.post('/addTask', (req, res) => {
  const { taskName } = req.body;
  if (!taskName) {
    return res.status(400).json({ message: 'Task name is required' });
  }
  const newTask = { id: idCounter++, taskName };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// GET /tasks → Show all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// DELETE /task/:id → Delete task by id
app.delete('/task/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === taskId);
  if (index === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  const deleted = tasks.splice(index, 1);
  res.json({ message: 'Task deleted', task: deleted[0] });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



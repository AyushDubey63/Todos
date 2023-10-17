import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const app = express();

app.use(express.json());
app.use(cors());
const mongoURL = process.env.MONGO_URL
mongoose.connect(mongoURL)
.then(() => console.log("Connected to MongoDB"))
.catch(console.error);

// Models
// const Todo = require('./models/Todo.js');
import Todo from './models/Todo.js'

app.get('/todos', async (req, res) => {
	const todos = await Todo.find();

	res.json(todos);
});

app.post('/todo/new', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	})

	todo.save();

	res.json(todo);
});

app.delete('/todo/delete/:id', async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);

	res.json({result});
});

app.get('/todo/complete/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);
	// console.log(todo.complete)
	todo.complete = !todo.complete;

	todo.save();

	res.json(todo);
})

app.put('/todo/update/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.text = req.body.text;

	todo.save();

	res.json(todo);
});

app.listen(3001);
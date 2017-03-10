import React from 'react';

const Title = React.createClass({
	render: function() {
		return (
			<div>
				<h1>to-do ({this.props.todoCount})</h1>
			</div>
		);
	}
});

const TodoForm = React.createClass({
	render: function() {
		let input;
		return (
			<form onSubmit={(e) => {
				e.preventDefault();
				this.props.addTodo(input.value);
				input.value = '';
			}}>
				<input ref={node => {input = node;}} />
				<br />
			</form>
		);
	}
});

const Todo = React.createClass({
	render: function() {
		return (
			<li>
				<a href="#" 
				className="list-group-item" 
				onClick={() => {this.props.remove(this.props.todo.key)}}>ID :{this.props.todo.key} / Text : {this.props.todo.text}
				</a>
			</li>
		);
	}
});

const TodoList = React.createClass({
	render: function() {
		const todoNode = this.props.todos.map((todo) => {
			return (
				<Todo todo={todo} 
					key={todo.key}
					remove={this.props.remove} />
			);
		});

		return (
			<div className="list-group"
			style={{marginTop:'30px'}}
			>{todoNode}</div>
		);
	}
});

window.id = 0;
var todos = new Array();

class TodoApp extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
	}

	componentDidMount() {
		this.setState({
			data: todos
		});
	}

	addTodo(val) {
		const todo = {
			text: val,
			key : (new Date()).getTime()
		}
		todos.push(todo);
		this.setState({data : todos});
	}

	handleRemove(key) {
		const remainder = this.state.data.filter((todo) => {
			if (todo.key !== key) return todo;
		});

		todos = remainder;
		this.setState({data : todos});
	}

	render() {
		return (
		<div>
			<Title todoCount={this.state.data.length} />
			<TodoForm addTodo={this.addTodo.bind(this)} />
			<TodoList todos={this.state.data}
					remove={this.handleRemove.bind(this)}
			/>
		</div>
		);
	}
}

export default TodoApp;
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

const TodoFilter = React.createClass({
	render: function() {
		return (
			<div>
				<a href="#"
				style={{margin:'30px'}}
				onClick={() => {this.props.showAll()}}>All
				</a>
				<a href="#"
				style={{margin:'30px'}}
				onClick={() => {this.props.showCompleted()}}>Completed
				</a>
				<a href="#"
				style={{margin:'30px'}}
				onClick={() => {this.props.showUncompleted()}}>Uncompleted
				</a>
			</div>
		);	
	}
});

const Todo = React.createClass({
	render: function() {
		return (
			<li>
				<input type="checkbox" onChange={() => {this.props.complete(this.props.todo.key)}} checked={this.props.todo.isCompleted}/>
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
					remove={this.props.remove}
					complete={this.props.complete} />
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
		console.log("in componentDidMount");
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

	handleComplete(key) {
		let update;
		const remainder = todos.map((todo) => {
			if (todo.key == key) {
				if (todo.hasOwnProperty('isCompleted')) {
					update = {
						text: todo.text,
						key : todo.key,
						isCompleted: !(todo.isCompleted)
					}
				} else {
					update = {
						text: todo.text,
						key : todo.key,
						isCompleted: true
					}
				}
				return update;

			} else {
				return todo;
			}
		});
		todos = remainder;
		this.setState({data : todos});
	}

	handleRemove(key) {
		const remainder = this.state.data.filter((todo) => {
			if (todo.key !== key) return todo;
		});

		todos = remainder;
		this.setState({data : todos});
	}

	handleShowComplete() {
		const remainder = todos.filter((todo) => {
			if (todo.hasOwnProperty('isCompleted') &&
				todo.isCompleted == true) {
				return todo;
			} 
		});

		this.setState({data : remainder});
	}

	handleShowUncomplete() {
		const remainder = todos.filter((todo) => {
			if (todo.hasOwnProperty('isCompleted') == false ||
				todo.isCompleted == false) {
				return todo;
			}
		});

		this.setState({data : remainder});
	}

	handleShowAll() {
		this.setState({data : todos});
	}

	render() {
		return (
		<div>
			<Title todoCount={this.state.data.length} />
			<TodoFilter showAll={this.handleShowAll.bind(this)} 
						showCompleted={this.handleShowComplete.bind(this)}
						showUncompleted={this.handleShowUncomplete.bind(this)}
			/>
			<TodoForm addTodo={this.addTodo.bind(this)} />
			<TodoList todos={this.state.data}
					remove={this.handleRemove.bind(this)}
					complete={this.handleComplete.bind(this)}
			/>
		</div>
		);
	}
}

export default TodoApp;
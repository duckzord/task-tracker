import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

// Display some tasks

// Add a new task

class TaskContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userName: 'Tom Gray',
      taskList: []
    }

    this.addTask = this.addTask.bind(this)
  }

  componentDidMount() {
    axios.get("http://localhost:5003/tasks")
      .then(res => res.data.map((task) => {
        this.setState((state) => ({
          taskList: this.state.taskList.concat([task.description])
        }))
      }))
  }

  addTask(task) {
    this.setState((state) => ({
      taskList: state.taskList.concat([task])
    }))
  }

  render() {
    return (
      <div>
        <h3> {this.state.userName} </h3>
        <AddTask addNew={this.addTask} />
        <ShowTasks tasks={this.state.taskList} />
      </div>
    )
  }
}

class ShowTasks extends React.Component {
  render() {
    return (
      <div>
        <h3> Task List: </h3>
        <ul>
          {this.props.tasks.map((task) => {
            return <li> {task} </li>
          })}
        </ul>
      </div>
    )
  }
}

class AddTask extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      newTask: ''
    }

    this.updateNewTask = this.updateNewTask.bind(this)
    this.handleAddNew = this.handleAddNew.bind(this)
  }

  updateNewTask(e) {
    this.setState({
      newTask: e.target.value
    })
  }
  
  handleAddNew() {
    this.props.addNew(this.state.newTask)
    this.setState({
      newTask: ''
    })
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.newTask}
          onChange={this.updateNewTask}
        />
        <button onClick={this.handleAddNew}> Add Task </button>
      </div>
    )
  }
}

ReactDOM.render(<TaskContainer />, document.getElementById('root'))
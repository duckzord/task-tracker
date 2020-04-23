import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TaskData = props => {
    return(
        <tr>
            <td>{props.task.description}</td>
            <td>{props.task.priority}</td>
            <td>{props.task.difficulty}</td>
            <td>{props.task.size}</td>
            <td>{props.task.deadline.substring(0,10)}</td>
            <td>
                <Link to={"/edit/"+props.task._id}>edit</Link>
            </td>
        </tr>
    )
}

export default class TaskList extends Component {
    constructor(props) {
        super(props);

        //this.deleteTask = this.deleteTask.bind(this);
        this.taskList = this.taskList.bind(this);

        this.state = {tasks: []};
    }

    componentDidMount() {
        axios.get("http://localhost:5003/tasks/")
          .then(response => {
              this.setState({tasks: response.data});
          })
          .catch((error) => {
              console.log(error);
          })
    }

    taskList() {
        return this.state.tasks.map(currentTask => {
            return <TaskData task={currentTask} key={currentTask._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Tasks</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Description</th>
                            <th>Priority</th>
                            <th>Difficulty</th>
                            <th>Size</th>
                            <th>Deadline</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.taskList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
import React, { Component } from 'react';
import axios from 'axios'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateTask extends Component {
    constructor(props) {
        super(props)

        this.state = {
            description: '',
            priority: '',
            deadline: new Date(),
            priorities: []
        }

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.onChangeDeadline = this.onChangeDeadline.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.setState( {
            priorities: ['Test Priority', 'Test Priority 2'],
            priority: 'Test Priority'
        })

        axios.get('http://localhost:5003/priorities')
          .then(response => {
              if (response.data.length > 0) {
                this.setState( {
                    priorities: response.data.map((priority) => priority.name),
                    priority: response.data[0]
                })
              }
          })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangePriority(e) {
        this.setState({
            priority: e.target.value
        })
    }

    onChangeDeadline(date) {
        this.setState({
            deadline: date
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const task = {
            description: this.state.description,
            priority: this.state.priority,
            deadline: this.state.deadline
        }

        console.log(task);

        axios.post('http://localhost:5003/tasks/add', task)
          .then(res => console.log(res.data));

        // Go back to the list of tasks
        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Create New Task</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Priority: </label>
                        <select ref="userInput"
                                required
                                className="form-control"
                                value={this.state.priority}
                                onChange={this.onChangePriority}>
                            {
                                this.state.priorities.map(function(priority) {
                                    return <option
                                        key={priority}
                                        value={priority}> {priority} </option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.description}
                               onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Deadline: </label>
                        <div>
                            <DatePicker
                                selected={this.state.deadline}
                                onChange={this.onChangeDeadline}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Task" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
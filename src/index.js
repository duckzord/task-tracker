import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component.js";
import TaskList from "./components/task-list.component";
import EditTask from "./components/edit-task.component";
import CreateTask from "./components/create-task.component";


function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={TaskList} />
        <Route path="/edit/:id" component={EditTask} />
        <Route path="/create" component={CreateTask} />
      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
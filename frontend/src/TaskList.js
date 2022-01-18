import React from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const TaskList = (props) => {
  const checkChange = (e) => {
    var id = props.tasks[e.target.id]._id;
    var done = !(props.tasks[e.target.id].done);
    axios
    .post("http://localhost:8000/updateDone", { id, done })
    .then((res) => {
      console.log(res.data);
      props.onChange(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const handleChange = (e) => {
    var id = props.tasks[e.target.id]._id;
    var name = e.target.value;
    axios
    .post("http://localhost:8000/updateTask", { id, name })
    .then((res) => {
      console.log(res.data);
      props.onChange(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const deleteTask = (e) => {
    var id = props.tasks[e.target.id]._id;
    axios
      .post("http://localhost:8000/delete", { id })
      .then((res) => {
        console.log(res.data);
        props.onChange(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const list = props.tasks.map((task, i) => {
    if(props.filter === 'All' || (props.filter === 'Active' && task.done === 0) || (props.filter === 'Completed' && task.done === 1)) {
      return (<>
        <li key={i} value={task.name} style={{ display: "flex"}}>
        <input className="my-4 col-2" type="checkbox" id={i} name={i} value={i} checked={task.done} onClick={checkChange}></input>
        <input className="task shadow p-2 my-2 col-7 strikethrough" type="text" id={i} value={task.name} for={i} onChange={handleChange}></input>
        <Button className="btn btn-danger m-2 col-2" id={i} onClick={deleteTask}>X</Button></li></>)
    } else {
      return (<></>);
    }
  });

  return (
    <div className="container">
      <ul className="list-unstyled row m-5">
      { list }
      </ul>
    </div>
  )
}
export default TaskList;
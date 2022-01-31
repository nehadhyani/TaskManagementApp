import React from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const Tasks = (props) => {
  const [data, setData] = React.useState('');

  React.useEffect(() => {
    setData(props.task.name);
  }, []);

  const checkChange = (e) => {
    var id = props.task._id;
    var done = !(props.task.done);
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
    setData(e.target.value);
  }

  const save = (e) => {
    var id = props.task._id;
    var name = e.target.value;
    axios
    .post("http://localhost:8000/updateTask", { id, name })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const deleteTask = (e) => {
    var id = props.task._id;
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

  const todo = () => {
    if(props.filter === 'All' || (props.filter === 'Active' && props.task.done === 0) || (props.filter === 'Completed' && props.task.done === 1)) {
      return (
        <li className="my-2" key={props.i} value={props.task.name} style={{ display: "flex"}}>
          <input className="my-3 mx-2 col-1 chkbox" type="checkbox" id={props.i} name={props.i} value={props.i} checked={props.task.done} onClick={checkChange}></input>
          <textarea className="task shadow col-sm-9 col-9 strikethrough" id={props.i} value={data} for={props.i} onChange={handleChange} onBlur={save}></textarea>
          <Button className="btn buttonStyle mx-2 my-1 col-1" variant="outline-secondary" id={props.i} onClick={deleteTask}>X</Button>
        </li>
      )
    }
  }

  return (
    <>{ todo() }</>
  )
}
export default Tasks;
import React from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const AddTask = (props) => {
  const [input, setInput] = React.useState('');
  
  const handleChange = (e) => {
    setInput(e.target.value);
  }

  const addTasks = () => {
    if(input !== '') {
      let data = input;
      axios
      .post("http://localhost:8000/add", { data })
      .then((res) => {
        console.log(res.data);
        props.onChange(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    setInput('');
  }
  
  const newTaskStyle = {background: 'transparent', color: 'white'};

  return (
    <div className="container row m-3 text-center" style={{display: "flex"}}>
      <div className="col-10 p-2">
        <input className="form-control newTask" style= {newTaskStyle} type="text" placeholder="New Task" value={input} onChange={handleChange}/>
      </div>
      <div className="col-2 p-2">
        <Button className="btn btn-warning" onClick={addTasks}>Add</Button>
      </div>
    </div>
  )
}
export default AddTask;
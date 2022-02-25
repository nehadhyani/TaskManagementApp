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

  return (
    <div className="container mt-3 mb-4">
      <div className="row justify-content-center">
        <div className="col-9 col-sm-10 col-md-11 p-2">
          <input className="form-control newTask" type="text" placeholder="New Task" value={input} onChange={handleChange}/>
        </div>
        <div className="col-2 col-sm-2 col-md-1 my-2 px-0">
          <Button className="btn addButton" variant="outline-secondary" onClick={addTasks}>Add</Button>
        </div>
      </div>
    </div>
  )
}
export default AddTask;
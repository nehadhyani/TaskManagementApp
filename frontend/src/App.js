import React from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Filter from "./Filter";
import Tasks from "./Tasks";
import AddTask from "./AddTask";

const App = () => {
  const [filter, setFilter] = React.useState('All');
  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    axios
      .post("http://localhost:8000/tasks")
      .then((res) => {
        console.log('data received');
        console.log(res.data);
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  }

  const refreshTask = (newTask) => {
    setTasks(newTask);
  }

  return (
    <div className="container-fluid my-5">
      <div className="ma-in row">
        <div className="col-sm-8 col-11 mx-auto text-white shadow-lg p-0">
          <div className="main p-3 py-5">
            <h2 className="text-center heading">Daily Planner</h2>
            <div className="container-fluid">
              <AddTask onChange={refreshTask}/>
              <div className="container-fluid">
                <ul className="list-unstyled row">
                {
                  tasks.map((task, i) => (
                    <Tasks filter={filter} task={task} i={i} onChange={refreshTask}/>)
                  )
                }
                </ul>
              </div>
            </div>
            <Filter filter={filter} onChange={changeFilter}/>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
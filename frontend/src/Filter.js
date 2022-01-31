import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

const Filter = (props) => {
  const filters = ['All', 'Active', 'Completed'];
  const radioChange = (e) => {
    props.onChange(e.currentTarget.value);
  }
  return (
    <div className="container line col-7">
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 filter justify-content-center">
        {
          filters.map((filter) => (<>
            <div className="col px-0 text-center">
              <ToggleButton
                variant="outline-secondary"
                className="btn filterbtn"
                id={filter}
                type="radio"
                name="radio"
                value={filter}
                checked={props.filter === filter}
                onChange={radioChange}
              >
                {filter}
              </ToggleButton>
            </div>
          </>))
        }
      </div>
    </div>
  );
}
export default Filter;
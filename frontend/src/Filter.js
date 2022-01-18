import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

const Filter = (props) => {
  const filters = ['All', 'Active', 'Completed'];
  const btnStyle = {
    color: 'silver',
    border: 0
  }
  const radioChange = (e) => {
    props.onChange(e.currentTarget.value);
  }
  return (
    <div>
      <ButtonGroup className="me-2 filter">
      {
        filters.map((filter) => (<>
          <ToggleButton
            style={btnStyle}
            variant="outline-success"
            id={filter}
            type="radio"
            name="radio"
            value={filter}
            checked={props.filter === filter}
            onChange={radioChange}
          >
            {filter}
          </ToggleButton>
        </>))
      }
      </ButtonGroup>
    </div>
  );
}
export default Filter;
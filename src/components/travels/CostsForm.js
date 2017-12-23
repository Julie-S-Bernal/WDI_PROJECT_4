import React from "react";
import { TextField } from "material-ui";
import Button from "material-ui/Button";

const CostsForm = ({ handleChange, handleSubmit, travel }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <TextField
          label="Hotel Cost"
          name="hotelCost"
          placeholder="Hotel cost"
          onChange={handleChange}
          value={travel.hotelCost}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <TextField
          label="Food Cost"
          name="foodCost"
          placeholder="Food cost"
          onChange={handleChange}
          value={travel.foodCost}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <TextField
          label="Extra Cost"
          name="extra"
          placeholder="Other expenses"
          onChange={handleChange}
          value={travel.extra}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <TextField
          label="Travel Cost"
          name="travelCost"
          placeholder="Travel cost"
          onChange={handleChange}
          value={travel.travelCost}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <TextField
          label="Transportation Cost"
          name="transportation"
          placeholder="transportation"
          onChange={handleChange}
          value={travel.transportation}
          className="form-control"
        />
      </div>

      <Button type="submit" className="btn btn-primary">
        Submit
      </Button>
    </form>
  );
};

export default CostsForm;

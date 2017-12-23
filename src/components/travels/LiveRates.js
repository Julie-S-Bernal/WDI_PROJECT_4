import React from "react";
import { TextField } from "material-ui";
import Button from "material-ui/Button";

const LiveRates = ({
  convertingMoney,
  handleExchangeChange,
  handleExchangeSubmit
}) => {
  return (
    <form onSubmit={handleExchangeSubmit}>
      <div className="form-group">
        <TextField
          label="Exchange Rate"
          name="convertingMoney"
          onChange={handleExchangeChange}
          value={convertingMoney}
          placeholder="Type Exchange Rate"
          className="form-control"
        />
      </div>
      <Button type="submit" className="btn btn-primary">
        Exchange
      </Button>
    </form>
  );
};

export default LiveRates;

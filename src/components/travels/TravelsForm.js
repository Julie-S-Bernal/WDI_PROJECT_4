import React from "react";
import currencyList from "../../lib/currencyList";
import countryList from "../../lib/countryList";
import { TextField } from "material-ui";
import { FormControl } from "material-ui/Form";
import Select from "material-ui/Select";
import Input, { InputLabel } from "material-ui/Input";
import Button from "material-ui/Button";
import { DatePicker } from "material-ui-pickers";
import { ArrowBack, ArrowForward } from "material-ui-icons";
import BackButton from "../utility/BackButton";

const TravelsForm = ({
  handleChange,
  handleSubmit,
  handleStartDateChange,
  handleEndDateChange,
  travel,
  errors
}) => {
  const formInvalid = Object.keys(errors).some(key => errors[key]);

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <DatePicker
          onChange={handleStartDateChange}
          value={travel.startTravelDate}
          returnMoment
          leftArrowIcon={<ArrowBack />}
          rightArrowIcon={<ArrowForward />}
        />
        {errors.name && <small>{errors.name}</small>}
      </div>
      <div className="form-group">
        <DatePicker
          value={travel.endTravelDate}
          onChange={handleEndDateChange}
          returnMoment
          leftArrowIcon={<ArrowBack />}
          rightArrowIcon={<ArrowForward />}
          minDate={travel.startTravelDate}
        />
        {errors.name && <small>{errors.name}</small>}
      </div>
      <div className="form-group">
        <FormControl>
          <InputLabel htmlFor="country-name-native">Country</InputLabel>
          <Select
            native
            value={travel && travel.country.name}
            onChange={handleChange}
            input={<Input name="country" id="country-name-native" />}
          >
            {countryList.map(cur => (
              <option key={cur.image} value={cur.name}>
                {cur.name}
              </option>
            ))}
          </Select>
        </FormControl>
        {errors.name && <small>{errors.name}</small>}
      </div>
      <div className="form-group">
        <FormControl>
          <InputLabel htmlFor="currency-code-native">Currency</InputLabel>
          <Select
            native
            value={travel && travel.currency}
            onChange={handleChange}
            input={<Input name="currency" id="currency-code-native" />}
          >
            {currencyList.map(cur => (
              <option key={cur.code} value={cur.code}>
                {cur.name}
              </option>
            ))}
          </Select>
        </FormControl>
        {errors.name && <small>{errors.name}</small>}
      </div>
      <div className="form-group">
        <TextField
          label="Hotel Cost"
          name="hotelCost"
          placeholder="Hotel cost"
          onChange={handleChange}
          value={travel.hotelCost}
          className="form-control"
        />
        {errors.name && <small>{errors.name}</small>}
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
        {errors.name && <small>{errors.name}</small>}
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
        {errors.name && <small>{errors.name}</small>}
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
        {errors.name && <small>{errors.name}</small>}
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

        {errors.name && <small>{errors.name}</small>}
      </div>

      <Button disabled={formInvalid} type="submit" className="btn btn-primary">
        Submit
      </Button>
      <BackButton />
    </form>
  );
};

export default TravelsForm;

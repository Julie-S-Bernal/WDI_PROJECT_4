import React from "react";
import Axios from "axios";

import TravelsForm from "./TravelsForm";
import countryList from "../../lib/countryList";

class TravelsEdit extends React.Component {
  state = {
    travel: {
      budget: 0,
      startTravelDate: "",
      endTravelDate: "",
      country: {
        name: "",
        image: ""
      },
      foodCostValues: [],
      travelCostValues: [],
      transportationCostValues: [],
      currency: "GBP",
      hotelCost: 0,
      travelCost: 0,
      extra: 0,
      foodCost: 0,
      transportation: 0
    },
    errors: {}
  };

  componentDidMount() {
    Axios.get(`/api/travels/${this.props.match.params.id}`)
      .then(res => this.setState({ travel: res.data }))
      .catch(err => console.log(err));
  }

  handleChange = ({ target: { name, value } }) => {
    if (name === "country") {
      value = countryList.find(country => country.name === value);
    }
    const travel = Object.assign({}, this.state.travel, { [name]: value });
    const errors = Object.assign({}, this.state.errors, { [name]: "" });
    this.setState({ travel, errors });
  };

  handleStartDateChange = selectedDate => {
    this.setState({
      ...this.state,
      travel: {
        ...this.travel,
        startTravelDate: selectedDate
      }
    });
  };

  handleEndDateChange = selectedDate => {
    this.setState({
      ...this.state,
      travel: {
        ...this.travel,
        endTravelDate: selectedDate
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    Axios.put(`/api/travels/${this.props.match.params.id}`, this.state.travel)
      .then(() =>
        this.props.history.push(`/travels/${this.props.match.params.id}`)
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <TravelsForm
        travel={this.state.travel}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        handleStartDateChange={this.handleStartDateChange}
        handleEndDateChange={this.handleEndDateChange}
        errors={this.state.errors}
      />
    );
  }
}

export default TravelsEdit;

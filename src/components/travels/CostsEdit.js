import React from "react";
import Axios from "axios";

import CostsForm from "./CostsForm";

class CostsEdit extends React.Component {
  state = {
    travel: {
      hotelCost: "",
      travelCost: "",
      extra: "",
      foodCost: "",
      transportation: ""
    }
  };

  componentDidMount() {
    Axios.get(`/api/travels/${this.props.travelId}`)
      .then(res => this.setState({ travel: res.data }))
      .catch(err => console.log(err));
  }

  handleChange = ({ target: { name, value } }) => {
    const travel = Object.assign({}, this.state.travel, { [name]: value });
    this.setState({ travel });
  };

  handleSubmit = e => {
    e.preventDefault();
    Axios.put(`/api/travels/${this.props.travelId}`, this.state.travel)
      .then(() => this.props.history.push(`/travels/${this.props.travelId}`))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <CostsForm
        travel={this.state.travel}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
      />
    );
  }
}

export default CostsEdit;

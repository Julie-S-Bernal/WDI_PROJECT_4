import React from "react";
import Axios from "axios";

import CostsForm from "./LiveRates";

class LiveRatesEdit extends React.Component {
  state = {
    money: {
      Amount: 0
    }
  };

  componentDidMount() {
    Axios.get(`/api/moneys/${this.props.moneyId}`)
      .then(res => this.setState({ money: res.data }))
      .catch(err => console.log(err));
  }

  handleChange = ({ target: { name, value } }) => {
    const money = Object.assign({}, this.state.money, { [name]: value });
    this.setState({ money });
  };

  handleSubmit = e => {
    e.preventDefault();
    Axios.put(`/api/moneys/${this.props.moneyId}`, this.state.money)
      .then(() => this.props.history.push(`/moneys/${this.props.moneyId}`))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <CostsForm
        money={this.state.money}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
      />
    );
  }
}

export default LiveRatesEdit;

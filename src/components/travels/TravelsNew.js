import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import moment from 'moment';
import TravelsForm from './TravelsForm';
import countryList from '../../lib/countryList';

class TravelsNew extends React.Component {
  state = {
    travel: {
      budget: 0,
      startTravelDate: moment(),
      endTravelDate: moment(),
      country: {
        name: '',
        image: ''
      },
      currency: '',
      hotelCost: 0,
      travelCost: 0,
      extra: 0,
      foodCost: 0,
      transportation: 0
    }
  }

  handleChange = ({ target: { name, value }}) => {
    if(name === 'country') {
      value = countryList.find(country => country.name === value);
    }
    const travel = Object.assign({}, this.state.travel, { [name]: value });
    this.setState({ travel }, () => console.log(this.state.travel));
  }

  handleStartDateChange = (selectedDate) => {
    const travel = Object.assign({}, this.state.travel, { startTravelDate: selectedDate });
    this.setState({ travel }, () => console.log(this.state.travel));
  };

  handleEndDateChange = (selectedDate) => {
    const travel = Object.assign({}, this.state.travel, { endTravelDate: selectedDate });
    this.setState({ travel }, () => console.log(this.state.travel));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .post('/api/travels', {
        ...this.state.travel,
        startTravelDate: new Date(this.state.travel.startTravelDate),
        endTravelDate: new Date(this.state.travel.endTravelDate)
      }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.props.history.push('/'))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <TravelsForm
        handleSubmit={ this.handleSubmit }
        handleChange={ this.handleChange }
        handleStartDateChange={ this.handleStartDateChange }
        handleEndDateChange={ this.handleEndDateChange}
        travel={ this.state.travel }
      />
    );
  }
}

export default TravelsNew;

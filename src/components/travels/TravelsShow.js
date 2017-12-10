import React    from 'react';
import Axios    from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';


class TravelsShow extends React.Component {

  state = {
    travel: {},
    rate: 1,
    user: {}
  }

  deleteTravel = () => {
    Axios
      .delete(`/api/travels/${this.props.match.params.id}`)
      .then(() => this.props.history.push('/'))
      .catch(err => console.log(err));
  }

  componentDidMount() {


    const user = Auth.getPayload();
    console.log(user);

    Axios.all([
      Axios.get(`/api/travels/${this.props.match.params.id}`),
      Axios.get(`/api/user/${user.userId}`)
    ])

      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }
  // componentWillMount() {
  //   Axios
  //     .get('https://www.alphavantage.co/query', {
  //       params: {
  //         function: 'CURRENCY_EXCHANGE_RATE',
  //         from_currency: 'JPY', //this.props.user.currency,
  //         to_currency: 'USD',//this.props.travel.currency,
  //         apikey: 'USD&OZZ3948H22SG8ADG'
  //
  //       }
  //     })
  //     .then(response => {
  //       const rate = response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
  //       console.log(rate * user.budget);
  //
  //     })
  //     .catch(err => console.log(err));
  // }


  render() {
    return(
      <div className="row">
        <div className="col-md-6">
          <h3>{ this.state.travel.country}</h3>
          <h4>{ this.state.travel.startTravelDate }</h4>
          <h4>{ this.state.travel.budget }</h4>
          <button className="standard-button">
            <Link to={`/travels/${this.state.travel.id}/edit`} >
              Edit
            </Link>
          </button>
          <button className="main-button" onClick={this.deleteTravel}>
          delete
          </button>
        </div>
      </div>
    );
  }
}

export default TravelsShow;

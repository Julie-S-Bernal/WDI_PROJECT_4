import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Card from "../utility/Card";
import Auth from "../../lib/Auth";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";

const classes = theme => ({
  button: {
    margin: theme.spacing.unit,
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    color: "white"
  }
});

class TravelsIndex extends React.Component {
  state = {
    travels: []
  };

  componentWillMount() {
    Axios.get(`/api/users/${Auth.getPayload().userId}`)
      .then(res => this.setState({ travels: res.data.travels }))
      .catch(err => console.log(err));
  }

  data = {
    image: "http://fillmurray.com/300/300"
  };

  render() {
    return (
      <div>
        <div className="page-banner">
          {Auth.isAuthenticated() && (
            <Link to="/travels/new" className="main-button">
              <Button raised className={(classes.button, "new-travel-button")}>
                Create new travel
              </Button>
            </Link>
          )}
          {Auth.isAuthenticated() && (
            <Link to="/travels/form" className="main-button" />
          )}
        </div>

        <Grid container spacing={24}>
          {this.state.travels.map(travel => {
            return (
              <Grid key={travel.id} item xs={12} sm={6}>
                <Card
                  image={travel.country.image}
                  name={travel.country.name}
                  url={`/travels/${travel.id}`}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default TravelsIndex;

import React from "react";
import Axios from "axios";
import Auth from "../../lib/Auth";
import moment from "moment";
import { VictoryChart, VictoryBar, VictoryTheme, VictoryPie } from "victory";

import CostsForm from "./CostsForm";
import LiveRates from "./LiveRates";
// import Grid from './ShowLayout'
import ShowLayout from "../utility/ShowLayout";
import BackButton from "../utility/BackButton";

import Button from "material-ui/Button";

import { withStyles } from "material-ui/styles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30
  },
  paper: {
    padding: 16,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  button: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    color: "white"
  }
});

// http://formidable.com/open-source/victory/docs/

class TravelsShow extends React.Component {
  state = {
    travel: null,
    rate: 1,
    user: {},
    convertingMoney: ""
  };

  deleteTravel = () => {
    Axios.delete(`/api/travels/${this.props.match.params.id}`)
      .then(() => this.props.history.push("/"))
      .catch(err => console.log(err));
  };

  getTravelLengthInDays = () => {
    const days = moment(this.state.travel.endTravelDate).diff(
      moment(this.state.travel.startTravelDate),
      "days"
    );
    return days;
  };

  newBudget = () => {
    const budgetSum =
      this.state.travel.hotelCost +
      this.state.travel.extra +
      this.state.travel.foodCost +
      this.state.travel.transportation +
      this.state.travel.travelCost;
    const days = this.getTravelLengthInDays();
    this.setState({
      totBudgetWithRate: budgetSum * this.state.rate,
      homeBudget: budgetSum,
      travelLength: days
    });
    return budgetSum;
  };

  handleChange = ({ target: { name, value } }) => {
    const travel = Object.assign({}, this.state.travel, { [name]: value });
    this.setState({ travel: travel });
  };

  handleSubmit = e => {
    e.preventDefault();

    Axios.put(`/api/travels/${this.state.travel.id}`, this.state.travel)
      .then(res => this.setState({ travel: res.data }))
      .catch(err => console.log(err));
  };

  handleExchangeChange = e => {
    this.setState({ convertingMoney: e.target.value });
  };

  handleExchangeSubmit = e => {
    e.preventDefault();
    const rate = this.state.convertingMoney * this.state.rate;
    this.setState({ convertedMoney: rate, convertingMoney: "" });
  };

  componentDidMount() {
    const userMeta = Auth.getPayload();

    Axios.all([
      Axios.get(`/api/travels/${this.props.match.params.id}`),
      Axios.get(`/api/users/${userMeta.userId}`)
    ])
      .then(
        Axios.spread((travel, user) => {
          this.setState(
            {
              ...this.state,
              travel: travel.data,
              user: user.data
            },
            () => {
              Axios.get("https://www.alphavantage.co/query", {
                params: {
                  function: "CURRENCY_EXCHANGE_RATE",
                  from_currency: this.state.user.homeCurrency, //this.props.user.currency,
                  to_currency: this.state.travel.currency, //this.props.travel.currency,
                  apikey: "USD&OZZ3948H22SG8ADG"
                }
              })
                .then(response => {
                  const rate =
                    response.data["Realtime Currency Exchange Rate"][
                      "5. Exchange Rate"
                    ];
                  this.setState({ ...this.state, rate }, () =>
                    this.newBudget()
                  );
                })
                .catch(err => console.log(err));
            }
          );
        })
      )
      .catch(err => console.log(err));
  }

  render() {
    if (!this.state.travel) return null;
    //
    var sum = this.state.travel.foodCostValues.reduce((a, b) => a + b);
    var avg = sum / this.state.travel.foodCostValues.length;

    var extraSum = this.state.travel.extraCostValues.reduce((a, b) => a + b);
    var avgExtra = extraSum / this.state.travel.extraCostValues.length;

    var transSum = this.state.travel.transportationCostValues.reduce(
      (a, b) => a + b
    );
    var avgTrans = transSum / this.state.travel.transportationCostValues.length;

    const sampleData = [
      { quarter: "AF", earning: avg, fill: "#FE6B8B" },
      { quarter: "IF", earning: this.state.travel.foodCostValues[0] },
      { quarter: "AEC", earning: avgExtra, fill: "#FE6B8B" },
      { quarter: "IC", earning: this.state.travel.extraCostValues[0] },
      { quarter: "ATF", earning: avgTrans, fill: "#FE6B8B" },
      {
        quarter: "ITFC",
        earning: this.state.travel.transportationCostValues[0]
      }
    ];

    const chart1 = (
      <VictoryChart
        domainPadding={20}
        style={{ border: { stroke: "black" }, labels: { fontSize: 10 } }}
        theme={VictoryTheme.material}
      >
        <VictoryBar
          style={{ data: { fill: "#FF8E53" }, labels: { fontSize: 10 } }}
          data={sampleData}
          x="quarter"
          y="earning"
        />
      </VictoryChart>
    );

    const chart2 = (
      <VictoryPie
        colorScale={["#FF8E53", "#42A5F5", "#FE6B8B", "#00BCD4", "#0D47A1"]}
        data={[
          {
            x: "food cost",
            y: parseInt(this.state.travel.foodCost),
            label: `Food ${this.state.travel.foodCost}`
          },
          {
            x: "hotel cost",
            y: parseInt(this.state.travel.hotelCost),
            label: `Hotel ${this.state.travel.hotelCost}`
          },
          {
            x: "extra",
            y: parseInt(this.state.travel.extra),
            label: `Extra ${this.state.travel.extra}`
          },
          {
            x: "travel cost",
            y: parseInt(this.state.travel.travelCost),
            label: `Travel  ${this.state.travel.travelCost}`
          },
          {
            x: "transportation",
            y: parseInt(this.state.travel.transportation),
            label: `Transportation ${this.state.travel.transportation}`
          }
        ]}
        events={[
          {
            target: "data",
            eventHandlers: {
              onClick: () => {
                return [
                  {
                    target: "labels",
                    mutation: props => {
                      return props.text === "clicked"
                        ? null
                        : { text: "clicked" };
                    }
                  }
                ];
              }
            }
          }
        ]}
      />
    );
    const countryName = <h3>{this.state.travel.country.name}</h3>;
    const startDate = (
      <h4>
        Start Date:{" "}
        {moment(this.state.travel.startTravelDate).format("YYYY MM DD")}
      </h4>
    );
    const endDate = (
      <h4>
        End Date: {moment(this.state.travel.endTravelDate).format("YYYY MM DD")}
      </h4>
    );
    // const data =
    const diffFood = (
      <h4>
        {" "}
        Food Dudget Difference:{" "}
        {parseFloat((avg - this.state.travel.foodCostValues[0]).toFixed(2))}
      </h4>
    );
    const diffExtra = (
      <h4>
        {" "}
        Extra Dudget Difference:{" "}
        {parseFloat(
          (avgExtra - this.state.travel.extraCostValues[0]).toFixed(2)
        )}
      </h4>
    );
    const diffBus = (
      <h4>
        {" "}
        Taxi,Bus... Dudget difference:{" "}
        {parseFloat(
          (avgTrans - this.state.travel.transportationCostValues[0]).toFixed(2)
        )}
      </h4>
    );
    const form = (
      <CostsForm
        travel={this.state.travel}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
    const liveRates = (
      <LiveRates
        convertingMoney={this.state.convertingMoney}
        handleExchangeChange={this.handleExchangeChange}
        handleExchangeSubmit={this.handleExchangeSubmit}
      />
    );
    const converted = <p>{this.state.convertedMoney}</p>;
    const edit = (
      <Button
        raised
        className={this.props.classes.button}
        onClick={() =>
          this.props.history.push(`/travels/${this.state.travel.id}/edit`)
        }
      >
        {" "}
        Edit{" "}
      </Button>
    );
    const erase = (
      <Button
        raised
        className={this.props.classes.button}
        onClick={this.deleteTravel}
      >
        Delete
      </Button>
    );
    const back = <BackButton />;
    const totals = !this.state.homeBudget ? (
      <p>LOADING....</p>
    ) : (
      [
        <h4 key={1}>
          Budget: {this.state.homeBudget} {this.state.user.homeCurrency}
        </h4>,
        <h4 key={2}>
          Exchanged Dudget:{parseFloat(this.state.totBudgetWithRate.toFixed(2))}{" "}
          {this.state.travel.currency}
        </h4>,
        <h4 key={3}>Length of Travel: {this.state.travelLength}</h4>,
        <h4 key={4}>
          {" "}
          Dailybudget {this.state.homeBudget / this.state.travelLength}{" "}
          {this.state.user.homeCurrency}
        </h4>,
        <h4 key={5}>
          {" "}
          Exchanged Daily Budget{" "}
          {parseFloat(
            (this.state.totBudgetWithRate / this.state.travelLength).toFixed(2)
          )}{" "}
          {this.state.travel.currency}
        </h4>
      ]
    );

    return (
      <ShowLayout
        chart1={chart1}
        chart2={chart2}
        countryName={countryName}
        startDate={startDate}
        endDate={endDate}
        diffFood={diffFood}
        diffExtra={diffExtra}
        diffBus={diffBus}
        form={form}
        liveRates={liveRates}
        converted={converted}
        edit={edit}
        erase={erase}
        back={back}
        totals={totals}
      />
    );
  }
}

export default withStyles(styles)(TravelsShow);

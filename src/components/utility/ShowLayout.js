import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
const second = deepPurple["900"];

import deepPurple from "material-ui/colors/deepPurple";

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
  },
  background: {
    background: "linear-gradient( 0deg, #311B92 40%, #FF8E53 60%)"
  }
});

function FullWidthGrid(props) {
  const {
    classes,
    chart1,
    chart2,
    countryName,
    endDate,
    startDate,
    diffFood,
    diffExtra,
    diffBus,
    form,
    liveRates,
    converted,
    edit,
    erase,
    back,
    totals
  } = props;

  return (
    <div className={classes.background}>
      {edit}
      {erase}
      {back}
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>{countryName}</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>{chart1}</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>{chart2}</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={`${classes.paper}  merde`}>{totals}</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={`${classes.paper} merde`}>
            {startDate}
            {endDate}
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={`${classes.paper} merde`}>
            {diffFood}
            {diffExtra}
            {diffBus}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>{form}</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {liveRates}
            {converted}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

FullWidthGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FullWidthGrid);

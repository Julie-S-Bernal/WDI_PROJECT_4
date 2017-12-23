import React from "react";
import { withRouter } from "react-router-dom";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    color: "white"
  },
  input: {
    display: "none"
  }
});

const BackButton = ({ history, classes }) => {
  return (
    <Button raised onClick={history.goBack} className={classes.button}>
      Back
    </Button>
  );
};

export default withRouter(withStyles(styles)(BackButton));

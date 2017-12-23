import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";

const styles = {
  card: {
    flexGrow: 1,
    marginTop: 30
  },
  media: {
    height: 200
  },
  background: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
  }
};

function SimpleMediaCard(props) {
  const { classes, image, name, url } = props;
  return (
    <div className={classes.background}>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={image} title={name} />
        <CardContent>
          <Typography type="headline" component="h2">
            {name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button href={url} dense color="primary">
            See your stats
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleMediaCard);

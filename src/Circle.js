import React from "react";
import { makeStyles, Paper, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

  Circ: {
    width: "7em",
    height: "7em",
    borderRadius: "50%",
    margin: "0.5em"
  },
}));

const Circle = ({ Label, Value }) => {
  const classes = useStyles();

  return (
    <>
      <Paper elevation={3} className={classes.Circ} >
        <Grid container
              spacing={1}
              direction="column"
              justify="center"
              alignItems="center" >
              <br/>
              <br/>
          <Grid item >Grupo: {Label}</Grid>
          <Grid item>{Value}</Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Circle;

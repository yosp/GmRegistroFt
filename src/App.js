import React, { useState } from 'react'
import { makeStyles, Paper, Grid, TextField, Button } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navbarcolor: {
    background: "#ffcc00",
  },
  logoStyles: {
    width: "11em",
    height: "2em",
    marginRight: ".5em",
    marginLeft: "-1em",
  },
  cardSpacing: {
    margin: "1em",
    width: "20rem",
    padding: "1em",
  },
  PaperSite: {
    padding: ".5rem",
    marginTop: "2em",
    width: "50em",
  },
  inputStyle: {
    width: "40em"
  }, 
  container: {
    width: "100%"
  },
  ButtonClass: {
    background: "#FFCC33",
    height: "4em",
    '&:hover': {
      color: 'black', 
      background: " #f5b800"
}
  }
  
}));

function App() {
  const classes = useStyles();
  const [CodigoEmp, setCodigoEmp] = useState()
  const handlerOnclick = () => {
    axios.get(`http://10.82.33.72:8000/api/getEmployee?User=${CodigoEmp}`, {
      headers: {
          'Content-Type': 'application/json'
      }
  }).then((response) => {
    setCodigoEmp('')
    if(response.data[0].result === 0){
      toast.success(`🦄 ${response.data[0].Nombre}`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        toast.success(`DEL AREA ${response.data[0].DesCUniOrga}`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        toast.success(`FUE REGISTRAD@`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
    } else {
      toast.error(`🦄 ${response.data[0].Nombre}`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        toast.error(`YA HA SIDO REGISTRADO`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
    }
  })

    
  }
  return (
    <>
      <div className={classes.root}>
        <Grid container className={classes.container}>
          <AppBar position="static" className={classes.navbarcolor}>
            <Toolbar>
              <img
                src={process.env.PUBLIC_URL + "/logo.png"}
                alt="logo"
                className={classes.logoStyles}
              />
            </Toolbar>
          </AppBar>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Paper elevation={2} className={classes.PaperSite}> 
                <TextField id="outlined-basic" 
                          label="Código Empleado" 
                          variant="outlined" 
                          className={classes.inputStyle} 
                          value={CodigoEmp}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handlerOnclick()
                              }
                          }}
                          onChange={e=>{setCodigoEmp(e.target.value)}}
                          />
                <Button className={classes.ButtonClass} onClick={(e) => {e.preventDefault() 
                                                                        handlerOnclick()
                  }}><SearchIcon/> Validar </Button>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <ToastContainer/>
      </div>
    </>
  );
}

export default App;

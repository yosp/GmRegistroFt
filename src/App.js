import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { makeStyles, 
        Paper, 
        Grid, 
        TextField, 
        Button,
        Table,
        TableBody,
        TableCell,
        TableContainer,
        TableHead,
        TableRow,
        TablePagination,
      } from "@material-ui/core";
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
let rows = [];

function App() {
  const classes = useStyles();
  const [CodigoEmp, setCodigoEmp] = useState()
  const [Loading, setLoading] = useState(false)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    {
      id: "CodigoEmp",
      label: "Codigo",
      minWidth: "100",
      align: "left",
      format: (value) => value
    },
    {
      id: "Nombres",
      label: "Nombre",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "DesCUniOrga",
      label: "Departamento",
      minWidth: "170",
      align: "left",
      format: (value) => value.toLocaleString(),
    },
    {
      id: "Hora",
      label: "Hora",
      minWidth: "170",
      align: "left",
      format: (value) => moment(value.toLocaleString()).format('LT') ,
    }
  ]
  const handlerOnclick = () => {
    axios.get(`http://10.82.33.72:8000/api/getEmployee?User=${CodigoEmp}`, {
      headers: {
          'Content-Type': 'application/json'
      }
  }).then((response) => {
    setCodigoEmp('')
    setLoading(true)
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
    setLoading(false)
  })

    
  }

  useEffect(()=>{
    axios.get(`http://10.82.33.72:8000/api/getEmployeeList`, {
      headers: {
          'Content-Type': 'application/json'
      }
  }).then((response) =>{
    response.data.forEach(e => {
      e.Hora = e.Fecha.split('T')[1].toString().substring(0,8)
    })
    rows = response.data
    if(rowsPerPage === 100) {
      setRowsPerPage(101)
    } else {
      setRowsPerPage(100)
    }
  }).catch((err) => {
        toast.error(`Ha ocurrido un error al cargar los registros`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
  }) 
  },[Loading])


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
      <br/>
      <div>
      <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  id={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[100,101,200]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
      </div>
    </>
  );
}

export default App;

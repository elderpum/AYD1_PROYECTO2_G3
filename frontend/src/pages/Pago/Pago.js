import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BsArrowLeft } from "react-icons/bs";
import { usePaymentInputs} from "react-payment-inputs";

import { 
  Grid, Button, InputLabel, FormControl, 
  MenuItem, Select, TextField
} from '@mui/material';
import '../../components/Titulo.css';
import styled from 'styled-components';
import useDocumentTitle from '../hooks/useDocumentTitle';

export function Pago({ setIndex }) {
  const [metodo, setMetodo] = useState('');
  const [nombre, setNombre] = useState('');
  const [tarjeta, setTarjeta] = useState('');
  const [fechaVence, setFechaVence] = useState('');
  const [CVC, setCVC] = useState('');
  const [total, setTotal] = useState('354.00')
  const { getExpiryDateProps } = usePaymentInputs();
  useDocumentTitle("Pago");


  const card1 = {
    num: "1234123412341234",
    cvc: "200",
    nombre: "Mario Moran",
    fecha: "10/25",
    saldo: 50
  }

  const card2 = {
    num: "9876987698769876",
    cvc: "100",
    nombre: "Fernando Serrano",
    fecha: "10/25",
    saldo: 50
  }

  useEffect(() => {
    setTotal('354.00')
  }, [])

  const regresar = () => {
    setIndex(3);
  }

  const handleNombre = (value) => {
    if (/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(value)) {
      setNombre(value)
    }
  }

  const handleTarjeta = (value) => {
    if (/^[0-9]{0,16}$/.test(value)) {
      setTarjeta(value)
    }
  }

  const handleFecha = (value) => {
    console.log(value)
    setFechaVence(value)
  }

  const handleCVC = (value) => {
    if (/^[0-9]{0,3}$/.test(value)) {
      setCVC(value)
    }
  }

  let theme = createTheme({});
  theme = createTheme(theme, {
    // Custom colors created with augmentColor go here
    palette: {
      salmon: theme.palette.augmentColor({
        color: {
          main: '#FFFFFF',
        },
        name: '#3DF28B',
      }),
    },
  });

  const cobro = () => {
    if (nombre === card1.nombre && tarjeta === card1.num && card1.cvc === CVC && card1.fecha === fechaVence) {
      let result = card1.saldo - total;
      if (result < 0) {
        alert("Cobro rechazado, no tiene saldo en su cuenta.")
      } else {
        alert("Cobro realizado co exito.")
      }
    } else if (nombre === card2.nombre && tarjeta === card2.num && card2.cvc === CVC && card2.fecha === fechaVence) {
      let result = card2.saldo - total;
      if (result < 0) {
        alert("Cobro rechazado, no tiene saldo en su cuenta.")
      } else {
        alert("Cobro realizado co exito.")
      }
    }
  }

  return (
    <BodyContent>
      <ContainerButton>
        <ThemeProvider theme={theme}>
          <Button variant="contained" color="salmon" onClick={regresar} style={{ marginRight: 20 }}>
            <BsArrowLeft style={{ color: "#3DF28B", fontSize: "1.5em" }} />
          </Button>
        </ThemeProvider>
        <h2> {"Pago"} </h2>
      </ContainerButton>
      <Info>
        <TituloInfo> Método de pago </TituloInfo>
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={3}>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-standard-label">Método De Pago</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={metodo}
                    onChange={(evt) => setMetodo(evt.target.value)}
                    label="Método De Pago"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Crédito</MenuItem>
                    <MenuItem value={20}>Debito</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={5}>
                <TextField 
                  required
                  fullWidth
                  id="outlined-basic" 
                  label="Nombre" 
                  helperText="Nombre que aparece en la tarjeta"
                  variant="outlined"
                  value={nombre}
                  onChange={(evt) => handleNombre(evt.target.value)}
                />
                <TextField 
                  required
                  fullWidth
                  id="outlined-basic" 
                  label="Número de tarjeta" 
                  variant="outlined"
                  value={tarjeta}
                  onChange={(evt) => handleTarjeta(evt.target.value)}
                  sx={{marginTop: 3}}
                />
                <TextField
                  required
                  fullWidth
                  id="outlined-basic" 
                  label="Fecha de vencimiento" 
                  variant="outlined"
                  value={fechaVence}
                  inputProps={getExpiryDateProps({ onChange: (evt) => handleFecha(evt.target.value) })}
                  sx={{marginTop: 3}}
                  helperText="MM/YY"
                />
                <TextField
                  required
                  fullWidth
                  id="outlined-basic" 
                  label="CVC" 
                  variant="outlined"
                  value={CVC}
                  onChange={(evt) => handleCVC(evt.target.value)}
                  sx={{marginTop: 3}}
                />
              </Grid>
              <Grid item xs={4}>
                <p className='total-price'> TOTAL: <h4 className='total-price'> Q {total} </h4> </p>
                <p></p>
                <Button variant="filled" size="small" sx={{ color: '#fff', backgroundColor: '#3DF28B' }} onClick={cobro}>
                  Pagar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Info>
    </BodyContent>
  )
}
/*
    modifcar cuota
    validar valor (numero)
*/

const TituloInfo = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@600&display=swap');

display: flex;
font-size: 22px;
justify-content: space-between;
font-family: 'Jost', sans-serif;
margin-bottom: 25px;
`

const ContainerButton = styled.div`
display: flex;
color: #3DF28B;
justify-content: start;
margin-top: 50px;
margin-bottom: 40px;
`

const Info = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@600&display=swap');

display: flex;
padding: 35px 25px;
flex-direction: column;

border-radius: 5px 5px 5px 5px;
-webkit-border-radius: 5px 5px 5px 5px;
-moz-border-radius: 5px 5px 5px 5px;
border: 1px solid #cccccc;

&.total-price {
  font-family: 'Jost', sans-serif;
}

`

const BodyContent = styled.div`
flex: 0.8;
bottom: 0;
padding-left: 75px;
padding-right: 75px;
`
/*
const Container = styled.div`
display: flex;
`

const Container2 = styled.div`
position: sticky;
top: 0;
flex: 0.2;
height: 100%;
min-height: 100vh;
background-color: #181818;
color: #b3b3b3;
min-width: 240px;
-webkit-box-shadow: 4px 5px 20px -7px rgba(0, 0, 0, 0.65);
-moz-box-shadow: 4px 5px 20px -7px rgba(0, 0, 0, 0.65);
box-shadow: 4px 5px 20px -7px rgba(0, 0, 0, 0.65);
text-size-adjust: none;
text-size-adjust: none;
`
*/
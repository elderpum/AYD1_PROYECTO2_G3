import React, { useState } from "react";
import { InputAdornment, Stack, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import LockIcon from '@mui/icons-material/Lock';

export function FormCliente({ cliente, create }) {
  // Estado de la fecha de nacimiento.
  const [date, setDate] = useState(
    cliente.nacimiento !== "" ? dayjs(cliente.nacimiento) : null
  );

  return (
    <>
      <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
        <TextField
          required
          id="nombre"
          label="Nombre"
          size="small"
          sx={{ width: "30%" }}
          inputProps={{
            typeof: "text",
            inputMode: "text",
            pattern: "[A-Za-z]*",
            title: "Solo se permiten letras.",
          }}
          defaultValue={cliente.nombre}
          onChange={(e) => (cliente.nombre = e.target.value)}
        />
        <TextField
          required
          id="apellido"
          label="Apellido"
          size="small"
          sx={{ width: "30%" }}
          inputProps={{
            inputMode: "text",
            pattern: "[A-Za-z]*",
            title: "Solo se permiten letras.",
          }}
          defaultValue={cliente.apellido}
          onChange={(e) => (cliente.apellido = e.target.value)}
        />
        <TextField
          required
          id="licencia"
          label="Licencia"
          size="small"
          sx={{ width: "25%" }}
          inputProps={{
            typeof: "number",
            inputMode: "numeric",
            pattern: "^\\d{13}$",
            title: "Debe tener exactamente 13 dígitos.",
          }}
          defaultValue={cliente.licencia}
          onChange={(e) => (cliente.licencia = e.target.value)}
        />
        <TextField
          required
          id="direccion"
          label="Dirección"
          size="small"
          sx={{ width: "40%" }}
          inputProps={{ inputMode: "text" }}
          defaultValue={cliente.direccion}
          onChange={(e) => (cliente.direccion = e.target.value)}
        />
        <TextField
          required
          id="correo"
          label="Correo"
          size="small"
          sx={{ width: "40%" }}
          defaultValue={cliente.email}
          onChange={(e) => (cliente.email = e.target.value)}
          inputProps={{
            inputMode: "email",
            pattern: "^[A-Za-z0-9]+@[A-Za-z0-9]+.[A-Za-z0-9]+$",
            title: "Ingrese un correo electrónico válido.",
          }}
        />
        <TextField
          required
          id="telefono"
          label="Telefono"
          size="small"
          sx={{ width: "18%" }}
          defaultValue={cliente.telefono}
          onChange={(e) => (cliente.telefono = e.target.value)}
          inputProps={{
            typeof: "number",
            inputMode: "numeric",
            pattern: "^\\d{8}$",
            title: "Debe tener exactamente 8 dígitos sin gion.",
          }}
        />
        <TextField
          required
          id="usuario"
          label="Usuario"
          size="small"
          sx={{ width: "30%" }}
          inputProps={{ inputMode: "text" }}
          defaultValue={cliente.user}
          onChange={(e) => (cliente.user = e.target.value)}
        />
        {create && (
          <TextField
            required
            id="password"
            label="Password"
            type='password'
            size="small"
            sx={{ width: "30%" }}
            InputProps={{
              startAdornment: (
                  <InputAdornment position="start">
                      <LockIcon />
                  </InputAdornment>
              ),
          }}
          variant="standard"
            defaultValue={cliente.password}
            onChange={(e) => (cliente.password = e.target.value)}
          />
        )}
        <LocalizationProvider id="nacimiento"  dateAdapter={AdapterDayjs} required>
          <DatePicker
            required
            label="Fecha de nacimiento"
            id="nacimiento"
            value={date}
            size="small"
            onChange={(newValue) => {
              setDate(newValue);
              cliente.nacimiento = newValue.format("YYYY-MM-DD");
            }}
          />
        </LocalizationProvider>
      </Stack>
    </>
  );
}
/*
const ContainerImages = styled.div`
display: flex;
margin-top: 25px;
overflow: auto;
white-space: nowrap;
`

 */

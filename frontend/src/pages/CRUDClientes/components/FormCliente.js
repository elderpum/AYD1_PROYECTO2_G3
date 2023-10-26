import React, { useState } from "react";
import { Stack, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

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
          id="outlined-required"
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
          id="outlined-required"
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
          id="outlined-required"
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
          id="outlined-required"
          label="Dirección"
          size="small"
          sx={{ width: "40%" }}
          inputProps={{ inputMode: "text" }}
          defaultValue={cliente.direccion}
          onChange={(e) => (cliente.direccion = e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
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
          id="outlined-required"
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
          id="outlined-required"
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
            id="outlined-required"
            label="Password"
            size="small"
            sx={{ width: "30%" }}
            inputProps={{ inputMode: "password" }}
            defaultValue={cliente.password}
            onChange={(e) => (cliente.password = e.target.value)}
          />
        )}
        <LocalizationProvider dateAdapter={AdapterDayjs} required>
          <DatePicker
            required
            label="Fecha de nacimiento"
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

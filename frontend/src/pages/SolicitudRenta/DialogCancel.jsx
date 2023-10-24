import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from '../hooks/useForm';
import { setRejected } from './helpers/setRejected';

export const DialogCancel = ({ open, handleClose }) => {

    // Estado para guardar los datos del formulario
    const { form, handleChange, handleReset } = useForm({
        reason: ''
    })


    const handleSend = () => {

        setRejected(form); // Funcion para rechazar la solicitud.

        handleReset();

        handleClose();

    }


    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Rechazar Solicitud</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Escribir en el cuadro de texto el motivo por el cual se rechaza la solicitud de
                    la renta.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Escribir aqui.."
                    fullWidth
                    variant="standard"
                    name='reason'
                    value={form.reason}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button disabled={form.reason === '' ? true : false} onClick={handleSend}>Enviar</Button>
            </DialogActions>
        </Dialog>
    )
}

import React from 'react';
import styled from 'styled-components';

import { Button, Avatar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import ImageIcon from '@mui/icons-material/Image';

export const ImageInput = ({ image, handleImageChange }) => {

    let theme = createTheme({});
    theme = createTheme(theme, {
        // Custom colors created with augmentColor go here
        palette: {
            salmon: theme.palette.augmentColor({
                color: {
                main: '#222',
                },
                name: 'salmon',
            }),
        },
    });

    return (
        <Container>
            {image ? (
                <img
                    alt="Profile"
                    src={image}
                    style={{
                        overflow: 'hidden',
                        marginLeft: '35px'
                    }} // Ajusta estos valores para cambiar el tamaño
                />
            ) : (
                <Avatar
                    alt="Profile"
                    style={{
                        width: '200px',
                        height: '200px',
                        overflow: 'hidden',
                        borderRadius: '15px',
                    }}>
                <ImageIcon/>
                </Avatar>
            )}
            <form>
                <input
                    accept="image/*"
                    style={{ display: 'none', width: 1 }}
                    id="profile-image-input"
                    type="file"
                    onChange={handleImageChange}
                />
                <label htmlFor="profile-image-input">
                    <ThemeProvider theme={theme}>
                        <Button
                            sx={{ width: '200px', margin: 0 }}
                            variant="outlined"
                            color="salmon"
                            component="span"
                            startIcon={<AddToPhotosIcon />}
                        >
                            Elegir Imagen
                        </Button>
                    </ThemeProvider>
                </label>
            </form>
        </Container>
    );
};

const Container = styled.div`
display: inline-block;

& img {
    border-radius: 7px;
    margin-right: 40px;
    width: 200px;
    max-width: 200px;
}



`

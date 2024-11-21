import React from 'react'
import { useForm } from 'react-hook-form'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth_user, providerGoogle } from '../../firebase/appConfig'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { Button, TextField, Typography, Container, Box } from '@mui/material'
import { Google as GoogleIcon } from '@mui/icons-material'

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm()

    //metodo para iniciar sesion
    const loginForm = (data) => {
        signInWithEmailAndPassword(auth_user, data.email, data.password)
            .then((userCredentiales) => {
                const user = userCredentiales.user
                console.log(user);
                //guardando info usuario en localstorage
                saveLocalStorage("user_firebase", JSON.stringify(user))
            }).catch((error) => {
                console.error(error.mesage);
                Swal.fire({
                    title: "Credenciales Invalidas",
                    text: "Revisa la información ingresada",
                    icon: "warning"
                })
            })
    }

    //metodo para iniciar sesion con Google
    const loginGoogle = async () => {
        try {
            const result = await signInWithPopup(auth_user, providerGoogle);
            console.log(result.user);
            //guardando info de usuario en localstorage
            saveLocalStorage("user_firebase", JSON.stringify(user))
        } catch (error) {
            console.error(error.mesage);
            Swal.fire({
                title: "Error al autenticarse con Google",
                text: "Revisa la información ingresada",
                icon: "warning"
            })
        }
    }

    //metodo para guardar usuario en localstorage
    const saveLocalStorage = (key, data) => {
        localStorage.setItem(key, data);
    }

    return (
        <Container maxWidth="xs">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8, }} >
                <Typography component="h1" variant="h5"> Inicio de Sesión </Typography>
                <Button variant="contained" color="primary" startIcon={<GoogleIcon />} onClick={loginGoogle} sx={{ mt: 3, mb: 2 }} > Ingresar con Google </Button>
                <form onSubmit={handleSubmit(loginForm)} noValidate>
                    <TextField variant="outlined" margin="normal" fullWidth id="email" label="Correo Electrónico" name="email" autoComplete="email" autoFocus {...register('email', { required: 'Campo Obligatorio' })} error={!!errors.email} helperText={errors.email ? errors.email.message : ''} />
                    <TextField variant="outlined" margin="normal" fullWidth name="password" label="Contraseña" type="password" id="password" autoComplete="current-password" {...register('password', { required: 'Campo Obligatorio' })} error={!!errors.password} helperText={errors.password ? errors.password.message : ''} />
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }} > Iniciar Sesión </Button>
                </form>
                <Typography variant="body2"> Si no tienes cuenta <Link to="/registrar">Regístrate Aquí!</Link>
                </Typography>
            </Box>
        </Container>
    )
}

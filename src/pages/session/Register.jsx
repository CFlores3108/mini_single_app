import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth_user } from '../../firebase/appConfig'
import { useNavigate } from 'react-router-dom'

//creando esquema para validar correo y password
const schema = yup.object().shape({
    //asignando las reglas
    email: yup.string().required("El correo es obligatorio").email("Correo Invalido, ej: usuario@dominio.com"),
    password: yup.string().required("Campo Obligatorio").min(8, "La contraseña debe contener al menos 8 caracteres"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Las contraseñas no son iguales")
})

export default function Register() {
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    })

    //constante para la navegacion
    const navigate = useNavigate();

    //creando un usuario para firebase
    const registerForm = (data) => {
        createUserWithEmailAndPassword(auth_user, data.email, data.password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            //redirigirlo a la pagina principal
            navigate('/');
        }).catch((error) => {
            console.log("Error al registrar el usuario", error);
        })
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Registrar Usuario</h1>
            <form onSubmit={handleSubmit(registerForm)} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input 
                        type="email" 
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                        placeholder="Ingrese su correo" 
                        {...register('email')} 
                    />
                    <div className="invalid-feedback">
                        {errors.email && errors.email.message}
                    </div>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input 
                        type="password" 
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                        placeholder="Ingrese su contraseña" 
                        {...register('password')} 
                    />
                    <div className="invalid-feedback">
                        {errors.password && errors.password.message}
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                    <input 
                        type="password" 
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} 
                        placeholder="Confirme su contraseña" 
                        {...register('confirmPassword')} 
                    />
                    <div className="invalid-feedback">
                        {errors.confirmPassword && errors.confirmPassword.message}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary w-100">Registrarse</button>
            </form>
        </div>
    )
}

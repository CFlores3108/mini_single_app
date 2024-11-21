import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { auth_user } from '../firebase/appConfig';
import Login from './session/Login';
import { Link } from 'react-router-dom'

export default function Home() {
    // estado para validar si el usuario esta autenticado
    const [user, setUser] = useState(null);

    //accediendo a la informacion del usuario en localstorage
    const userStorage = JSON.parse(localStorage.getItem("user_firebase"))

    //verificamos si el usuario esta en firebase
    onAuthStateChanged(auth_user, (userFirebase) => {
        if (userFirebase) {
            console.log(userFirebase);
            setUser(userFirebase)
        } else {
            setUser(null)
        }
    });

    //metodo para cerrar sesion
    const logout = () => {
        signOut(auth_user).then(() => {
            alert("La sesion se ha cerrado");
            localStorage.removeItem("user_firebase")
        }).catch((error) => {
            console.error("Error al cerrar sesion", error)
        })
    }

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
                    <div className="container-fluid">
                        <Link className="navbar-brand fw-bold" to="/">OwnYourProduct</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/productos">Productos</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/registro">Registro</Link>
                                </li>
                                {userStorage && (
                                    <li className="nav-item">
                                        <button className="btn btn-danger" onClick={logout}>Cerrar Sesión</button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="container mt-5 pt-5"> {/* Added pt-5 to create space for the fixed navbar */}
                <div className="text-center">
                    {userStorage ? (
                        <>
                            <h1 className="display-4">¡Bienvenido a OwnYourProduct!</h1>
                            <p className="lead">Has iniciado sesión con éxito.</p>
                        </>
                    ) : (
                        <Login />
                    )}
                </div>
            </div>
        </>
    )
}

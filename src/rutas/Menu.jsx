import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
//import Home from '../components/Home'
import Home from '../pages/Home'
import ListProducts from '../components/ListProducts'
import RegisterProduct from '../components/RegisterProduct'
import EditForm from '../components/EditForm'
import Login from '../pages/session/Login'
import Register from '../pages/session/Register'

export default function Menu() {
    /**
     * BrowserRouter => Es el contenedor principal para la navegacion para que pueda trabajar con las rutas
     * 
     * Routes => contenedor que envuelves las rutas
     */
    return (
        <BrowserRouter>
            

            <Routes>
                {/**
                 * asignamos el nombre de la ruta y su componente
                 */}
                <Route path='/' element={<Home />}/> 
                <Route path='/registrar' element={<Register />}/>
                <Route path='/productos' element={<ListProducts />}/>
                <Route path='/registro' element={<RegisterProduct />}/>
                <Route path='/prueba' element={<RegisterProduct />}/>
                {/** creando una ruta con parametro */}
                <Route path='/editar/:id' element={<EditForm />} />
            </Routes>
        </BrowserRouter>
        
    )
}

import { addDoc, collection } from 'firebase/firestore';
import React from 'react'
import { useForm } from 'react-hook-form'
import { db } from '../firebase/appConfig'
import { useNavigate } from 'react-router-dom'
import '../assets/RegisterProduct.css'

export default function RegisterProduct() {
    const { register, handleSubmit, watch, formState: {errors} } = useForm()
    /**
     * register = hace referencia a lo que capturo en la entrada de dato
     * watch = permite observar alguna entrada de dato (valor)
     * handleSubmit = es la accion de lo que voy hacer con la informacion
     */

    //creando una constante para redirigir a una ruta
    const navigate = useNavigate()

    //metodo para guardar un producto
    const saveProduct = async (data) => {
        console.log("Se ha guardado");
        //console.log(data); //{ name: cebolla, description: cebollas moradas }
        
        //conectarnos a la bd y guardamos un documento
        try{
            await addDoc(collection(db, "products"), {
                name: data.name, //cebolla
                description: data.description //cebollas moradas
            })
        }catch(error){
            console.error("Error al registrar el producto", error)
        }
        //redireccionamos a lista de productos
        navigate("/productos")
    }
    
    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h2 className="text-center mb-4">Registro de Productos</h2>
                    <form onSubmit={handleSubmit(saveProduct)}>
                        <div className="mb-3">
                            <label htmlFor="productName" className="form-label">Ingresar Producto</label>
                            <input 
                                type="text" 
                                id="productName"
                                className="form-control" 
                                {...register('name')} 
                                placeholder="Ingrese el nombre del producto"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="productDescription" className="form-label">Descripción</label>
                            <textarea 
                                id="productDescription"
                                className="form-control" 
                                {...register('description')} 
                                placeholder="Ingrese una descripción del producto"
                                rows="3"
                            />
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-success btn-lg">Guardar Producto</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/appConfig'
import { useForm } from 'react-hook-form'

export default function EditForm() {
    const { register, handleSubmit, setValue, formState: {errors} } = useForm()

    //useParams captura los parametros que mandamos en las rutas
    const { id } = useParams();

    const navigate = useNavigate()

    //montando el producto seleccionado
    useEffect(() => {
        
        const getProductById = async () => {
            const productDoc = await getDoc(doc(db, "products", id));
            console.log(productDoc);

            //validamos si el documento existe
            if(productDoc.exists()){
                const productData = productDoc.data()
                console.log(productData);
                
                //mandar la informacion del producto al formulario
                setValue('name', productData.name)
                setValue('description', productData.description)
            }else{
                console.log("No existe el producto");
            }
        }

        getProductById()
    }, [])
    
    const editProduct = async (data) => {
        try{
            //actualizamos el producto, seleccionamos el documento por su id
            updateDoc(doc(db, "products", id), {
                name: data.name,
                description: data.description
            });
            //redireccionamos a la lista de productos
            navigate("/productos")
        }catch(error){
            console.error('Error al actualizar el producto', error)
        }
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h2 className="text-center mb-4">Editar Producto</h2>
                    <form onSubmit={handleSubmit(editProduct)}>
                        <div className="mb-3">
                            <label htmlFor="productName" className="form-label">Nombre del Producto</label>
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
                            <button type="submit" className="btn btn-primary btn-lg">Actualizar Producto</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/appConfig'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../assets/ListProducts.css'

export default function ListProducts() {
    //declaramos un estado para la lista de productos
    const [products, setProducts] = useState([])

    //montando la informacion de los productos que hay en firebase
    useEffect(() => {
        //Funcion que nos permite visualizar la info de la bd en tiempo real
        onSnapshot(
            //obtenemos la conexion de la base de datos y el nombre de la coleccion
            collection(db, "products"),
            (snapshot) => {
                //objeto de firebase
                //console.log(snapshot);
                //testeando el primer documento de la coleccion
                console.log(snapshot.docs[0].data());
                
                /** mapeando / iterando los documentos de la coleccion */
                const array_products = snapshot.docs.map((doc) => {
                    //copiamos la data de cada documento de la coleccion productos y la mandamos al array_products
                    return {...doc.data(), id: doc.id}
                })
                //testear 
                console.log(array_products);
                
                //actualizamos el estado con el arreglo de productos
                setProducts(array_products)
            }
        )
    }, [])

    //funcion para eliminar un producto
    const deleteProduct = (id) => {
        console.log(id);
        try{
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then((result) => {
                if (result.isConfirmed) {
                    //eliminar el documento
                    deleteDoc(doc(db, "products", id));
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            });
        }catch(error){
            console.error("Error al eliminar un producto",error)
        }
        
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Lista de Productos</h2>
            <div className="row">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="col-md-4 mb-4">
                            <div className="card h-100 shadow-sm card-custom">
                                <div className="card-body d-flex flex-column">
                                    <h3 className="card-title">{product.name}</h3>
                                    <p className="card-text flex-grow-1">{product.description}</p>
                                    <div className="d-flex justify-content-between mt-3">
                                        <Link to={`/editar/${product.id}`} className="btn btn-warning">Editar</Link>
                                        <button 
                                            onClick={() => deleteProduct(product.id)} 
                                            className="btn btn-danger">
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <p className="text-center">No hay productos por el momento</p>
                    </div>
                )}
            </div>
        </div>
    )
}

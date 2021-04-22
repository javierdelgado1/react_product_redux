import React, { Fragment, useEffect } from "react";
//redux

import {useSelector, useDispatch} from "react-redux";
import {obtenerProductosAction} from "../actions/productosActions"
import Producto from "./Producto"

import Swal from 'sweetalert2'
const Productos = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const cargarProductos =()=> dispatch(obtenerProductosAction());
    cargarProductos()
  }, []);

  const productos =  useSelector(state=> state.productos.productos);
  console.info(productos);
  const error = useSelector(state=> state.productos.error)
  const cargando = useSelector(state => state.productos.loading)
  return (
    <Fragment>
      <h2 className="text-center my-5">Listado de prodyctos</h2>
    {error? <p className="font-weight-bold alert alert-danger text-center">Hubo un error</p> : null}
    {cargando ? <p className="text-center">Cargando ...</p>:null}
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
        {productos.length === 0? 'No hay productos' : (
          productos.map(producto =>(
            <Producto key={producto.id} producto={producto}></Producto>
          ))
        )}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Productos;

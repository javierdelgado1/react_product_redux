import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTO_EXITO,
  DESCARGA_PRODUCTO_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINAR_EXITO,
  PRODUCTO_ELIMINAR_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR,
  COMENZAR_EDICION_PRODUCTO
} from "../types";


import clienteAxios from "../config/axios"
import Swal from 'sweetalert2'
//crear nuevos productos

export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());
    try {
        //insertar en la API

      await clienteAxios.post('/productos', producto);
      dispatch(agregarProductoExito(producto));

      Swal.fire(
          'Correcto',
          'El producto se agrego correctamente',
          'success'
      )
    } catch (error) {
      console.error(error);
      dispatch(agregarProductoError(true));
      Swal.fire({
          icon: 'error',
          title: 'Hubo un error',
          text: 'Hubo un error, intenta de nuevo'
      }
    )
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true
});

const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});


//FUNCTION que descarga los productos de la bdd

export function obtenerProductosAction () {
    return async(dispatch) =>{
        dispatch(descargarProductos())

        try {
          const respuesta = await clienteAxios.get('/productos');
          dispatch(descargarProductosExitosa(respuesta.data))
        } catch (error) {
          dispatch(descargaProductosError())
          
        }
    }
}

const descargarProductos = () =>({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload:true
})

const descargarProductosExitosa = (productos) => ({
  type:DESCARGA_PRODUCTO_EXITO,
  payload: productos
})

const descargaProductosError = () =>({
  type:DESCARGA_PRODUCTO_ERROR,
  payload:true
})


export function borrarProductoAction(id){
  return async(dispatch) => {
    dispatch(obtenerProductoEliminar(id));

    try {
      const respuesta = await clienteAxios.delete('/productos/'+id);
      console.info(respuesta);
      dispatch(eliminarProductoExito())
    } catch (error) {
      console.error(error);
      dispatch(eliminarProductoError());
    }
  }
}

const obtenerProductoEliminar = (id) => ({
  type:OBTENER_PRODUCTO_ELIMINAR,
  payload:id
})

const eliminarProductoExito = ()=>({
  type:PRODUCTO_ELIMINAR_EXITO
})

const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINAR_ERROR
})

//Colocar producto en edicionar producto
export function ObtenerProductoEditar(producto){
  return (dispatch) =>{
    dispatch(obtenerProductoAction(producto))
  }
}

const obtenerProductoAction = (producto) => ({
  type:OBTENER_PRODUCTO_EDITAR,
  payload : producto
})

export function editarProductoAction(producto){
  return async (dispatch) =>{
    dispatch(editarProducto(producto))
    try {
      await clienteAxios.put(`/productos/${producto.id}`, producto);
      dispatch(editarProductoExito(producto));
    } catch (error) {
      
    }
  }
}

const editarProducto=(producto)=>({
  type: COMENZAR_EDICION_PRODUCTO,
  payload: producto
})

const editarProductoExito = (producto) => ({
  type:PRODUCTO_EDITADO_EXITO,
  payload:producto
})
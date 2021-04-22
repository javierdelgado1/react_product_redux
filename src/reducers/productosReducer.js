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
  COMENZAR_EDICION_PRODUCTO,
} from "../types";

const initialState = {
  productos: [],
  loading: false,
  error: null,
  productoEliminar: null,
  productoeditar: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case COMENZAR_DESCARGA_PRODUCTOS:
    case AGREGAR_PRODUCTO:
      return {
        ...state,
        loading: action.payload,
      };
    case AGREGAR_PRODUCTO_EXITO:
      return {
        ...state,
        loading: false,
        productos: [...state.productos, action.payload],
        error: false,
      };
    case PRODUCTO_ELIMINAR_ERROR:
    case AGREGAR_PRODUCTO_ERROR:
    case PRODUCTO_EDITADO_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case DESCARGA_PRODUCTO_EXITO:
      return {
        ...state,
        productos: action.payload,
        error: false,
        loading: false,
      };
    case DESCARGA_PRODUCTO_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case OBTENER_PRODUCTO_ELIMINAR:
      return {
        ...state,
        productoEliminar: action.payload,
      };
    case PRODUCTO_ELIMINAR_EXITO:
      return {
        ...state,
        productos: state.productos.filter(
          (producto) => producto.id != state.productoEliminar
        ),
        productoEliminar: null,
      };
    case OBTENER_PRODUCTO_EDITAR:
      return {
        ...state,
        productoeditar: action.payload,
      };

    case PRODUCTO_EDITADO_EXITO:
      return {
        ...state,
        productoeditar: null,
        productos: state.productos.map(producto =>
          producto.id === action.payload.id?  producto =action.payload : producto 
        )
      };
    default:
      return state;
  }
}

import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { borrarProductoAction, ObtenerProductoEditar } from "../actions/productosActions";

const Producto = ({ producto }) => {
  const { id, nombre, precio } = producto;
  const history = useHistory();
  const dispatch = useDispatch();

  //confirmar si desea eliminarlo

  const confirmarEliminarProducto = (e, id) => {
    dispatch(borrarProductoAction(id));
  };
  const redireccionarEdicion = (producto) => {
    dispatch(ObtenerProductoEditar(producto))
    history.push(`/productos/editar/${producto.id}`);
  };
  return (
    <tr>
      <td>{nombre}</td>
      <td>
        <span className="font-weight-bold">{precio}</span>
      </td>
      <td className="acciones">
        <button
          type="button"
          onClick={() => redireccionarEdicion(producto)}
          className="btn btn-primary mr-2"
        >
        Editar
        
        </button>
      
        <button
          onClick={(e) => confirmarEliminarProducto(e, id)}
          type="button"
          className="btn btn-danger"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Producto;

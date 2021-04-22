import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {editarProductoAction} from '../actions/productosActions'
const EditarProducto = () => {
  const [producto, guardarProducto] = useState(
    {
      nombre: "",
      precio : 0
    })


  //producto a editar
  const productoEditar = useSelector(state=> state.productos);
  const history = useHistory()
  const dispatch = useDispatch();
  const {nombre, precio} = producto;
  const onChangeFormulario = e=>{
    guardarProducto({
      ...producto,
      [e.target.name] : e.target.value,
    })
  }
 useEffect(() => {
  guardarProducto({
      nombre:  productoEditar.productoeditar.nombre,
      precio: productoEditar.productoeditar.precio,
      id: productoEditar.productoeditar.id
    })
 }, []);
  const onSubmit = e=>{
    e.preventDefault();
    dispatch(editarProductoAction(producto));
    history.push('/')
  }
    return (
        <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4 font-weight-bold">
                {" "}
                Editar producto{" "}
              </h2>
              <form className="form-group" onSubmit={ e=> onSubmit(e)}>
                <div className="form-group">
                  <label>Nombre Producto</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={nombre}
                    onChange={e=>onChangeFormulario(e)}
                  ></input>
                </div>
                <div className="form-group">
                  <label>Precio Producto</label>
                  <input
                    type="number"
                    className="form-control"
                    name="precio"
                    value={precio}
                    onChange={e=>onChangeFormulario(e)}

                  ></input>
                </div>
  
                <button
                  type="submit"
                  className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                >
                  {" "}
                  Guardar Cambios
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}

export default EditarProducto;

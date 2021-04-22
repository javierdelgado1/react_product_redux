import React, {useState} from "react";
//actions de reedux
import {useDispatch, useSelector} from "react-redux";
import {crearNuevoProductoAction} from "../actions/productosActions";
import {mostrarAlerta, ocultarAlertaAction} from "../actions/alertaAction"
const NuevoProducto = ({history}) => {
  //state del componente
  const [nombre, guardarNombre] = useState("");
  const [precio, guardarPrecio] = useState(0)

  //utilizar use dispatch y te crea una funciona
  const dispatch = useDispatch();

  const agregarProducto = (producto) => dispatch(crearNuevoProductoAction(producto));

  //acceder al state del store

  const cargando = useSelector(state=> state.productos.loading);
  const error = useSelector(state=> state.productos.error);
  const alerta = useSelector(state=> state.alerta.alerta)

  console.info(cargando, alerta)

  const submitNuevoProducto = e =>{
    e.preventDefault();
    if(nombre.trim() ==='' || precio <= 0){
      const alerta = {
        msg:'Ambos campos son obligatorios',
        classes: 'alert alert-danger text-center text-uppercase p3'
      }
      dispatch(mostrarAlerta(alerta));
      return ;
    }
    dispatch(ocultarAlertaAction)
    agregarProducto({
      nombre,
      precio
    })

    guardarNombre('')
    guardarPrecio(0)
    history.push('/')

  }
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              {" "}
              Agregar nuevo producto{" "}
            </h2>
            {alerta? <p className={alerta.classes}> {alerta.msg}</p> : null}
            <form className="form-group" onSubmit={e=>submitNuevoProducto(e)}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={nombre}
                  onChange={ e=>guardarNombre(e.target.value)}
                ></input>
              </div>
              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  name="precio"
                  value={precio}
                  onChange={ e=>guardarPrecio(Number(e.target.value))}
                ></input>
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                {" "}
                Agregar
              </button>
            </form>
            {cargando? <p>Cargando ...</p> : null}
            {error? <p className="alert alert-danger p2 mt-4 text-centerg" >Hubo un error</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;

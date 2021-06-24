import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';



const Formulario = ({crearCita}) => {

  //creando state
  const [cita, actualizarCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
  });

  const [error, actualizarError] = useState(false);

  //funcion activada al escribir en un input
  const actualizarState = e =>{
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value
    })
  }

  //extraer valores ingresados
  const {mascota, propietario, fecha, hora, sintomas} = cita;

  //Agregando cita
  const submitCita = e =>{
    e.preventDefault();

    //Validar datos
    if (mascota.trim() === '' ||
        propietario.trim() === '' ||
        fecha.trim() === '' ||
        hora.trim() === '' ||
        sintomas.trim() === ''
        ){
      actualizarError(true);
      return;
    }

    //eliminiar mensaje de error
    actualizarError(false);

    //Asignar ID
    cita.id = uuidv4();

    //Crear cita
    crearCita(cita);

    //Reset form
     actualizarCita({
       mascota: '',
       propietario: '',
       fecha: '',
       hora: '',
       sintomas: ''
     })
  }

  return(
    <Fragment>
      <h2>Crear Cita</h2>
    {error ? <p className='alerta-error'>Todos los campos son obligatorios</p>
    :null}

      <form
          onSubmit={submitCita}
        >
        <label className='my-2'>Nombre de Mascota</label>
        <input
          type='text'
          name='mascota'
          className='form-control'
          placeholder='Nombre de Mascota'
          onChange={actualizarState}
          value={mascota}
        />
        <label className='my-2'>Dueño de la Mascota</label>
        <input
          type='text'
          name='propietario'
          className='form-control'
          placeholder='Nombre del Dueño'
          onChange={actualizarState}
          value={propietario}
        />
        <label className='my-2'>Fecha de Ingreso</label>
        <input
          type='date'
          name='fecha'
          className='form-control'
          onChange={actualizarState}
          value={fecha}
        />
        <label className='my-2'>Hora de Ingreso</label>
        <input
          type='time'
          name='hora'
          className='form-control'
          onChange={actualizarState}
          value={hora}
        />
        <label className='my-2'>Sintomas</label>
        <textarea
          className='form-control'
          name='sintomas'
          onChange={actualizarState}
          value={sintomas}
        ></textarea>
        <button
          type='sumit'
          className='btn btn-lg btn-dark my-4'
        >Agregar Cita</button>
      </form>
    </Fragment>
  )
}

Formulario.propTypes ={
  crearCita: PropTypes.func.isRequired
}

export default Formulario;

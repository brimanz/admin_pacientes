import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header'
import Formulario from './components/Formulario'
import Cita from './components/Cita'


function App() {

  //citas en localstorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }

  //citas principales
  const [citas, guardarCitas] = useState(citasIniciales);

  //useEffect para ciertas operaciones
  useEffect(()=>{
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    }else{
      localStorage.setItem('citas', JSON.stringify([]))
    }
  },[citas]);

  //funcion para citas actuales y nuevas
  const crearCita = cita =>{
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  //funcion para eliminar citas
  const eliminarCita = id =>{
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas)
  }

  //mostrando mensaje
  const titulo = citas.length === 0 ? 'Agrega una Cita' : 'Lista de Citas'


  return (
    <Fragment>
      <Header/>
      <div className='container'>
        <div className='row'>
          <div className='col-6'>
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className='col-6'>
            <h1>{titulo}</h1>
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;

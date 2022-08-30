import { useEffect, useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import { db } from './utils/firebase';
import { theme } from './utils/theme';
import { SideBar, PersonalCard } from "./components"
import "./styles.css"

const App = () => {
  const [ activeIDSeccion, setActiveIDSeccion ] = useState();
  const [ activePersonalList, setActivePersonalList ] = useState();
  const [ secciones, setSecciones ] = useState([]);
  const [ paisList, setPaisList ] = useState([]);
  const [ cargoList, setCargoList ] = useState([]);

  const getAllCargos = () => {
    db.collection('cargo').onSnapshot((snapshot) => {
      const cargo = [];
      snapshot.forEach((doc) => {
        cargo.push({ id: doc.id, ...doc.data() });
      });
      setCargoList(cargo);
    });
  };

  const getAllSeccions = () => {
    db.collection('seccion').onSnapshot((snapshot) => {
      const seccions = [];
      snapshot.forEach((doc) => {
        seccions.push({ id: doc.id, ...doc.data() });
      });
      setSecciones(seccions);
    });
  };

  const getAllPaises = () => {
    db.collection('nacionalidad').onSnapshot((snapshot) => {
      const paises = [];
      snapshot.forEach((doc) => {
        paises.push({ id: doc.id, ...doc.data() });
      });
      setPaisList(paises);
    });
  };

  const getNacionalidadNombre = (data) => {
    const nacionalidadNombre = paisList?.find( pais => data.nacionalidad === pais.id); 
    if(nacionalidadNombre){
      return nacionalidadNombre.pais          
    } else {
      return undefined;
    }
  }

  const getCargoNombre = (data) => {
    const cargoNombre = cargoList?.find( cargo => data.cargo === cargo.id); 
    if(cargoNombre){
      return cargoNombre.nombre          
    } else {
      return undefined;
    }
  }

  useEffect(()=> {
    if(activeIDSeccion){
      db.collection('personal').where("seccion", "==", activeIDSeccion).get().then((querySnapshot)=> {
        const personalList = []
        querySnapshot.forEach((doc) => {
          personalList.push({ id: doc.id, ...doc.data() });
        })
        setActivePersonalList(personalList);
      })
    }
  }, [activeIDSeccion])

  useEffect(() => {
    getAllSeccions();
    getAllPaises();
    getAllCargos();
  }, []);

  return (
  <ThemeProvider theme={theme}>
    <div className="main">
      <SideBar secciones={secciones} setActiveIDSeccion={setActiveIDSeccion}/>
      <div className="dashboard">
        {activePersonalList && activePersonalList.length ? activePersonalList.map((data, i)=> {    
          data.nacionalidad = getNacionalidadNombre(data);
          data.cargo = getCargoNombre(data);
          return( <PersonalCard key={i} data={data} /> )
        }) :
        <div>No Data!</div>
      }
      </div>
    </div>
  </ThemeProvider>
  );
}

export default App;

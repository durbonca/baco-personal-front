import { useEffect, useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import { db } from './utils/firebase';
import { theme } from './utils/theme';
import { SideBar } from "./components"
import "./styles.css"

const App = () => {
  const [ secciones, setSecciones ] = useState([])
  const [ activeIDSeccion, setActiveIDSeccion ] = useState()
  const [ activePersonalList, setActivePersonalList ] = useState()

  const getAllSeccions = () => {
    db.collection('seccion').onSnapshot((snapshot) => {
      const seccions = [];
      snapshot.forEach((doc) => {
        seccions.push({ id: doc.id, ...doc.data() });
      });
      setSecciones(seccions);
    });
  };

  const getPersonalFilteredBySeccion = () => {
    db.collection('personal').where("seccion", "==", activeIDSeccion).get().then((querySnapshot)=> {
      const personalList = []
      querySnapshot.forEach((doc) => {
        personalList.push({ id: doc.id, ...doc.data() });
      })
      setActivePersonalList(personalList);
    })
  }

  useEffect(()=> {
    if(activeIDSeccion){
      getPersonalFilteredBySeccion()
    }
  }, [activeIDSeccion])

  useEffect(() => {
    getAllSeccions();
  }, []);

  return (
  <ThemeProvider theme={theme}>
    <div className="main">
      <SideBar secciones={secciones} setActiveIDSeccion={setActiveIDSeccion}/>
      <div>
        {activePersonalList && activePersonalList.length ? activePersonalList.map((personal, i)=>{
          return( <div key={i}>{personal.nombre}</div> )
        }) :
        <div> Parece que hector esta flojito y no ha metido personas en esta sección </div>
      }
      </div>
    </div>
  </ThemeProvider>
  );
}

export default App;

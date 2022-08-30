import { useEffect, useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import { db } from './utils/firebase';
import { theme } from './utils/theme';
import { SideBar, PersonalCard } from "./components"
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
  }, []);

  return (
  <ThemeProvider theme={theme}>
    <div className="main">
      <SideBar secciones={secciones} setActiveIDSeccion={setActiveIDSeccion}/>
      <div className="dashboard">
        {activePersonalList && activePersonalList.length ? activePersonalList.map((data, i)=>{
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

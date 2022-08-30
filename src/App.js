import { useEffect, useState } from "react";
import { SideBar } from "./components"
import "./styles.css"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { db } from './utils/firebase';

const theme = createTheme({
  palette: {
    white: {
      main: "#fafafa",
    },
  },
});

const App = () => {
  const [ secciones, setSecciones ] = useState([])

  const getAllSeccions = () => {
    db.collection('seccion').onSnapshot((snapshot) => {
      const seccions = [];
      snapshot.forEach((doc) => {
        seccions.push({ id: doc.id, ...doc.data() });
      });
      setSecciones(seccions);
    });
  };

  useEffect(() => {
    getAllSeccions();
  }, []);

  return (
  <ThemeProvider theme={theme}>
    <div className="main">
      <SideBar secciones={secciones}/>
      <div>
        Main
      </div>
    </div>
  </ThemeProvider>
  );
}

export default App;

import { Container } from "./styles"
import { Button } from "@mui/material"

export const SideBar = ({ secciones, setActiveIDSeccion }) => {
  return (
    <Container>
      {
        secciones.map((seccion)=> {
          return ( 
            <Button 
              onClick={() => setActiveIDSeccion(seccion.id)}
              variant="text" color="white" fullWidth>{seccion.nombre}
            </Button>
          )
        })
      }
    </Container>
  )
}
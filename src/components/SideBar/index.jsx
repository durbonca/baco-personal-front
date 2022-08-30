import { Container } from "./styles"
import { Button } from "@mui/material"

export const SideBar = ({ secciones }) => {
  return (
    <Container>
      {
        secciones.map((seccion)=> {
          return ( 
            <Button variant="text" color="white" fullWidth>{seccion.nombre}</Button>
          )
        })
      }
    </Container>
  )
}
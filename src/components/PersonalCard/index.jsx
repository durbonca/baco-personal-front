import { Card, CardHeader, Alert, CardMedia, Typography } from '@mui/material';
import { orderDateCL } from '../../functions';

export const PersonalCard = ({ data }) => {
  const { nombre, file, nacionalidad, movil, desvinculado, fecha_nacimiento, fecha_ingreso, fecha_egreso, cargo } = data;
  return (
    <Card sx={{ maxWidth: 345 }} >
        <CardHeader
        title={nombre}
        subheader={cargo}
      />
      <CardMedia
        component="img"
        image={file.src}
        alt={file.title}
      />
     {desvinculado && 
     <Alert severity="error">
        DESVINCULADE: {orderDateCL(fecha_egreso)}
     </Alert>
     }
     <Typography style={{padding: '1em'}} variant="body1" color="text.secondary">
        <div>Nacionalidad: {nacionalidad}</div>
        {fecha_nacimiento && <div>fecha de nacimiento: {orderDateCL(fecha_nacimiento)}</div>}
        <div>Celular: {movil}</div>
        {fecha_ingreso && <div>fecha de ingreso: {orderDateCL(fecha_ingreso)}</div> }
     </Typography>
    </Card>
  )
}
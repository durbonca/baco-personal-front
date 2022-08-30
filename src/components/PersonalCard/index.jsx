import { Card, CardHeader, Alert, CardMedia } from '@mui/material';

export const PersonalCard = ({ data }) => {
    console.log('data', data)
  const { nombre, file, desvinculado } = data;
  return (
    <Card  sx={{ maxWidth: 345 }} >
        <CardHeader
        title={nombre}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        image={file.src}
        alt={file.title}
      />
     {desvinculado && 
     <Alert variant="outlined" severity="error">
        DESVINCULADO
     </Alert>
     }
    </Card>
  )
}
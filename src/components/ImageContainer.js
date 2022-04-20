import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../styles.scss';

export function ImageContainer() {
const location = useLocation();
  
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardMedia
        component="img"
        height="140"
        image={location.state.url}
        alt={location.state.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {location.state.url}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {location.state.title}
        </Typography>
      </CardContent>
    </Card>
  );
}

ImageContainer.propTypes = {
  item: PropTypes.object,
};

export default ImageContainer;
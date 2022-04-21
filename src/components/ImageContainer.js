import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useWidth } from '../customHooks/useWidth';
import '../styles.scss';

export function ImageContainer() {
const location = useLocation();
const { width: windowWidth } = useWidth();
  
  return (
    <div className="image-details-card">
      <Card sx={{ width: windowWidth, height: 450 }}>
        <CardMedia
          component="img"
          height="300"
          image={location.state.url}
          alt={location.state.title}
        />
        <CardContent sx={{ width: windowWidth, height: 450 }}>
          <Typography gutterBottom variant="h5" component="div">
            {location.state.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {location.state.url}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

ImageContainer.propTypes = {
  item: PropTypes.object,
};

export default ImageContainer;
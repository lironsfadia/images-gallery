import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useWidth } from '../customHooks/useWidth';
import '../styles.scss';

const MAX_IMAGE_RESOLUTION = 1200;

export function ImageContainer() {
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const location = useLocation();
  const { width: windowWidth } = useWidth();

  useEffect(() => {
    var image = location.state.url;
    var imageArr = image.split('/');
    imageArr[3] = MAX_IMAGE_RESOLUTION;
    image = imageArr.join('/');
    setLargeImageUrl(image);
  }, [])
  
  return (
    <div className="image-details-card">
      <Card sx={{ width: windowWidth, height: 450 }}>
        <CardMedia
          component="img"
          height="300"
          image={largeImageUrl}
          alt={location.state.title}
        />
        <CardContent sx={{ width: windowWidth, height: 450 }}>
          <Typography gutterBottom variant="h5" component="div">
            {location.state.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The original URL is {location.state.url}
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
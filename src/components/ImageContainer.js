import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWidth } from '../customHooks/useWidth';
import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import '../styles.scss';

const MAX_IMAGE_RESOLUTION = 1200;
const CARD_HEIGHT = 450;
const IMAGE_HEIGHT = "300";

export function ImageContainer() {
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const { width: windowWidth } = useWidth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    var image = location.state.url;
    var imageArr = image.split('/');
    imageArr[3] = MAX_IMAGE_RESOLUTION;
    image = imageArr.join('/');
    setLargeImageUrl(image);
  }, [location])
  
  return (
    <div className="image-details-card">
      <Card sx={{ width: windowWidth, height: CARD_HEIGHT }}>
        <CardMedia
          component="img"
          height={IMAGE_HEIGHT}
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
          <CardActions>
            <Button onClick={() => navigate('/')} size="large">Back</Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
}

ImageContainer.propTypes = {
  item: PropTypes.object,
};

export default ImageContainer;
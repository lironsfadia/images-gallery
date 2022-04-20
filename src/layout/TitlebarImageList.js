import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useWidth } from '../customHooks/useWidth';
import { ImageContainer } from '../components/ImageContainer';

const avilableSizes = [150, 300, 450, 600];

function getTitleBarClassName(item) {
  console.log(item.cols + ' ' + item.rows);
  var className = 'title-bar-';
  switch(item.rows) {
    case 1:
      return className += 's';
    case 2:
      return className += 'md';
    default:
      return className += 's'; 
  }
}

function TitlebarImageList({ imagesData }) {
  const [selectedImageItem, setSelectedImageItem] = useState(null);
  const [showDot, setShowDot] = useState(false);
  const [currentImagesData, setCurrentImagesData] = useState(null);
  const { width: windowWidth } = useWidth();
  let navigate = useNavigate();

  const routeToImageDetails = (item) =>{ 
    let path = `/details`; 
    navigate(path, {state:{id: 1, url: item.url, title: item.title}});
    setSelectedImageItem(item);
  }

  useEffect(() => {
    const data = imagesData.slice(0, 100);
    data.map((element, index) => {
      const arr = element.url.split('/');
      arr[3] = avilableSizes[index%4]
      element.url = arr.join('/');
      element.cols = Math.round(1 + Math.random());
      element.rows = Math.round(1 + Math.random());;
    })
    setCurrentImagesData(data);

  }, [imagesData])

  useEffect(() => {
    selectedImageItem ? setShowDot(true) : setShowDot(false);
  }, [selectedImageItem])

  return (
    <>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
      <div className='selected-image-container'>
        { showDot ? <ImageContainer item={selectedImageItem} /> : null }
      </div>
      { currentImagesData ? 
      <ImageList sx={{ width: windowWidth, height: 1000 }}
                 cols={4}
                 rowHeight={150}
                 variant="quilted"
                 gap={8}>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">Aqua Gallery</ListSubheader>
        </ImageListItem>
        {currentImagesData.map((item) => (
          <ImageListItem key={item.url} cols={item.cols || 1} rows={item.rows || 1}>
            <img
              id="img-elm"
              src={`${item.url}?w=248&fit=crop&auto=format`}
              srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              onClick={() => routeToImageDetails(item)}
            />
            <div id="title-bar-elm">
              <ImageListItemBar
                className={getTitleBarClassName(item)}
                title={item.title}
                position={"top"}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.title}`}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </div>
          </ImageListItem>
        ))}
      </ImageList> : null}
    </>
  );
}

TitlebarImageList.propTypes = {
  imagesData: PropTypes.array,
  };
  
export default TitlebarImageList;
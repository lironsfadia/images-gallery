import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useWidth } from '../customHooks/useWidth';
import { Typography } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

const availableSizes = [150, 450, 600];

function getTitleBarClassName(item) {
  var className = 'title-bar-';
  switch (item.rows) {
    case 1:
      return className += 's';
    case 2:
      return className += 'md';
    default:
      return className += 's';
  }
}

function TitlebarImageList({ imagesData, galleryAmount }) {
  const [currentImagesData, setCurrentImagesData] = useState(null);
  const [imageSearchResults, setImageSearchResults] = useState(null);
  const { width: windowWidth } = useWidth();
  let navigate = useNavigate();

  const routeToImageDetails = (item) => {
    let path = `/details`;
    navigate(path, { state: { id: 1, url: item.url, title: item.title } });
  }

  useEffect(() => {
    const data = imagesData.slice(0, galleryAmount);
    data.map((element, index) => {
      const arr = element.url.split('/');
      element.cols = Math.round(1 + Math.random());
      element.rows = Math.round(1 + Math.random());
      arr[3] = element.cols === 2 && element.rows === 2 ? availableSizes[2] :
        element.cols === 2 || element.rows === 2 ? availableSizes[1] :
          availableSizes[0]
      element.url = arr.join('/');
    })
    setCurrentImagesData(data);
    setImageSearchResults(data);

  }, [imagesData])

  return (
    <>
      {currentImagesData ?
        <>
          <div className="gallery-menu" s
            style={{ width: `${windowWidth}` }}>
            <div className="headline-item">
              <Typography variant="h3" component="h4">
                Aqua Gallery
              </Typography>
            </div>
            <Stack className="search-box-item" direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={2} sx={{ width: 300 }}>
              <Autocomplete
                id="search-box"
                disableClearable
                options={currentImagesData.map((option) => option.title)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.defaultMuiPrevented = true;
                    setImageSearchResults(currentImagesData.filter(imageData => imageData.title.includes(event.target.value)));
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search input"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                  />
                )}
              /></Stack>
          </div>
          <ImageList sx={{ width: windowWidth, height: 1000 }}
            cols={4}
            rowHeight={150}
            variant="quilted"
            gap={8}>
            {imageSearchResults.map((item) => (
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
          </ImageList>
        </> : null}
    </>
  );
}

TitlebarImageList.defaultProps = {
  galleryAmount: 100
}

TitlebarImageList.propTypes = {
  imagesData: PropTypes.array,
  galleryAmount: PropTypes.number,
};

export default TitlebarImageList;
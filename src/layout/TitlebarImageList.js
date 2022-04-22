import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { ThemeProvider } from '@mui/material/styles'

import { theme } from '../styleSetup/theme';
import { useWindowSize } from '../customHooks/useWindowSize';

const AVAILABLE_SIZES = [150, 450, 600];
const MAX_SUPPORTED_MOBILE_WIDTH = 768;
const GALLERY_HEIGHT = 1000;

function TitlebarImageList({ imagesData }) {
  const [currentImagesData, setCurrentImagesData] = useState(null);
  const [imageSearchResults, setImageSearchResults] = useState(null);
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const navigate = useNavigate();
  const imageQueryParams = '?w=248&fit=crop&auto=format';
  const thumbnailQueryParams = '?w=248&fit=crop&auto=format&dpr=2 2x';

  const routeToImageDetails = (item) => {
    let path = `/details`;
    navigate(path, { state: { id: 1, url: item.url, title: item.title } });
  }

  useEffect(() => {
    var data = imagesData;
    data = data.map((element) => {
      var arr = element.url.split('/');
      element.cols = 1;
      element.rows = Math.round(1 + Math.random());
      arr[3] = element.cols === 2 && element.rows === 2 ? AVAILABLE_SIZES[2] :
        element.cols === 2 || element.rows === 2 ? AVAILABLE_SIZES[1] :
          AVAILABLE_SIZES[0];
      element.url = arr.join('/');
      return element;
    });
    setCurrentImagesData(data);
    setImageSearchResults(data);

  }, [imagesData])

  return (
    <>
      {currentImagesData ?
        <>
          <div className="gallery-menu" style={{ width: `${windowWidth}` }}>
            <div className="headline-item">
              <ThemeProvider theme={theme}>
                <Typography variant="h3">
                  Aqua Gallery
                </Typography>
              </ThemeProvider>
            </div>
            <Stack className="search-box-item"
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
              sx={windowWidth > MAX_SUPPORTED_MOBILE_WIDTH ? { width: 300 } : { width: 250 }}>
              <Autocomplete
                id="search-box"
                disableClearable
                style={{ width: `${windowWidth}px` }}
                options={currentImagesData.map((option) => option.title)}
                onKeyUp={(event) => {
                  setImageSearchResults(currentImagesData.filter(imageTitle => imageTitle.title.toLowerCase()
                    .includes(event.target.value.toLowerCase())));
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
          <ImageList sx={{ width: windowWidth, height: GALLERY_HEIGHT }}
            cols={4}
            rowHeight={150}
            variant="quilted"
            gap={8}>
            {imageSearchResults.map((item) => (
              <ImageListItem key={item.url} cols={item.cols || 1} rows={item.rows || 1}>
                <img
                  id="img-elm"
                  src={`${item.url}${imageQueryParams}`}
                  srcSet={`${item.url}${thumbnailQueryParams}`}
                  alt={item.title}
                  loading="lazy"
                  onClick={() => routeToImageDetails(item)}
                />
                <div id="title-bar-elm">
                  <ImageListItemBar
                    className={`title-bar-${item.rows === 2 ? 'md' : 's'}`}
                    title={item.title}
                    position={"top"}
                  />
                </div>
              </ImageListItem>
            ))}
          </ImageList>
        </> : null}
    </>
  );
}

TitlebarImageList.propTypes = {
  imagesData: PropTypes.array,
};

export default TitlebarImageList;
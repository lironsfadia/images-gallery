import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { ThemeProvider } from "@mui/material/styles";

import { useWindowSize } from "../customHooks/useWindowSize";
import { theme } from "../styleSetup/theme";
import "../styles.scss";

export function ImageContainer() {
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const [largeImageUrl, setLargeImageUrl] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const MAX_IMAGE_RESOLUTION = 1800;
  const MAX_IMAGE_RESOLUTION_MOBILE = 1200;
  const MAX_SUPPORTED_MOBILE_WIDTH = 768;
  const CARD_HEIGHT_SPACE =
    windowWidth > MAX_SUPPORTED_MOBILE_WIDTH ? 400 : 300;
  const IMAGE_HEIGHT_SPACE =
    windowWidth > MAX_SUPPORTED_MOBILE_WIDTH ? 200 : 100;

  useEffect(() => {
    var image = location.state.url;
    var imageArr = image.split("/");
    imageArr[3] =
      windowWidth > MAX_SUPPORTED_MOBILE_WIDTH
        ? MAX_IMAGE_RESOLUTION
        : MAX_IMAGE_RESOLUTION_MOBILE;
    image = imageArr.join("/");
    setLargeImageUrl(image);
  }, [location, windowWidth, windowHeight]);

  return (
    <div className="image-details-card">
      <Card sx={{ width: windowWidth, height: windowHeight }}>
        <CardMedia
          component="img"
          height={windowHeight ? windowHeight - CARD_HEIGHT_SPACE : 900}
          image={largeImageUrl}
          alt={location.state.title}
        />
        <CardContent
          sx={{ width: windowWidth, height: windowHeight - IMAGE_HEIGHT_SPACE }}
        >
          <ThemeProvider theme={theme}>
            <Typography gutterBottom variant="h5" component="div">
              {location.state.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              The original URL is {location.state.url}
            </Typography>
            <CardActions>
              <Button onClick={() => navigate("/")} size="large">
                Back
              </Button>
            </CardActions>
          </ThemeProvider>
        </CardContent>
      </Card>
    </div>
  );
}

ImageContainer.propTypes = {
  item: PropTypes.object,
};

export default ImageContainer;

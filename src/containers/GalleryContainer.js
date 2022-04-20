import React, { useState, useEffect } from 'react';
import DataProvider from '../api/DataProvider';
import { GalleryCalculator } from '../components/GalleryCalculator';
import TitlebarImageList from '../layout/TitlebarImageList';
import raw from '../environment.json';

function GalleryContainer() {
  const [dataUrl, setDataUrl] = useState('');

  useEffect(() => {
    setDataUrl(`${raw.environment[0].images_url}`)
  }, [])

  return (
    <>
      <DataProvider calculator={GalleryCalculator} layout={TitlebarImageList} url={dataUrl} />
    </>
  );
}

export default GalleryContainer;
import React, { useContext, useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getRequestContext } from '../contexts/Context'

export function GalleryCalculator({ layout: Layout }) {
  const data = useContext(getRequestContext);
  const [imagesData, setImagesData] = useState(null);

  const layoutProps = {
    imagesData,
  };

  const prepareDisplay = useMemo(
    () => (
      <Layout className="gallery-layout" {...layoutProps} />
    ), [imagesData])

  useEffect(() => {
    setImagesData(data ? data : JSON.parse(sessionStorage.getItem("imagesData")));
  }, [data])

  return (
    <>
      {imagesData ? prepareDisplay : null}
    </>
  );
}

GalleryCalculator.propTypes = {
  layout: PropTypes.func.isRequired,
};

export default GalleryCalculator;
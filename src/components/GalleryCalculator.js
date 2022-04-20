import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { getRequestContext } from '../contexts/Context'

export function GalleryCalculator({ layout: Layout }) {
  const imagesData = useContext(getRequestContext);

  const layoutProps = {
    imagesData,
  };

  const prepareDisplay = useMemo(
    () => (
      <Layout className="gallery-layout" {...layoutProps} />
    ), [imagesData])

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
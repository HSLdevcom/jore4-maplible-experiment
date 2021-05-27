import React, { FunctionComponent, useState } from 'react';
import MapGL from 'react-map-gl';

interface Props {
  className?: string;
}

export const Map: FunctionComponent<Props> = ({ className }) => {
  const [viewport, setViewport] = useState({
    latitude: 60.1716,
    longitude: 24.9409,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  });

  return (
    <MapGL
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...viewport}
      width="100vw"
      height="100vh"
      mapStyle="https://raw.githubusercontent.com/HSLdevcom/hsl-map-style/master/simple-style.json"
      mapboxApiAccessToken=""
      mapboxApiUrl=""
      onViewportChange={setViewport}
      className={className}
    />
  );
};

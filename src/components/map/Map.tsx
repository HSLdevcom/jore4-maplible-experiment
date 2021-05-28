import produce from 'immer';
import React, { FunctionComponent, useCallback, useState } from 'react';
import MapGL, { MapEvent, Marker } from 'react-map-gl';
import { mapLngLatToPoint, Point } from '../../utils';
import { Pin } from './Pin';

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

  const [markers, setMarkers] = useState<Point[]>([
    { latitude: 60.1716, longitude: 24.9409 },
  ]);
  const onClick = (e: MapEvent) => {
    setMarkers([...markers, mapLngLatToPoint(e.lngLat)]);
  };

  const onMarkerDragEnd = useCallback(
    (event, index) => {
      const updatedMarkers = produce(markers, (draft) => {
        draft[index] = mapLngLatToPoint(event.lngLat);
      });
      setMarkers(updatedMarkers);
    },
    [markers],
  );

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
      onClick={onClick}
      className={className}
    >
      {markers.map((item, index) => (
        <Marker
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          longitude={item.longitude}
          latitude={item.latitude}
          offsetTop={-20}
          offsetLeft={-10}
          draggable
          onDragEnd={(e) => onMarkerDragEnd(e, index)}
        >
          <Pin size={20} />
        </Marker>
      ))}
    </MapGL>
  );
};

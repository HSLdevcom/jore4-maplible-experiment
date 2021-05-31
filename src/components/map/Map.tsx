import produce from 'immer';
import React, { FunctionComponent, useCallback, useState } from 'react';
import MapGL, {
  FullscreenControl,
  GeolocateControl,
  MapEvent,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from 'react-map-gl';
import { mapLngLatToPoint, Point } from '../../utils';
import { Pin } from './Pin';

interface Props {
  className?: string;
}

interface PopupInfo extends Point {
  index: number;
}

// TODO: PopupInfo is not closed after marker is deleted
// We could close PopupInfo automatically after delete, but for some
// reason then click event leaks to the map layer and new marker is
// created right below the delete button.

// TODO: PopupInfo automatically appears after marker is moved.
// We could call `() => setPopupInfo(null)` on `onMarkerDragEnd` so that
// PopupInfo would be closed, but for some reason onClick handler from
// Pin seems is called after `onMarkerDragEnd` and it makes PopupInfo
// to be shown again...

export const Map: FunctionComponent<Props> = ({ className }) => {
  const [viewport, setViewport] = useState({
    latitude: 60.1716,
    longitude: 24.9409,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  });

  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);

  const onOpenPopup = (point: Point, index: number) => {
    setPopupInfo({ ...point, index });
  };

  const [markers, setMarkers] = useState<Point[]>([
    { latitude: 60.1716, longitude: 24.9409 },
  ]);

  const onCreateMarker = (e: MapEvent) => {
    setMarkers([...markers, mapLngLatToPoint(e.lngLat)]);
  };

  const onDeleteMarker = (index: number) => {
    const updatedMarkers = produce(markers, (draft) => {
      draft.splice(index, 1);
    });
    setMarkers(updatedMarkers);
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

  const geolocateStyle = {
    top: 0,
    left: 0,
    padding: '10px',
  };

  const fullscreenControlStyle = {
    top: 36,
    left: 0,
    padding: '10px',
  };

  const navStyle = {
    top: 72,
    left: 0,
    padding: '10px',
  };

  const scaleControlStyle = {
    bottom: 36,
    left: 0,
    padding: '10px',
  };

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
      onClick={onCreateMarker}
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
          <Pin size={20} onClick={() => onOpenPopup(item, index)} />
        </Marker>
      ))}

      {popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => setPopupInfo(null)}
        >
          <button
            type="button"
            onClick={() => {
              onDeleteMarker(popupInfo.index);
            }}
          >
            Delete
          </button>
        </Popup>
      )}
      <GeolocateControl style={geolocateStyle} />
      <FullscreenControl style={fullscreenControlStyle} />
      <NavigationControl style={navStyle} />
      <ScaleControl style={scaleControlStyle} />
    </MapGL>
  );
};

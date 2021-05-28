export interface Point {
  latitude: number;
  longitude: number;
}

export const mapLngLatToPoint = (lngLat: number[]): Point => {
  if (lngLat.length !== 2) {
    throw new Error(
      `Expected lngLat to be like [number, number] but got ${lngLat}`,
    );
  }
  return { longitude: lngLat[0], latitude: lngLat[1] };
};

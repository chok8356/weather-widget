/* eslint-disable */
interface GeolocationPosition {
  readonly coords: GeolocationCoordinates;
  readonly timestamp: number;
}

declare let GeolocationPosition: {
  prototype: GeolocationPosition;
  new(): GeolocationPosition;
}

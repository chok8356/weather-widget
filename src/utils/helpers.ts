export async function getCoords(): Promise<GeolocationPosition> {
  return await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
};

export function MakeQrUrl(locationName) {
  const random10digit = Math.floor(1000000000 + Math.random() * 9000000000);
  const inUrl = `https://qr-check-in-admin.vercel.app/start/in/${random10digit}`;
  const outUrl = `https://qr-check-in-admin.vercel.app/start/out/${random10digit}`;

  const qrUrlInDone = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${inUrl}`;
  const qrUrlOutDone = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${outUrl}`;

  const locationId = random10digit + "-" + locationName.replaceAll(" ", "");

  const returnObj = {
    qrUrlInDone,
    qrUrlOutDone,
    location: locationId,
    locationId: random10digit,
    locationName,
  };

  return returnObj;
}

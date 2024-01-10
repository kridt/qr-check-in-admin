import {
  Autocomplete,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MakeQrUrl } from "../functions/MakeQrUrl";
import { database } from "../firebase";

export default function AddLocation() {
  const [center, setCenter] = React.useState({
    lat: 55.676098,
    lng: 12.568337,
  });
  const navigate = useNavigate();
  const [marker, setMarker] = React.useState([]);
  async function handleSubmit(e) {
    e.preventDefault();
    const geocoder = new window.google.maps.Geocoder();

    const locationName = e.target.locationAddress.value;

    geocoder.geocode({ address: locationName }, (results, status) => {
      if (status === "OK") {
        console.log(results);
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();

        setCenter({
          lat,
          lng,
        });
        setMarker([
          {
            lat,
            lng,
          },
        ]);

        const qrRes = MakeQrUrl(e.target.locationName.value);

        qrRes.locationAddress = e.target.locationAddress.value;
        qrRes.locationDescription = e.target.locationDescription.value;
        qrRes.coor = { lat, lng };
        console.log(qrRes);
        setMarker([
          {
            lat,
            lng,
          },
        ]);
        setCenter({
          lat,
          lng,
        });

        setTimeout(() => {
          if (
            window.confirm(
              `Er du sikker på du vil tilføje denne lokation? \n \n ${qrRes.locationAddress}`
            )
          ) {
            console.log("ja");
            console.log(qrRes);
            database
              .collection("locations")
              .doc(qrRes.location)
              .set(qrRes)
              .then(() => {
                alert("Lokation tilføjet");
                navigate("/admin");
              })
              .catch((error) => alert("Der skete en fejl: ", error.message));
          } else {
            console.log("nej");
          }
        }, 1000);
        /* database
          .collection("locations")
          .doc(qrRes.locationId)
          .set(qrRes)
          .then(() => {
            alert("Lokation tilføjet");
          })
          .catch((error) => alert("Der skete en fejl: ", error.message)); */
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLEAPI_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <Link style={{ color: "white" }} to="/admin">
        Tilbage
      </Link>
      <h1>Add Location</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Navn på nye lokation:
          <input type="text" name="locationName" />
        </label>
        <br />
        <br />
        <div style={{ display: "flex" }}>
          <label>
            Location adresse:
            <Autocomplete>
              <input
                style={{ width: "500px" }}
                type="text"
                name="locationAddress"
              />
            </Autocomplete>
          </label>
          {/* <div>
            <label htmlFor="zipcode">Postnummer:</label>
            <input
              type="number"
              id="zipcode"
              onChange={(e) => {
                console.log(e.target.value);
                if (e.target.value.length === 4) {
                  axios.get("/postnumre.json").then((res) => {
                    console.log(parseInt(e.target.value));
                    const city = res?.data?.find(
                      (el) => parseInt(el.nr) === parseInt(e.target.value)
                    )?.navn;
                    setCity(city);
                  });
                }
              }}
              name="zipcode"
            />
          </div> */}
          {/* <div>
            <label htmlFor="city">By:</label>
            <input type="text" id="city" name="city" defaultValue={city} />
          </div> */}
        </div>

        <br />
        <br />
        <label>
          Location description:
          <input type="text" name="locationDescription" />
        </label>
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>

      <GoogleMap
        center={center}
        zoom={9}
        mapContainerStyle={{ width: "500px", height: "500px" }}
        options={{ disableDefaultUI: true }}
      >
        {marker?.map((el) => {
          return <Marker animation={2} key={el} position={el} />;
        })}
      </GoogleMap>
    </div>
  );
}

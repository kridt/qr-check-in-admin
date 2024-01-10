import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { Link } from "react-router-dom";

export default function ListOfQrCodes({ uid }) {
  const [noLocations, setNoLocations] = useState(false);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    database
      .collection("locations")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("No documents found.");
          setNoLocations(true);
        } else {
          console.log("Documents found.");
          setNoLocations(false);
          setLocations(querySnapshot.docs);
        }
      });
  }, [uid]);

  return (
    <div>
      <h1>List of codes</h1>
      {noLocations ? (
        <>
          <p>Ingen qr koder at vise.</p>
        </>
      ) : (
        <>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                textAlign: "center",
              }}
            >
              <p style={{ flex: "1" }}>Navn</p>
              <p style={{ flex: "1" }}>Adresse</p>
              <p style={{ flex: "1" }}>Beskrivelse</p>
              <p style={{ flex: "1" }}>QR kode</p>
              <div style={{ flex: "1" }}></div>
            </div>
            {locations.map((location) => {
              console.log(location.data());

              return (
                <div
                  style={{
                    backgroundColor: "gray",
                    display: "flex",
                    justifyContent: "space-between",
                    textAlign: "center",
                    margin: "1em 0",
                  }}
                  key={location.id}
                >
                  <p style={{ flex: "1" }}>{location.data().locationName}</p>
                  <a
                    href={`https://www.google.com/maps?q=${
                      location?.data()?.coor?.lat
                    },${location?.data()?.coor?.lng}`}
                    style={{ flex: "1", alignSelf: "center" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {location.data().locationAddress}
                  </a>
                  <p style={{ flex: "1" }}>
                    {location.data().locationDescription}
                  </p>
                  <Link
                    to={`/admin/print/${location?.data()?.location}`}
                    style={{ flex: "1", alignSelf: "center" }}
                  >
                    se qr koderne
                  </Link>

                  <Link
                    style={{ alignSelf: "center", flex: "1" }}
                    to={`/admin/edit-location/${location.id}`}
                  >
                    Rediger
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      )}
      <Link style={{ color: "white" }} to="/admin/add-location">
        Tilføj en qr kode
      </Link>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import { useParams } from "react-router-dom";
import { database } from "../firebase";
import axios from "axios";

export default function LandingPage() {
  const checkId = useParams().check;
  const locationId = useParams().locationId;
  const [currentLocation, setCurrentLocation] = useState({});
  const [loading, setLoading] = useState(true);
  const [allCoworkers, setAllCoworkers] = useState([]);

  useEffect(() => {
    var allLocations = [];

    database
      .collection("locations")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //console.log(doc.id, " => ", doc.data());
          allLocations.push(doc.data());
        });
      })
      .then(() => {
        const currentLocation = allLocations?.find(
          (location) => location.locationId === parseInt(locationId)
        );

        setCurrentLocation(currentLocation);
        setLoading(false);
      });

    database
      .collection("coworkers")
      .get()
      .then((querySnapshot) => {
        setAllCoworkers(querySnapshot.docs.map((doc) => doc.data()));
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [checkId, locationId]);

  function handleSubmit(e) {
    e.preventDefault();
    const number = e.target.numberInput.value;
    const findNumer = number?.match(/\d+/) || 0;

    const coworker = allCoworkers?.find(
      (e) => e?.id === parseInt(findNumer[0] || 0)
    );

    if (!coworker) {
      alert("Coworker number does not exist");
      return;
    }

    if (
      window.confirm(
        `Check ${checkId}` +
          " " +
          coworker.firstName +
          " " +
          coworker.lastName +
          " at " +
          currentLocation?.locationAddress +
          "?"
      )
    ) {
      /* console.log(
        "Checked in " +
          coworker.firstName +
          " " +
          coworker.lastName +
          " at " +
          currentLocation?.locationAddress +
          " at " +
          new Date().toLocaleString()
      ); */
      //https://qr-check-in.onrender.com
      axios
        .get("https://qr-check-in.onrender.com/api/start", {
          params: {
            checkId: checkId,
            firstName: coworker.firstName,
            lastName: coworker.lastName,
            coworkerId: coworker.id,
            locationAddress: currentLocation?.locationAddress,
            time: new Date().toLocaleString(),
            locationId: currentLocation?.locationId,
            locationName: currentLocation?.locationName,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            alert(
              "Checked in " +
                coworker.firstName +
                " " +
                coworker.lastName +
                " at " +
                currentLocation?.locationAddress
            );
          }
          if (res.status === 202) {
            alert(
              `You have already checked ${checkId} at ${currentLocation?.locationAddress}`
            );
          }
        });
    }
  }

  return (
    <div className="landing-page">
      {loading ? (
        <h2 style={{ textAlign: "center" }}>Finding location...</h2>
      ) : (
        <h2 style={{ textAlign: "center" }}>
          Check {checkId} at {currentLocation?.locationAddress}
        </h2>
      )}
      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <label htmlFor="numberInput">Enter your company number:</label>
        <input type="tel" id="numberInput" />
        <button type="submit">Check {checkId}</button>
      </form>
    </div>
  );
}

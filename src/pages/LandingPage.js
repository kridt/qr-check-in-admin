import React from "react";
import "./LandingPage.css";
import { useParams } from "react-router-dom";

export default function LandingPage() {
  const checkId = useParams().check;
  const locationId = useParams().locationId;
  console.log(locationId, checkId);

  return (
    <div className="landing-page">
      <form className="form">
        <label htmlFor="numberInput">Enter your company number:</label>
        <input type="tel" id="numberInput" />
        <button type="submit">Check {checkId}</button>
      </form>
    </div>
  );
}

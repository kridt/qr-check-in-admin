import React from "react";
import { CoworkerIdContext } from "../contexts/coworkerContext";

export default function Start() {
  const { coworkerId } = React.useContext(CoworkerIdContext);

  console.log(coworkerId);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Vælg en location her!</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <div>
          <h2>Stempel ind</h2>
        </div>
        <div>
          <h2>Stempel ud</h2>
        </div>
      </div>
    </div>
  );
}

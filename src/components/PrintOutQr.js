import React from "react";

export default function PrintQrOut({ name, link }) {
  return (
    <div style={{ backgroundColor: "white", width: "630px", margin: "0 auto" }}>
      <h2 style={{ color: "black", textAlign: "center", padding: "1em 0 0 0" }}>
        Stempel Ud/Out
      </h2>
      <h3 style={{ color: "black", textAlign: "center" }}>{name}</h3>

      <img
        style={{
          maxWidth: "75%",
          margin: "0 auto",
          display: "block",
          padding: "0 0 15em 0",
        }}
        src={link}
        alt="link to qr code"
      />
    </div>
  );
}

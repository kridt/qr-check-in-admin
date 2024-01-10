import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PrintQrIn from "../components/PrintQrIn";
import { database } from "../firebase";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import PrintQrOut from "../components/PrintOutQr";

export default function PrintQr() {
  const [currentLocation, setCurrentLocation] = useState({});
  const { location } = useParams();
  const printRefIn = useRef();
  const printRefOut = useRef();
  const handlePrintIn = useReactToPrint({
    content: () => printRefIn.current,
    documentTitle: "Stempel ind",
    onAfterPrint: () => alert("Print udført"),
    copyStyles: true,
  });
  const handlePrintOut = useReactToPrint({
    content: () => printRefOut.current,
    documentTitle: "Stempel ud",
    onAfterPrint: () => alert("Print udført"),
    copyStyles: true,
  });

  useEffect(() => {
    database
      .collection("locations")
      .doc(location)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setCurrentLocation(doc.data());
        } else {
          console.log("No such document!");
        }
      });
  }, []);
  console.log(currentLocation);

  return (
    <div>
      <Link to="/admin">Tilbage</Link>
      <h1 style={{ textAlign: "center" }}>Print QR</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "2em 12em",
        }}
      >
        <div>
          <button onClick={() => handlePrintIn()}>Print stempel ind</button>
          <div ref={printRefIn}>
            <PrintQrIn
              name={currentLocation?.locationName}
              link={currentLocation?.qrUrlInDone}
            />
          </div>
        </div>
        <div>
          <button onClick={() => handlePrintOut()}>Print stempel ud</button>
          <div ref={printRefOut}>
            <PrintQrOut
              link={currentLocation?.qrUrlOutDone}
              name={currentLocation?.locationName}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

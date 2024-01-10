import React, { useEffect, useState } from "react";
import { auth, database } from "../firebase";
import { useNavigate } from "react-router-dom";
import ListOfQrCodes from "../components/ListOfQrCodes";

export default function Admin() {
  const navigate = useNavigate();
  const [superAdmin, setSuperAdmin] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in.");
        if (user.email === "chrnielsen2003@gmail.com") {
          setSuperAdmin(true);
        }
      } else {
        console.log("No user is signed in.");
        navigate("/login");
      }
    });
  }, [navigate]);

  function handleSubmitAdmin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User:", user);
        database
          .collection("admins")
          .doc(user.uid)
          .set({
            email: user.email,
            uid: user.uid,
          })
          .catch((error) => {
            console.log("Error:", error);
          });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error:", errorCode, errorMessage);
        // ..
      });
  }

  return (
    <div>
      <button onClick={() => setSuperAdmin(!superAdmin)}>test super</button>
      <h1>admin</h1>

      <ListOfQrCodes uid={auth?.currentUser?.uid} />

      {superAdmin && (
        <>
          <h2>Super Admin</h2>

          <form onSubmit={(e) => handleSubmitAdmin(e)}>
            create new user
            <div>
              <label htmlFor="email">Email: </label>
              <input type="email" id="email" />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input type="password" id="password" />
            </div>
            <input type="submit" value={"Opret ny admin"} />
          </form>
        </>
      )}
    </div>
  );
}

//import dependencies and components
import { React, useState, useEffect } from "react";
import Login from "./components/login";
import Events from "./components/events";
import Admin from "./components/admin";
import TopBar from "./components/topbar";
import "bootstrap/dist/css/bootstrap.min.css";

//main app file, contains display logic for whats shown in the UI
//and stores the user info in State
function App() {
  const [user, setUser] = useState({ jwt: "", auth: false, admin: false });
  return (
    <div className="App">
      {/* Check which element to display based on if the user is logged
      in and whether they are an admin or not, in that order */}
      <TopBar user={user} setUser={setUser} />
      {user.auth ? (
        user.admin ? (
          <Admin user={user} setUser={setUser} />
        ) : (
          <Events user={user} setUser={setUser} />
        )
      ) : (
        <Login user={user} setUser={setUser} />
      )}
    </div>
  );
}

export default App;

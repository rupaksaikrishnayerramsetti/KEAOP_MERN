import React, { useEffect, useState } from "react";
import "./App.css";
import Landing from "./LandingPage/Landing";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Home } from "./Home/Homepage/Home";
import { NavigationBar } from "./Navbar/NavigationBar";
import { Note } from "./Home/Note/Note";
import { Remainder } from "./Home/Remainder/Remainder";
import { Profile } from "./Home/Profile/Profile";
import ProtectedRoute from "./ProtectedRoutes";
import { SpentAnalysis } from "./Home/SpentAnalysis/SpentAnalysis";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { globalColors } from "./styles/Colors";
function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
    },
  });

  const [isTokenCreated, setIsTokenCreated] = useState(false);
  const [alertCount, setalertCount] = useState(0);
  const [noteCount, setnoteCount] = useState(0);

  useEffect(() => {}, [isTokenCreated]);
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          backgroundColor: globalColors.backgroundcolor,
          color: globalColors.navbarcolor,
          height: "100%",
          minHeight: window.innerHeight,
        }}
      >
        <Router>
          {isTokenCreated ? (
            <NavigationBar
              isTokenCreated={isTokenCreated}
              setIsTokenCreated={setIsTokenCreated}
              alertCount={alertCount}
              setalertCount={setalertCount}
              noteCount={noteCount}
              setnoteCount={setnoteCount}
            />
          ) : null}
          <Routes>
            <Route
              path="/"
              element={
                !!localStorage.getItem("jwt_token") ? (
                  <Navigate to="/home" replace={true} />
                ) : (
                  <Landing />
                )
              }
            />
            <Route
              element={
                <ProtectedRoute
                  isTokenCreated={isTokenCreated}
                  setIsTokenCreated={setIsTokenCreated}
                />
              }
            >
              <Route
                path="/home"
                element={
                  <>
                    <Home />
                  </>
                }
              />
              <Route
                path="/note"
                element={
                  <>
                    <Note noteCount={noteCount} setnoteCount={setnoteCount} />
                  </>
                }
              />
              <Route
                path="/spent"
                element={
                  <>
                    <SpentAnalysis />
                  </>
                }
              />
              <Route
                path="/remainder"
                element={
                  <>
                    <Remainder
                      alertCount={alertCount}
                      setalertCount={setalertCount}
                    />
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <>
                    <Profile />
                  </>
                }
              />
            </Route>
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;

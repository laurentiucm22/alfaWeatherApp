import React from "react";
import StartPage from "./pages/StartPage";
import backgroundImage from "../src/assets/images/bg-image.jpg";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Wrapper from "../src/UI/Wrapper";
import WeatherPage from "./pages/WeatherPage";
import NavBar from "./components/NavBar/NavBar";
import Container from "./UI/Container";
import { auth } from "./Firebase/firebase";

const App = () => {
  return (
    <Container
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
      className="relative h-screen text-white bg-fixed bg-center bg-no-repeat bg-cover bg-slate-200"
    >
      <Wrapper
        className="h-full"
        style={{ backgroundColor: "rgba(25, 195, 251, 0.3)" }}
      >
        <NavBar firebaseAuth={auth} />

        <Routes>
          <Route exact path="/" element={<StartPage />} />
          <Route path="/city-weather" element={<WeatherPage />} />
        </Routes>

        <Footer />
      </Wrapper>
    </Container>
  );
};

export default App;

import StartPage from "./pages/StartPage";
import backgroundImage from "../src/assets/images/bg-image.jpg";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Wrapper from "../src/UI/Wrapper";
import WeatherPage from "./pages/WeatherPage";
import { app, auth, db } from "./Firebase/firebase";
import NavBar from "./components/NavBar/NavBar";
import Container from "./UI/Container";

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
        style={{ backgroundColor: "rgba(25, 195, 251, 0.4)" }}
      >
        <NavBar />

        <Routes>
          <Route
            exact
            path="/"
            element={
              <StartPage firebase={app} firebaseAuth={auth} firebaseDb={db} />
            }
          />
          <Route path="/current-weather" element={<WeatherPage />} />
        </Routes>

        <Footer />
      </Wrapper>
    </Container>
  );
};

export default App;

import StartPage from "./pages/StartPage";
import backgroundImage from "../src/assets/images/bg-image.jpg";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Wrapper from "../src/UI/Wrapper";
import WeatherPage from "./pages/WeatherPage";

const App = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
      className="relative h-screen text-white bg-fixed bg-center bg-no-repeat bg-cover bg-slate-200"
    >
      <Wrapper style={{ backgroundColor: "rgba(25, 195, 251, 0.4)" }}>
        <Routes>
          <Route exact path="/" element={<StartPage />} />
          <Route path="/current-weather" element={<WeatherPage />} />
        </Routes>
        <Footer />
      </Wrapper>
    </div>
  );
};

export default App;

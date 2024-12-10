import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.css";
import CountryInfoPage from "./pages/CountryInfoPage/CountryInfoPage";
import CountryListPage from "./pages/CountryListPage/CountryListPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CountryListPage />} />
          <Route
            path="country-info/:countryCode"
            element={<CountryInfoPage />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

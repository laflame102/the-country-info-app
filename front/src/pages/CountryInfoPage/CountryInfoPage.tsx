import { useParams } from "react-router-dom";

import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

import BorderCountries from "../../components/BorderCountries/BorderCountries";
import CountryDetails from "../../components/CountryDetails/CountryDetails";
import PopulationChart from "../../components/PopulationChart/PopulationChart";
import { Service } from "../../lib/service";
import { CountryData } from "../../types";

const CountryInfoPage = () => {
  const { countryCode } = useParams();
  const [countryInfo, setCountryInfo] = useState<CountryData | null>(null);

  useEffect(() => {
    const getCountryInfo = async () => {
      try {
        if (!countryCode) {
          console.log("Country code is not available");
          return;
        }

        const data = await Service.getCountryInfo(countryCode);
        setCountryInfo(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCountryInfo();
  }, [countryCode]);

  return (
    <Box sx={{ padding: "20px", width: "100%" }}>
      {!countryInfo ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <CountryDetails countryInfo={countryInfo} />
          <BorderCountries countryInfo={countryInfo} />
          <PopulationChart countryInfo={countryInfo} />
        </>
      )}
    </Box>
  );
};

export default CountryInfoPage;

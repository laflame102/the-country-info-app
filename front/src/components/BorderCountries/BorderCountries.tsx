import { useNavigate } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";

import { Border, CountryData } from "../../types";

interface BorderCountriesProps {
  countryInfo: CountryData;
}

const BorderCountries = ({ countryInfo }: BorderCountriesProps) => {
  const navigate = useNavigate();

  const handleCountryClick = (countryCode: string) => {
    navigate(`/country-info/${countryCode}`);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Border Countries</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px", mt: 2 }}>
        {countryInfo?.bordersData.value.borders.map((border: Border) => (
          <Button
            key={border.countryCode}
            variant="contained"
            color="primary"
            onClick={() => handleCountryClick(border.countryCode)}
            sx={{
              textTransform: "none",
              fontSize: "14px",
            }}
          >
            {border.commonName}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default BorderCountries;

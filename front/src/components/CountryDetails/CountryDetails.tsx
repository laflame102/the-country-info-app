import { Box, Typography } from "@mui/material";

import { CountryData } from "../../types";

interface CountryDetailsProps {
  countryInfo: CountryData;
}

const CountryDetails = ({ countryInfo }: CountryDetailsProps) => {
  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4">
        {countryInfo?.bordersData.value.commonName}
      </Typography>
      <img
        src={countryInfo?.flagData?.value}
        alt={`${countryInfo?.bordersData.value.commonName} flag`}
        style={{
          width: "200px",
          height: "auto",
          marginTop: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      />
    </Box>
  );
};

export default CountryDetails;

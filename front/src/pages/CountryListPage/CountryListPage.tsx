import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import { Service } from "../../lib/service";
import { Country } from "../../types";

const CountryListPage = () => {
  const [data, setData] = useState<Country[]>([]);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const data = await Service.getCountries();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCountries();
  }, []);

  return (
    <Box sx={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        Country List
      </Typography>
      <List
        sx={{
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          padding: "10px",
        }}
      >
        {data.map((item) => (
          <ListItem
            key={item.countryCode}
            disablePadding
            sx={{
              marginBottom: "8px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            <Link
              to={`/country-info/${item.countryCode}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 16px",
                width: "100%",
              }}
            >
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              />
              <ListItemText
                primary={item.countryCode}
                primaryTypographyProps={{
                  color: "gray",
                  textAlign: "right",
                  fontSize: "14px",
                }}
              />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CountryListPage;

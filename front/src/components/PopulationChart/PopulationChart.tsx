import { Box, Typography } from "@mui/material";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PopulationChart = ({ countryInfo }) => {
  if (
    !countryInfo ||
    !countryInfo.populationData ||
    !countryInfo.populationData.value
  ) {
    return <Typography variant="body1">Loading chart...</Typography>;
  }

  return (
    <Box sx={{ marginTop: "20px" }}>
      <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
        Population Growth
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={countryInfo.populationData.value}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PopulationChart;

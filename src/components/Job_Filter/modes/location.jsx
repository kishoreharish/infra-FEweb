import React, { useState } from "react";
import { Box, Typography, TextField, MenuItem, Button } from "@mui/material";

const locations = [
  "New York",
  "Los Angeles",
  "San Francisco",
  "Chicago",
  "Houston",
  "Miami",
  "Seattle",
  "Boston",
  "Austin",
  "Denver",
];

const Location = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
    if (onFilterChange) {
      onFilterChange(e.target.value);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setSelectedLocation("");
    if (onFilterChange) {
      onFilterChange("");
    }
  };

  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        padding: "16px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: "16px" }}>
        Filter by Location
      </Typography>

      {/* Search Input */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search locations..."
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ marginBottom: "16px" }}
      />

      {/* Dropdown for Locations */}
      <TextField
        fullWidth
        select
        label="Select a Location"
        value={selectedLocation}
        onChange={handleLocationChange}
        sx={{ marginBottom: "16px" }}
      >
        {filteredLocations.map((location, index) => (
          <MenuItem key={index} value={location}>
            {location}
          </MenuItem>
        ))}
      </TextField>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onFilterChange(selectedLocation)}
        >
          Apply
        </Button>
        <Button variant="text" color="secondary" onClick={handleClear}>
          Clear
        </Button>
      </Box>
    </Box>
  );
};

export default Location;

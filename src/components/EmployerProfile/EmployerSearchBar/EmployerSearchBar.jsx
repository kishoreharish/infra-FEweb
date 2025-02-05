import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./EmployerSearchBar.module.scss";
import { TextField, Button, CircularProgress, Box, Typography, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";

const EmployerSearchBar = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      debouncedSearch(query);
    } else {
      setCandidates([]);
      setNoResults(false);
    }
  }, [query]);

  const fetchCandidates = async (searchTerm) => {
    if (!searchTerm.trim()) return;
    
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");

      const response = await axios.get(`http://127.0.0.1:8000/api/candidates/search/`, {
        params: { query: searchTerm },
        headers: { Authorization: `Bearer ${token}` },
      });

      setCandidates(response.data);
      setNoResults(response.data.length === 0);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce(fetchCandidates, 500);

  return (
    <Box className={styles.container}>
      {/* 🔳 Search Section */}
      <Box className={styles.searchBox}>
        <Typography variant="h4" className={styles.heading}>
          Power your business with the right workforce
        </Typography>

        <Box className={styles.searchBar}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for candidates by skills, experience..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.input}
          />
          <Button variant="contained" className={styles.searchButton} onClick={() => fetchCandidates(query)}>
            <SearchIcon />
          </Button>
        </Box>

        <Typography variant="subtitle1" className={styles.trustedBy}>
          Trusted by: L&T, JLL, Aramco, Lodha
        </Typography>
      </Box>

      {/* 🔍 Search Results */}
      <Box className={styles.resultsContainer}>
        {loading && <Typography className={styles.loadingText}>Searching candidates...</Typography>}
        {noResults && <Typography className={styles.noResultsText}>No candidates found</Typography>}

        {candidates.length > 0 && (
          <Box className={styles.resultsGrid}>
            {candidates.map((candidate) => (
              <Box key={candidate.id} className={styles.candidateCard}>
                <Avatar src={candidate.profile_pic || "/default-avatar.png"} className={styles.avatar} />
                <Box className={styles.info}>
                  <Typography className={styles.name}>{candidate.name}</Typography>
                  <Typography className={styles.title}>
                    {candidate.title} • {candidate.experience ? `${candidate.experience} Years` : "Fresher"}
                  </Typography>
                  <Typography className={styles.skills}>
                    {candidate.skills.slice(0, 4).join(", ")}
                  </Typography>
                </Box>
                <Button variant="contained" className={styles.viewProfileBtn}>
                  View Profile
                </Button>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EmployerSearchBar;

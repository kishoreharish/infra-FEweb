import React, { useState } from "react";
import styles from "./CompanyProfile.module.scss";
import { TextField, Button, Select, MenuItem, Typography, Box } from "@mui/material";

const CompanyProfile = () => {
  const [formData, setFormData] = useState({
    logo: null,
    cover: null,
    companyName: "Invision",
    email: "ib-themes",
    phone: "0 123 456 7890",
    website: "www.invision.com",
    estSince: "06.04.2020",
    teamSize: "50 - 100",
    industries: ["Retail"],
    searchListing: "Yes",
    about: "",
    facebook: "www.facebook.com/Invision",
    twitter: "",
    linkedin: "",
    googlePlus: "",
    country: "Australia",
    city: "Melbourne",
    address: "329 Queenberry Street, North Melbourne VIC 3051, Australia.",
    mapAddress: "329 Queenberry Street, North Melbourne VIC 3051, Australia.",
    latitude: "Melbourne",
    longitude: "Melbourne",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className={styles.container}>
      <Typography variant="h5" className={styles.sectionTitle}>My Profile</Typography>
      
      <div className={styles.uploadSection}>
        <div className={styles.uploadBox}>
          <input type="file" name="logo" onChange={handleFileChange} />
          <Typography>Browse Logo</Typography>
          <p>Max file size is 1MB, Minimum dimension: 330x300, Suitable files are .jpg & .png</p>
        </div>
        <div className={styles.uploadBox}>
          <input type="file" name="cover" onChange={handleFileChange} />
          <Typography>Browse Cover</Typography>
          <p>Max file size is 1MB, Minimum dimension: 330x300, Suitable files are .jpg & .png</p>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Box className={styles.formRow}>
          <TextField
            label="Company Name (optional)"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
        </Box>

        <Box className={styles.formRow}>
          <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} fullWidth />
          <TextField label="Website" name="website" value={formData.website} onChange={handleChange} fullWidth />
        </Box>

        <Box className={styles.formRow}>
          <TextField label="Est. Since" name="estSince" value={formData.estSince} onChange={handleChange} fullWidth />
          <Select name="teamSize" value={formData.teamSize} onChange={handleChange} fullWidth>
            <MenuItem value="10 - 50">10 - 50</MenuItem>
            <MenuItem value="50 - 100">50 - 100</MenuItem>
            <MenuItem value="100 - 500">100 - 500</MenuItem>
          </Select>
        </Box>

        <Box className={styles.formRow}>
          <TextField label="Industry" name="industries" value={formData.industries} onChange={handleChange} fullWidth />
          <Select name="searchListing" value={formData.searchListing} onChange={handleChange} fullWidth>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </Box>

        <TextField
          label="About Company"
          name="about"
          value={formData.about}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
        />

        <Button type="submit" className={styles.saveButton}>Save</Button>
      </form>

      <Typography variant="h5" className={styles.sectionTitle}>Social Network</Typography>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Box className={styles.formRow}>
          <TextField label="Facebook" name="facebook" value={formData.facebook} onChange={handleChange} fullWidth />
          <TextField label="Twitter" name="twitter" value={formData.twitter} onChange={handleChange} fullWidth />
        </Box>
        <Box className={styles.formRow}>
          <TextField label="LinkedIn" name="linkedin" value={formData.linkedin} onChange={handleChange} fullWidth />
          <TextField label="Google Plus" name="googlePlus" value={formData.googlePlus} onChange={handleChange} fullWidth />
        </Box>
        <Button type="submit" className={styles.saveButton}>Save</Button>
      </form>

      <Typography variant="h5" className={styles.sectionTitle}>Contact Information</Typography>
      <Box className={styles.formRow}>
        <Select name="country" value={formData.country} onChange={handleChange} fullWidth>
          <MenuItem value="Australia">Australia</MenuItem>
          <MenuItem value="USA">USA</MenuItem>
        </Select>
        <Select name="city" value={formData.city} onChange={handleChange} fullWidth>
          <MenuItem value="Melbourne">Melbourne</MenuItem>
          <MenuItem value="Sydney">Sydney</MenuItem>
        </Select>
      </Box>

      <TextField label="Complete Address" name="address" value={formData.address} onChange={handleChange} fullWidth />

      <Button type="submit" className={styles.saveButton}>Save</Button>
    </div>
  );
};

export default CompanyProfile;

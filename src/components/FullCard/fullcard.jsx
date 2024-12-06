import React from 'react';
import { Box, Card, Typography, Divider, Button, IconButton } from '@mui/material';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

export default function FullCardList() {
  // Card data array
  const cardData = Array.from({ length: 20 }, (_, index) => ({
    image: 'https://via.placeholder.com/50',
    title: `Job Title ${index + 1}`,
    description: `This is a brief description for job ${index + 1}.`,
    jobType: 'Full-Time',
    companyName: `Company ${index + 1}`,
    postedTime: `${index + 1} days ago`,
    experience: '10-15 Yrs',
    salary: '8-12 Lacs PA',
    location: 'Pune, Bengaluru',
    knowledge: 'Project Management, Good Communication, Team Management',
  }));

  return (
    <Box sx={{ maxWidth: '1200px', margin: 'auto' }}>
      {/* Title for the List */}
      <h2 className="title">Hot Jobs</h2>

      {/* Card List */}
      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
        {cardData.map((card, index) => (
          <Card
            key={index}
            sx={{
              width: '100%',
              padding: '16px',
              boxShadow: 3,
              borderRadius: '12px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Save Icon */}
            <IconButton
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'primary.main',
              }}
              aria-label="Save job"
            >
              <BookmarkOutlinedIcon />
            </IconButton>

            {/* Image and Title */}
            <Box display="flex" alignItems="center" marginBottom={2}>
              <Box
                component="img"
                src={card.image}
                alt={`Logo for ${card.title}`}
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: '4px',
                  marginRight: '16px',
                  objectFit: 'cover',
                }}
              />
              <Typography variant="h7" component="div">
               <b> {card.title} </b><br />
                <Typography variant="caption" color="text.secondary">
                  <b>{card.companyName}</b> | {card.jobType}
                </Typography>
              </Typography>
            </Box>

            {/* Description */}
            <Typography variant="body2" color="text.secondary" marginBottom={2}>
              <Typography variant="caption" color="#1a1a1a" display="flex" alignItems="center" gap={1}>
                <WorkOutlineIcon fontSize="small" /> {card.experience} |{' '}
                <CurrencyRupeeIcon fontSize="small" /> {card.salary} |{' '}
                <LocationOnOutlinedIcon fontSize="small" /> {card.location}
              </Typography>
              <br />
              {card.description}
            </Typography>

            {/* Job Knowledge */}
            <Typography variant="body2" color="text.primary" marginBottom={2}>
              {card.knowledge}
            </Typography>

            {/* Divider */}
            <Divider sx={{ marginBottom: 2 }} />

            {/* Footer */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="caption" color="text.secondary">
                {card.postedTime}
              </Typography>
              <Button variant="contained" size="small" sx={{ textTransform: 'none' }}>
                Apply Now
              </Button>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

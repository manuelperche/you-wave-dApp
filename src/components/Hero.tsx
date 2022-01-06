import React from "react";
import { Box, Typography } from "@mui/material";

const Hero = () => {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h1" component="h1" textAlign="center">
        YouWave dApp
      </Typography>
      <Typography sx={{ my: 1 }} variant="subtitle1" component="p" textAlign="center">
        Share YouTube videos on Ethereum!
      </Typography>
    </Box>
  );
};

export default Hero;

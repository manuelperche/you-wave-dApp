import React from "react";
import ReactPlayer from "react-player/lazy";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { wave } from "../types/waves";

interface Props {
  allWaves: wave[];
}

const Videos = ({ allWaves }: Props) => {
  return (
    <>
      {allWaves.length > 0 ? (
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          {allWaves
            .slice(0)
            .reverse()
            .map((wave) => (
              <Grid item xs={12}>
                <Card sx={{ marginY: 2, width: "100%" }}>
                  <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
                    <ReactPlayer url={wave.message} width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }} />
                  </Box>
                  <CardContent>
                    <Typography sx={{ my: 1 }} variant="subtitle1" component="p">
                      Sent by: {wave.address}
                    </Typography>
                    <Typography variant="subtitle1" component="p">
                      Timestamp: {new Date(wave.timestamp).toISOString().replace(/T/, " ").replace(/\..+/, "")}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      ) : null}
    </>
  );
};

export default Videos;

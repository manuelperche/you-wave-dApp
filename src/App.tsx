import React from "react";
import Container from "@mui/material/Container";
import Hero from "./components/Hero";
import Buttons from './components/Buttons'
import Videos from "./components/Videos";
import useWave from "./hooks/useWave";

export default function App() {
  const { allWaves, wave } = useWave()

  return (
    <Container maxWidth="md">
      <Hero />
      <Buttons wave={wave}/>
      <Videos allWaves={allWaves}/>
    </Container>
  );
}

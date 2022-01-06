import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { wave, waveFromContract } from "../types/waves";
import abi from "../utils/YouWave.json";
import useConnectWallet from "./useConnectWallet";

const { ethereum } = window;
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS as string;
const contractABI = abi.abi;

const useWave = () => {
  const [allWaves, setAllWaves] = useState<wave[]>([]);

  const { currentAccount } = useConnectWallet();

  useEffect(() => {
    getAllWaves();
  }, [currentAccount]);

  const getAllWaves = async () => {
    try {
      console.log("gettingWaves...");
      if (!ethereum) {
        alert("Please make sure you have metamask installed");
        return;
      }
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const youWaveContract = new ethers.Contract(contractAddress, contractABI, signer);
      const waves: waveFromContract[] = await youWaveContract.getAllWaves();

      const wavesCleaned = waves.map((wave) => {
        return {
          address: wave.waver,
          timestamp: new Date(wave.timestamp * 1000),
          message: wave.message,
        };
      });

      setAllWaves(wavesCleaned);

      youWaveContract.on("NewWave", (from, timestamp, message) => {
        console.log("newWave", from, timestamp, message);

        setAllWaves((prevState) => [
          ...prevState,
          {
            address: from,
            timestamp: new Date(timestamp * 1000),
            message,
          },
        ]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const wave = async (message: string) => {
    try {
      if (!ethereum) {
        alert("Please make sure you have metamask installed");
        return;
      }
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const youWaveContract = new ethers.Contract(contractAddress, contractABI, signer);
      const waveTxn = await youWaveContract.wave(message);
      await waveTxn.wait();
    } catch (error) {
      console.log(error);
      alert("Error!");
    }
  };

  return { wave, getAllWaves, allWaves };
};

export default useWave;

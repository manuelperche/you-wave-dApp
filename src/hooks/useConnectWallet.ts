import { useEffect, useState } from "react";

const { ethereum } = window;

const useConnectWallet = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  useEffect(() => {
    if (ethereum) {
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("chainChanged", () => window.location.reload());
    }

    return () => {
      ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [currentAccount]);

  const handleAccountsChanged = (accounts: Array<string>) => {
    if (accounts[0] !== "") {
      setCurrentAccount(accounts[0]);
      return;
    } else {
      setCurrentAccount("");
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        alert("Please make sure you have metamask installed");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });
      const chainId = await ethereum.request({ method: "eth_chainId" });

      if (chainId !== "0x4") {
        alert("Please make sure you're on the Rinkeby Test Network");
        return;
      }

      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWalletHandler = async () => {
    try {
      if (!ethereum) {
        alert("Please make sure you have metamask installed");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      const chainId = await ethereum.request({ method: "eth_chainId" });

      if (chainId !== "0x4") {
        alert("Please make sure you're on the Rinkeby Test Network");
        return;
      }

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return { currentAccount, connectWalletHandler };
};

export default useConnectWallet;

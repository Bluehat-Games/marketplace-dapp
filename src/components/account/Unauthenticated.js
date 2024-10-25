import { Fragment, useState } from "react";
import Button from '@mui/material/Button';
import WalletProviders from './NetworkWalletProviders';
import WalletIcon from '../ui/icons/Wallet'
// import { ethers } from "ethers"; // Optional, if you want to use ethers.js
import { Snackbar, Alert } from "@mui/material";


const Unauthenticated = () => {

  const [open, setOpen] = useState(false);
  // const [address, setAddress] = useState(false);

  const [walletProvidersDialogOpen, setWalletProvidersDialogOpen] = useState(false);
  const handleWalletProvidersDialogToggle = () => {
    setWalletProvidersDialogOpen(!walletProvidersDialogOpen);
  };
  const checkMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      console.log("MetaMask is installed!");
      // Optionally, connect to MetaMask and get the current accounts
      try {
        setWalletProvidersDialogOpen(!walletProvidersDialogOpen);

        // await window.ethereum.request({ method: 'eth_requestAccounts' });
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const signer = provider.getSigner();
        // setAddress(await signer.getAddress());
        // console.log("Connected account:", address);

      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      console.log("MetaMask is not installed.");
      setOpen(true);
    }
  };


  return (
    <Fragment>
      <Button
        variant="contained"
        disableElevation
        fullWidth
        onClick={() => checkMetaMask()}
        startIcon={<WalletIcon />}
        sx={{ boxShadow: 'rgb(0 0 0 / 8%) 0px 8px 28px' }}
      >
        {/* {address ? `${address.slice(0, 5)}...${address.slice(-5)}` : 'Wallet Connect'} */}
        Wallet Connect
      </Button>
      <WalletProviders
        walletProvidersDialogOpen={walletProvidersDialogOpen}
        handleWalletProvidersDialogToggle={handleWalletProvidersDialogToggle}
      />

      <Snackbar
        open={open}
        autoHideDuration={6000} // Toast will automatically hide after 6 seconds
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Adjust toast position
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="warning"
          sx={{ width: "100%" }}
          action={
            <Button
              color="inherit"
              size="small"
              href="https://metamask.io/download.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Install MetaMask
            </Button>
          }
        >
          <b>MetaMask</b> is not installed. Please install it to use this DApp.
        </Alert>
      </Snackbar>
    </Fragment>
  );
}

export default Unauthenticated;
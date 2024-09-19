import { useContext, useEffect, useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import { RawMnemonicsContext } from "../../contexts/RawMnemonicsContext";
import { Box, Button, Card, Text } from "@radix-ui/themes";
import AccountCard from "../AccountCard/AccountCard";

export function SolanaWallet() {
  // const connection = new Connection("https://api.devnet.solana.com");
  const connection = new Connection(clusterApiUrl("devnet"));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [keyPairs, setKeyPairs] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const { rawMnemonicsContextState } = useContext(RawMnemonicsContext);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const addSolWallet = () => {
    const seed = mnemonicToSeed(rawMnemonicsContextState);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    setCurrentIndex(currentIndex + 1);
    const newAccount = {
      accountNumber: currentIndex + 1,
      publicKey: keypair.publicKey.toBase58(),
      privetKey: keypair.secretKey,
    };
    setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
    setSelectedAccount(newAccount);
  };

  const fetchTransactions = async (publicKey) => {
    try {
      const pubKey = new PublicKey(publicKey);
      const signatures = await connection.getSignaturesForAddress(pubKey);
      setTransactions(signatures);
    } catch (error) {
      console.log(
        "Something went wrong while fetching the tracnsactions : ",
        error
      );
    }
  };

  useEffect(() => {
    addSolWallet();
  }, []);

  const addSolWalletHandler = () => {
    addSolWallet();
  };

  useEffect(() => {
    fetchTransactions(selectedAccount?.publicKey);
  }, [selectedAccount]);

  return (
    <Box className="flex">
      <Box className="flex flex-col justify-end min-h-screen w-1/6 bg-zinc-900">
        <Button className="w-full" onClick={addSolWalletHandler}>
          Add Wallet
        </Button>
      </Box>
      <Box className="flex flex-grow justify-center items-center">
        {/* <Card>
          {publicKeys.map((p) => (
            <div>{p.toBase58()}</div>
          ))}
        </Card> */}
        <AccountCard account={selectedAccount} transactions={transactions} />
      </Box>
    </Box>
  );
}

export default SolanaWallet;

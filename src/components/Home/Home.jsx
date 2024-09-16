import { useContext } from "react";
import SelectChain from "../SelectChain/SelectChain";
import { ChainContext } from "../../contexts/ChainContext";
import { Text } from "@radix-ui/themes";
import MnemonicsGenerator from "../MnemonicsGenerator/MnemonicsGenerator";
import { RawMnemonicsContext } from "../../contexts/RawMnemonicsContext";
import MnemonicsDisplay from "../MnemonicsDisplay/MnemonicsDisplay";
import { SavedPhraseContext } from "../../contexts/SavedPhrase";
import SolanaAccount from "../SolanaAccount/SolanaAccount";
import EthAccount from "../EthAccount/EthAccount";

const Home = () => {
  const { chainContextState } = useContext(ChainContext);
  const { rawMnemonicsContextState } = useContext(RawMnemonicsContext);
  const { savedPhraseContextState } = useContext(SavedPhraseContext);
  return (
    <>
      {chainContextState ? (
        <>
          {rawMnemonicsContextState ? (
            <>
              {savedPhraseContextState ? (
                <>
                  {chainContextState === "Solana" ? (
                    <SolanaAccount />
                  ) : (
                    <EthAccount />
                  )}
                </>
              ) : (
                <MnemonicsDisplay />
              )}
            </>
          ) : (
            <MnemonicsGenerator />
          )}
        </>
      ) : (
        <SelectChain />
      )}
    </>
  );
};

export default Home;

import { useContext } from "react";
import SelectChain from "../SelectChain/SelectChain";
import { ChainContext } from "../../contexts/ChainContext";
import { Text } from "@radix-ui/themes";
import MnemonicsGenerator from "../MnemonicsGenerator/MnemonicsGenerator";
import { RawMnemonicsContext } from "../../contexts/RawMnemonicsContext";
import MnemonicsDisplay from "../MnemonicsDisplay/MnemonicsDisplay";

const Home = () => {
  const { chainContextState } = useContext(ChainContext);
  const { rawMnemonicsContextState } = useContext(RawMnemonicsContext);
  return (
    <>
      {chainContextState ? (
        <>
          {rawMnemonicsContextState ? (
            <MnemonicsDisplay />
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

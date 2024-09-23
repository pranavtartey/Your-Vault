import { Suspense, useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import "@radix-ui/themes/styles.css";
import { Badge, Box, Flex, Heading, Spinner, Theme } from "@radix-ui/themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { ChainProvider } from "./contexts/ChainContext";
import { MnemonicsProvider } from "./contexts/MnemonicsContext";
import { RawMnemonicsProvider } from "./contexts/RawMnemonicsContext";
import { SavedPhraseProvider } from "./contexts/SavedPhrase";
import { SelectedSolAccountContextProvider } from "./contexts/SelectedSolAccountContext";
import { SolAccountsContextProvider } from "./contexts/SolAccountsContext";

function App() {
  const [theme, setTheme] = useState(true);
  const themeButtonHandler = () => {
    setTheme(!theme);
  };
  return (
    <ChainProvider>
      <MnemonicsProvider>
        <RawMnemonicsProvider>
          <SavedPhraseProvider>
            <SelectedSolAccountContextProvider>
              <SolAccountsContextProvider>
                <Theme
                  appearance={theme ? "dark" : "light"}
                  accentColor="crimson"
                  grayColor="sand"
                  radius="large"
                >
                  <Flex
                    as="div"
                    className={`absolute w-screen ${
                      theme ? "bg-zinc-800" : "bg-amber-50"
                    }`}
                    justify={"between"}
                    align={"center"}
                  >
                    <Heading className="m-10 hover:cursor-default">
                      your-vault
                      <Badge
                        className="ml-2 hover:cursor-default"
                        variant="outline"
                        color="gray"
                      >
                        v1.0
                      </Badge>
                    </Heading>
                    <div className="mr-10">
                      <button onClick={themeButtonHandler}>
                        {theme ? <MoonIcon /> : <SunIcon />}
                      </button>
                    </div>
                  </Flex>
                  <Suspense
                    fallback={
                      <Box className="flex justify-center items-center min-h-screen">
                        <Spinner />
                      </Box>
                    }
                  >
                    <Outlet />
                  </Suspense>
                </Theme>
              </SolAccountsContextProvider>
            </SelectedSolAccountContextProvider>
          </SavedPhraseProvider>
        </RawMnemonicsProvider>
      </MnemonicsProvider>
    </ChainProvider>
  );
}

export default App;

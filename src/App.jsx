import { Suspense, useContext, useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import "@radix-ui/themes/styles.css";
import { Badge, Flex, Heading, Theme } from "@radix-ui/themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { ChainProvider } from "./contexts/ChainContext";
import * as Toast from "@radix-ui/react-toast";
import { MnemonicsProvider } from "./contexts/MnemonicsContext";
import { RawMnemonicsProvider } from "./contexts/RawMnemonicsContext";

function App() {
  const [theme, setTheme] = useState(true);
  const themeButtonHandler = () => {
    setTheme(!theme);
  };
  return (
    <ChainProvider>
      <MnemonicsProvider>
        <RawMnemonicsProvider>
          <Theme
            appearance={theme ? "dark" : "light"}
            accentColor="crimson"
            grayColor="sand"
            radius="large"
          >
            <Toast.Provider>
              <Flex
                className="absolute w-screen"
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
              <Suspense fallback={<div>Loading...</div>}>
                <Outlet />
              </Suspense>
            </Toast.Provider>
          </Theme>
        </RawMnemonicsProvider>
      </MnemonicsProvider>
    </ChainProvider>
  );
}

export default App;

import { CopyIcon, EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import {
  Badge,
  Box,
  Card,
  Code,
  DataList,
  Flex,
  Heading,
  IconButton,
  Tabs,
  Text,
} from "@radix-ui/themes";
import { useState } from "react";
import { Link } from "react-router-dom";

const AccountCard = ({ account, transactions }) => {
  const [isShowPrivateKey, setIsShowPrivateKey] = useState(false);
  const togglePrivateKeyVisibility = () => {
    setIsShowPrivateKey(!isShowPrivateKey);
  };
  return (
    <Card>
      <Tabs.Root defaultValue="account">
        <Tabs.List>
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          <Tabs.Trigger value="transfer">Transfer</Tabs.Trigger>
          <Tabs.Trigger value="airdrop">AirDrop Sol</Tabs.Trigger>
          <Tabs.Trigger value="transactions">Transactions</Tabs.Trigger>
        </Tabs.List>

        <Box pt="3">
          <Tabs.Content value="account">
            <DataList.Root>
              <DataList.Item align="center">
                <DataList.Label minWidth="88px">Account Number</DataList.Label>
                <DataList.Value>{account?.accountNumber}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">Public Key</DataList.Label>
                <DataList.Value>
                  <Flex align="center" gap="2">
                    <Code variant="ghost">{account?.publicKey}</Code>
                    <IconButton
                      size="1"
                      aria-label="Copy value"
                      color="gray"
                      variant="ghost"
                    >
                      <CopyIcon />
                    </IconButton>
                  </Flex>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">Privet Key</DataList.Label>
                <DataList.Value>
                  <Flex align="center" gap="2">
                    <Code variant="ghost">
                      {isShowPrivateKey ? account?.privetKey : "•".repeat(12)}
                    </Code>
                    <IconButton
                      size="1"
                      aria-label={
                        isShowPrivateKey
                          ? "Hide private key"
                          : "Show private key"
                      }
                      color="gray"
                      variant="ghost"
                      onClick={togglePrivateKeyVisibility}
                    >
                      {isShowPrivateKey ? <EyeNoneIcon /> : <EyeOpenIcon />}
                    </IconButton>
                  </Flex>
                </DataList.Value>
              </DataList.Item>
            </DataList.Root>
          </Tabs.Content>
          <Tabs.Content value="transfer">
            <Text size="2">Access and update your documents.</Text>
          </Tabs.Content>

          <Tabs.Content value="airdrop">
            <Text size="2">
              Edit your profile or update contact information.
            </Text>
          </Tabs.Content>
          <Tabs.Content value="transactions">
            <Box className="ml-4">

              <ul>
                {transactions.length === 0 ? (
                  <li>No transactions found</li>
                ) : (
                  transactions.map((tx, index) => (
                    <li key={index}>
                      <strong>Signature:</strong> {tx.signature}
                      <br />
                      <strong>Block Time:</strong>{" "}
                      {new Date(tx.blockTime * 1000).toLocaleString()}
                    </li>
                  ))
                )}
              </ul>
            </Box>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Card>
  );
};
export default AccountCard;

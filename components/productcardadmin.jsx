import {
  Accordion,
  Badge,
  Button,
  Card,
  Group,
  HoverCard,
  Kbd,
  Modal,
  PasswordInput,
  Popover,
  Space,
  Switch,
  Tabs,
  Text,
} from "@mantine/core";

import { IconX } from "@tabler/icons";

import moment from "moment";
import { useState } from "react";

export default function ProductCardAdmin({ hit }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [unavailable, setUnavailable] = useState(false);

  return (
    <div>
      <div className="flex justify-between pb-3 border-b-slate-300 border-b-[0.5px]">
        <div className="flex space-x-5">
          <img
            src={hit?.images[0]}
            className="h-[60px] min-w-[60px] object-contain"
          />

          <div className="space-y-2">
            <Text lineClamp={2} className="text-[#2c2c2c] font-medium">
              {hit?.name}
            </Text>

            <p className="text-[#228B22] text-[0.9rem]">
              Ksh. {hit?.variants[0]?.price}
            </p>
            <Badge color="dark" uppercase radius={null}>
              {hit?.category}
            </Badge>
          </div>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          color="green"
          variant="subtle"
          fw="lighter"
        >
          More
        </Button>
      </div>

      <Modal centered opened={modalOpen} withCloseButton={false}>
        <div className="flex justify-between">
          <h1 className="py-6 px-3 font-bold text-[1.5rem]">Edit product</h1>

          <Button
            onClick={() => setModalOpen(false)}
            color="gray"
            variant="subtle"
            mt={24}
          >
            <IconX />
          </Button>
        </div>

        <Tabs
          color="dark"
          unstyled
          styles={(theme) => ({
            tabsList: {
              display: "flex",
              maxWidth: "100%",
              overflowX: "auto",
              scrollbarWidth: "none",
            },
            tabPanel: {
              background: "yellow",
            },
            tab: {
              ...theme.fn.focusStyles(),
              padding: `${theme.spacing.xs} ${theme.spacing.md}`,
              cursor: "pointer",
              fontSize: theme.fontSizes.sm,
              display: "flex",
              alignItems: "center",
              fontFamily: "Satoshi",
              borderBottomColor: "light-gray",
              borderBottomWidth: 0.5,
              "&[data-active]": {
                borderBottomColor: "black",
                borderBottomWidth: 2,
              },
            },
          })}
          defaultValue="meta"
        >
          <Tabs.List>
            <Tabs.Tab value="meta">Metadata</Tabs.Tab>
            <Tabs.Tab value="sales">Sales</Tabs.Tab>
            <Tabs.Tab value="availability">Availability</Tabs.Tab>
            <Tabs.Tab value="removal">Removal</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="meta">
            <div className="mt-[15px]">Product metadata</div>
          </Tabs.Panel>
          <Tabs.Panel value="sales">Second panel</Tabs.Panel>
          <Tabs.Panel value="availability">
            <div className="mt-[15px] space-y-6">
              <Card shadow="sm" padding="sm" radius="md" withBorder>
                <Group position="apart" mt="md" mb="xs">
                  <Text weight={500}>Make product unavailable</Text>
                  <Switch
                    color="red"
                    checked={unavailable}
                    onChange={(e) => setUnavailable(e.target.checked)}
                  />
                </Group>
              </Card>

              <Text>
                When enabled , your shoppers can no longer shop this product
                until you disable it.
              </Text>
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="removal">
            <div className="mt-[15px] space-y-6">
              <Text>Type your password to remove this product</Text>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button color="red" fullWidth fw="lighter" uppercase>
                Remove product
              </Button>
            </div>
          </Tabs.Panel>
        </Tabs>
      </Modal>
    </div>
  );
}

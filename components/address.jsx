import {
  Badge,
  Button,
  Card,
  Group,
  Popover,
  Space,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useMutation } from "urql";

export default function Address({ address, noActions }) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [loadingToggle, setLoadingToggle] = useState(false);

  const MUTATE_ADDRESS = `
    mutation MUTATE_ADDRESS(
      $action: String
      $id: ID
      $email: String
      $default: Boolean
    ){
      mutateAddress(
      action: $action
      id: $id
      email: $email
      default: $default
    ){
      id
    }
  }
  `;

  const [_, _mutateAddress] = useMutation(MUTATE_ADDRESS);

  const handleToggleDefault = () => {
    setLoadingToggle(true);

    _mutateAddress({
      action: "toggle-default",
      id: address?.id,
      email: session?.user?.email,
      default: !address?.default,
    })
      .then((data, error) => {
        return;
      })
      .catch((err) => {
        notifications.show({
          color: "red",
          title: "Oops! Something occured",
        });
      })
      .finally(() => {
        setLoadingToggle(false);
      });
  };

  const handleRemove = () => {
    setLoading(true);
    _mutateAddress({
      action: "remove",
      id: address?.id,
      email: session?.user?.email,
    })
      .then((data, error) => {
        return;
      })
      .catch((err) => {
        notifications.show({
          color: "red",
          title: "Oops! Something occured",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Card shadow="sm" padding="xs" radius="md" withBorder className="w-full">
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{address?.label}</Text>
        {address?.default && (
          <Badge color="#228B22" variant="light">
            Default
          </Badge>
        )}
      </Group>

      <Link
        href={`https://maps.google.com/?q=${address.lat},${address.lng}&ll=${address.lat},${address.lng}&z=15`}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-blue-600"
      >
        View location on Google Maps
      </Link>

      <Space h={12} />
      {!noActions && (
        <div className="flex space-x-2">
          <Button
            uppercase
            color="dark"
            variant="subtle"
            fullWidth
            loading={loadingToggle}
            onClick={handleToggleDefault}
          >
            toggle default
          </Button>

          <Popover width={200} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Button fullWidth color="dark" variant="subtle" uppercase>
                remove
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <Text size="sm" fw="bold">
                Do you want to remove this address?{" "}
              </Text>
              <div className="flex justify-between mt-8 space-x-12">
                <Button
                  onClick={handleRemove}
                  loading={loading}
                  color="dark"
                  fw="lighter"
                  uppercase
                  fullWidth
                >
                  Yes
                </Button>
                <Button
                  color="dark"
                  fw="lighter"
                  variant="outline"
                  uppercase
                  fullWidth
                >
                  No
                </Button>
              </div>
            </Popover.Dropdown>
          </Popover>
        </div>
      )}
    </Card>
  );
}

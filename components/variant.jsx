import { Button, Card, Text } from "@mantine/core";
import { IconX } from "@tabler/icons";

export default function Variant({ variant, onRemove }) {
  return (
    <Card shadow="sm" radius="md" withBorder>
      <div className="flex space-y-4">
        {variant?.thumbnail ? (
          <img
            className="min-w-[100px] h-[100px] rounded-md"
            src={URL.createObjectURL(variant?.thumbnail)}
            height={70}
          />
        ) : (
          <div className=" border-gray-400 border-2 p-8 justify-center align-middle">
            <p>{variant?.label}</p>
          </div>
        )}

        <div className="w-full p-4 mt-[12px] ">
          <Text>{variant?.label}</Text>
          <p className="text-[#228B22] text-[0.9rem]">Ksh. {variant?.price}</p>
        </div>
        <div className="float-right h-full">
          <Button p={0} color="dark" h={32} w={32} mt={12} onClick={onRemove}>
            <IconX />
          </Button>
        </div>
      </div>
    </Card>
  );
}

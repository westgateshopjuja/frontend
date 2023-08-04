import {
  Accordion,
  Badge,
  Button,
  HoverCard,
  Kbd,
  Popover,
  Space,
  Text,
} from "@mantine/core";
import moment from "moment";
import { useState } from "react";

export default function ProductCardAdmin({ hit }) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <div>
      <Accordion.Item value={(hit?.id).toString()}>
        <Accordion.Control>
          <div className="flex space-x-5">
            <img
              src={hit?.images[0]}
              className="h-[60px] min-w-[60px] object-contain"
            />
            <div className="space-y-2">
              <Text lineClamp={1} className="text-[#2c2c2c] font-medium">
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
        </Accordion.Control>
        <Accordion.Panel>
          <div className="space-y-4">
            <p className="font-medium">
              Added :{" "}
              <span className="font-light text-[0.8rem]">
                {moment(new Date()).format("Do MMM, YY , hh:mm a")}
              </span>
            </p>
            <p className="font-medium">
              Modified :{" "}
              <span className="font-light text-[0.8rem]">
                {moment(new Date()).format("Do MMM, YY , hh:mm a")}
              </span>
            </p>
            <p className="font-medium">
              Description{" "}
              <div className="font-light block mt-2 mb-8">
                {hit?.description}
              </div>
            </p>
            <div className="font-medium">
              Variants{" "}
              <div className="font-light mt-2 grid grid-cols-3 gap-4 mb-8">
                {hit?.variants.map((variant, i) => (
                  <div key={i}>
                    <div className="p-4 col-span-1 border-gray-400 border-2 justify-center align-middle">
                      <p className="w-full text-center">{variant?.label}</p>
                    </div>
                    <p className="text-[#228B22] text-[0.9rem]">
                      Ksh. {variant?.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <p className="font-medium mt-12">
              Additional Information{" "}
              <div className="font-light mt-4 ml-8">
                {hit?.additionalInformation.map((el, i) => (
                  <p key={i} className="font-medium">
                    {el?.label}: <span className="font-light">{el?.value}</span>
                  </p>
                ))}
              </div>
            </p>
            <Space h={20} />
            <div className="w-full flex space-x-12 justify-around">
              <Button fullWidth uppercase fw="lighter" color="dark">
                Edit
              </Button>
              <Popover
                width={200}
                position="right-end"
                withArrow
                shadow="md"
                opened={popoverOpen}
                onChange={setPopoverOpen}
              >
                <Popover.Target>
                  <Button
                    onClick={() => setPopoverOpen((o) => !o)}
                    fullWidth
                    variant="outline"
                    uppercase
                    fw="lighter"
                    color="dark"
                  >
                    Delete
                  </Button>
                </Popover.Target>
                <Popover.Dropdown>
                  <Text size="sm">
                    Are you sure you want to remove this product and all its
                    variants?
                  </Text>
                  <div className="flex mt-3 justify-between space-x-8">
                    <Button fullWidth uppercase fw="lighter" color="dark">
                      Yes
                    </Button>
                    <Button
                      fullWidth
                      uppercase
                      fw="lighter"
                      onClick={() => setPopoverOpen(false)}
                      color="dark"
                      variant="outline"
                    >
                      No
                    </Button>
                  </div>
                </Popover.Dropdown>
              </Popover>
            </div>
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </div>
  );
}

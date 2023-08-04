import { Text } from "@mantine/core";
import { Logoheader } from "../components";

export default function About() {
  return (
    <div>
      <Logoheader />

      <div className="p-4 space-y-8">
        <h1 className="font-medium text-[1.5rem]">About</h1>
        <Text fw="lighter">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente
          voluptatum dignissimos soluta aperiam aspernatur odit modi nisi cumque
          ipsa esse quaerat sint ipsum exercitationem quam id veritatis
          asperiores, excepturi ducimus!
        </Text>
      </div>
    </div>
  );
}

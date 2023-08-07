import { Text } from "@mantine/core";
import { Footer, Logoheader } from "../components";

export default function About() {
  return (
    <div>
      <Logoheader />

      <div className="p-4 space-y-8 mt-[80px] relative">
        <h1 className="font-medium text-[1.5rem]">About</h1>
        <Text fw="lighter">
          Welcome to Westgate mart, your friendly neighborhood supermarket, now
          available at your fingertips!
        </Text>
        <Text fw="lighter">
          Established with a commitment to providing quality products and
          exceptional service, Westgate mart has been a trusted name in the
          local community for over 5 years.
        </Text>
        <Text fw="lighter">
          At Westgate mart, we understand the importance of convenience in your
          busy lives. Our online platform brings the aisles of our supermarket
          to your screen, allowing you to shop all from the comfort of your
          home.
        </Text>
      </div>

      <Footer />
    </div>
  );
}

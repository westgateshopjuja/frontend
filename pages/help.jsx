import { Accordion, Button } from "@mantine/core";
import { Footer, Logoheader } from "../components";
import { useRouter } from "next/router";

export default function Help() {
  const router = useRouter();
  return (
    <div>
      <Logoheader />
      <div className="p-4 space-y-12">
        <h1 className="font-medium text-[1.5rem]">Help</h1>
        <Accordion defaultValue="customization">
          <Accordion.Item value="customization">
            <Accordion.Control>Terms of Services</Accordion.Control>
            <Accordion.Panel>
              Colors, fonts, shadows and many other parts are customizable to
              fit your design needs
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="flexibility">
            <Accordion.Control>Shipping</Accordion.Control>
            <Accordion.Panel>
              Configure components appearance and behavior with vast amount of
              settings or overwrite any part of component styles
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="privacy-policy">
            <Accordion.Control>Privacy Policy</Accordion.Control>
            <Accordion.Panel>
              With new :focus-visible pseudo-class focus ring appears only when
              user navigates with keyboard
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="return&exchanges">
            <Accordion.Control>Return & Exchanges</Accordion.Control>
            <Accordion.Panel>
              With new :focus-visible pseudo-class focus ring appears only when
              user navigates with keyboard
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        <Button
          color="dark"
          variant="outline"
          onClick={() => router.push("/contact")}
          uppercase
          fullWidth
        >
          <span className="font-light">Contact</span>
        </Button>

        <Footer />
      </div>
    </div>
  );
}

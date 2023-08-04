import { Button, TextInput, Textarea } from "@mantine/core";
import { Footer, Logoheader } from "../components";

export default function Contact() {
  return (
    <div>
      <Logoheader />
      <div className="p-4 space-y-8">
        <h1 className="font-medium text-[1.5rem]">Contact</h1>
        <TextInput placeholder="Your name" label="Full name" withAsterisk />
        <TextInput placeholder="Your email" label="Email" withAsterisk />
        <Textarea
          placeholder="Your message"
          label="Your message"
          minRows={12}
          withAsterisk
        />
        <Button color="dark" fw="lighter" uppercase fullWidth>
          send
        </Button>
        <Footer />
      </div>
    </div>
  );
}

import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div>
        <UserButton
          // Redirect users back to the home page
          afterSignOutUrl="/"
        />
        <ModeToggle />
      </div>
    </>
  );
}

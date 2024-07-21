"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
export default function ResponseCard() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (value: string) => {
    setIsOpen(value === "item-1");
  };
  const data = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
    },
  ];
  return (
    <section className="mt-6 flex flex-col space-x-4 p-4 border rounded-lg w-1/2">
      <Accordion type="single" collapsible onValueChange={handleOpenChange}>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-2xl">Response</AccordionTrigger>
          <AccordionContent>
            <section className="flex space-x-40 p-2">
              <p>Status: </p>
              <p>Size: </p>
              <p>Time: </p>
            </section>
            <section className="border p-2 rounded-lg bg-gray-100">
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </section>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

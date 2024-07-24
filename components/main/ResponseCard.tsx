"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, Suspense } from "react";
import { useFormStore } from "@/stores/useStateForm";
import { useFormStatus } from "react-dom";
import ResponseCardLoading from "../loading/ResponseCardLoading";

function ResponseContent() {
  const { data } = useFormStore((state) => ({ data: state.data }));

  return (
    <>
      <section className="flex space-x-40 p-2">
        <p>Status: </p>
        <p>Size: </p>
        <p>Time: </p>
      </section>
      <section className="border p-2 rounded-lg bg-gray-100">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </section>
    </>
  );
}

export default function ResponseCard() {
  const [isOpen, setIsOpen] = useState(true);

  const handleOpenChange = (value: string) => {
    setIsOpen(value === "item-1");
  };

  return (
    <section className="mt-6 flex flex-col space-x-4 p-4 border rounded-lg w-1/2">
      <Accordion
        type="single"
        collapsible
        onValueChange={handleOpenChange}
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-2xl">Response</AccordionTrigger>
          <AccordionContent>
            <AccordionContent>
              <Suspense fallback={<ResponseCardLoading />}>
                <ResponseContent />
              </Suspense>
            </AccordionContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

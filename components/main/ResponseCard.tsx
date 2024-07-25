"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, Suspense } from "react";
import ResponseCardLoading from "../loading/ResponseCardLoading";
import { useFormStore } from "@/stores/useStateForm";
function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );
}

function ResponseContent() {
  const { data } = useFormStore((state) => ({ data: state.data }));
  const { loading, responseDetail } = useFormStore((state) => ({
    loading: state.loading,
    responseDetail: state.responseDetail,
  }));
  return (
    <>
      <section className="flex space-x-40 p-2">
        <p>Status: {responseDetail.status} </p>
        <p>Size: {responseDetail.size} </p>
        <p>Time: {responseDetail.time} </p>
      </section>
      <section className="border p-2 rounded-lg bg-gray-100">
        {loading ? <Spinner /> : <pre>{JSON.stringify(data, null, 2)}</pre>}
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

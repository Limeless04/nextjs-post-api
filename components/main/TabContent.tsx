import { TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import QueryForm from "./QueryForm";
import HeadersForm from "./HeadersForm";
import { Textarea } from "@/components/ui/textarea";

export function TabQuery() {
  return (
    <TabsContent value="query">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Query Parameters</AccordionTrigger>
          <AccordionContent className="p-4 border rounded-lg flex items-center space-x-4 w-full">
            <QueryForm />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </TabsContent>
  );
}

export function TabHeaders() {
  return (
    <TabsContent value="headers">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Http Headers</AccordionTrigger>
          <AccordionContent className="p-4 border rounded-lg flex items-center space-x-4 w-full">
            <HeadersForm />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </TabsContent>
  );
}

export function TabBody() {
  return (
    <TabsContent value="body">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Json Body</AccordionTrigger>
          <AccordionContent>
            <Textarea />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </TabsContent>
  );
}

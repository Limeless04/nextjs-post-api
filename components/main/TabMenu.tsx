import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { z } from "zod";
import { TabBody, TabHeaders, TabQuery } from "./TabContent";

// Define the schema for a single menu item
const MenuItemSchema = z.object({
  key: z.string(),
  value: z.string(),
});

type MenuItems = z.infer<typeof MenuItemSchema>;

export default function TabMenu() {
  const menuItems: MenuItems[] = [
    { key: "Query", value: "query" },
    { key: "Headers", value: "headers" },
    { key: "Body", value: "body" },
  ];
  return (
    <section className=" border rounded-lg p-4 ">
      <Tabs defaultValue="query" className="w-full">
        <TabsList className="w-full">
          {menuItems.map((menu) => (
            <TabsTrigger
              key={menu.key}
              value={menu.value}
              className="w-full text-center"
            >
              {menu.key}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabQuery />
        <TabBody />
        <TabHeaders />
      </Tabs>
    </section>
  );
}

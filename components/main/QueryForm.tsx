"use client";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "../ui/input";

type QueryItemProps = {
  queryName: string;
  queryValue: string;
  onChange: (queryName: string, queryValue: string) => void;
};
function QueryItem({ queryName, queryValue, onChange }: QueryItemProps) {
  return (
    <div className="flex items-center space-x-4 mb-2">
      <div className="flex items-center flex-shrink-0">
        <Checkbox id={`checkbox-${queryName}`} />
      </div>
      <div className="flex flex-col flex-grow space-y-2">
        <Input
          id={`input-query-${queryName}`}
          placeholder="Enter query"
          className="p-2 border rounded-md w-full"
          defaultValue={queryName} // Set the default value from props
          onChange={(e) => onChange(e.target.value, queryValue)}
        />
      </div>
      <div className="flex flex-col flex-grow space-y-2">
        <Input
          id={`input-value-${queryName}`}
          placeholder="Enter value"
          className="p-2 border rounded-md w-full"
          defaultValue={queryValue} // Set the default value from props
          onChange={(e) => onChange(queryName, e.target.value)}
        />
      </div>
    </div>
  );
}

type QueryItemType = {
  queryName: string;
  queryValue: string;
};
export default function QueryForm() {
  const [queryItems, setQueryItems] = useState<QueryItemType[]>([
    {
      queryName: "",
      queryValue: "",
    },
  ]);

  const handleChange = (
    index: number,
    queryName: string,
    queryValue: string
  ) => {
    const newqueryItems = [...queryItems];
    newqueryItems[index] = { queryName, queryValue };

    // Check if the new query value is not empty and if it's the last item
    if (queryName && index === queryItems.length - 1) {
      newqueryItems.push({ queryName: "", queryValue: "" });
    }

    setQueryItems(newqueryItems);
  };
  return (
    <div className="p-4 w-full">
      {queryItems.map((item, index) => (
        <QueryItem
          key={index}
          queryName={item.queryName}
          queryValue={item.queryValue}
          onChange={(queryName: string, queryValue: string) =>
            handleChange(index, queryName, queryValue)
          }
        />
      ))}
    </div>
  );
}

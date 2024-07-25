"use client";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormStore } from "@/stores/useStateForm";

type QueryItemProps = {
  queryName: string;
  queryValue: string;
  isChecked: boolean;
  onChange: (queryName: string, queryValue: string) => void;
  onCheck: (isChecked: boolean) => void;
  onDelete: () => void;
};
function QueryItem({
  queryName,
  queryValue,
  isChecked,
  onChange,
  onCheck,
  onDelete,
}: QueryItemProps) {
  const [checked, setChecked] = useState(isChecked);
  const [isHovered, setIsHovered] = useState(false);

  const handleCheckboxChange: React.FormEventHandler<
    HTMLButtonElement
  > = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onCheck(newChecked);
  };
  return (
    <div
      className="flex space-x-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center space-x-4 mb-2 px-1 w-11/12  hover:bg-gray-200 hover:rounded hover:px-1">
        <div className="flex items-center  flex-shrink-0">
          <Checkbox
            id={`checkbox-${queryName}`}
            checked={checked}
            onClick={handleCheckboxChange}
          />
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
      <div
        className={`flex flex-col flex-shrink space-y-2 ${
          isHovered ? "" : "hidden"
        }`}
      >
        <Button
          type="button"
          onClick={onDelete}
          className="relative text-white rounded p-2"
        >
          X
        </Button>
      </div>
    </div>
  );
}

export type QueryItemType = {
  queryName: string;
  queryValue: string;
  isChecked: boolean;
};
export default function QueryForm() {
  const {
    querys: queryItems,
    setQuery: setQueryItems,
    removeQuery,
  } = useFormStore((state) => ({
    querys: state.querys,
    setQuery: state.setQuery,
    removeQuery: state.removeQuery,
  }));

  const handleChange = (
    index: number,
    queryName: string,
    queryValue: string
  ) => {
    const newQueryItems = [...queryItems];
    newQueryItems[index] = {
      ...newQueryItems[index],
      queryName,
      queryValue,
    };

    // Check if the new query value is not empty and if it's the last item
    if (queryName && index === queryItems.length - 1) {
      newQueryItems.push({ queryName: "", queryValue: "", isChecked: false });
    }

    setQueryItems(newQueryItems);
  };

  const handleCheck = (index: number, isChecked: boolean) => {
    const newQueryItems = [...queryItems];
    newQueryItems[index] = { ...newQueryItems[index], isChecked };

    if (!isChecked && queryItems.length > 1) {
      console.log(queryItems);
      // Remove the last item by slicing off the last element
      removeQuery();
    } else if (isChecked && index === queryItems.length - 1) {
      // Add a new item if the current item is checked and it is the last item
      newQueryItems.push({
        queryName: "",
        queryValue: "",
        isChecked: false,
      });
      setQueryItems(newQueryItems);
    }
  };

  const handleDelete = () => {
    if (queryItems.length > 1) {
      removeQuery();
    }
  };
  return (
    <div className="p-4 w-full">
      {queryItems.map((item, index) => (
        <QueryItem
          key={index}
          queryName={item.queryName}
          queryValue={item.queryValue}
          isChecked={item.isChecked}
          onChange={(queryName: string, queryValue: string) =>
            handleChange(index, queryName, queryValue)
          }
          onCheck={(isChecked: boolean) => handleCheck(index, isChecked)}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

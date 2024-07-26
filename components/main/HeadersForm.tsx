"use client";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormStore } from "@/stores/useStateForm";

type HeaderItemProps = {
  headerName: string;
  headerValue: string;
  isChecked: boolean;
  onChange: (headerName: string, headerValue: string) => void;
  onCheck: (isChecked: boolean) => void;
  onDelete: () => void;
};
function HeaderItem({
  headerName,
  headerValue,
  isChecked,
  onChange,
  onCheck,
  onDelete,
}: HeaderItemProps) {
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
            id={`checkbox-${headerName}`}
            checked={checked}
            onClick={handleCheckboxChange}
          />
        </div>
        <div className="flex flex-col flex-grow space-y-2">
          <Input
            id={`input-header-${headerName}`}
            placeholder="Enter Header"
            className="p-2 border rounded-md w-full"
            defaultValue={headerName} // Set the default value from props
            onChange={(e) => onChange(e.target.value, headerValue)}
          />
        </div>
        <div className="flex flex-col flex-grow  space-y-2">
          <Input
            id={`input-value-${headerName}`}
            placeholder="Enter value"
            className="p-2 border rounded-md w-full"
            defaultValue={headerValue} // Set the default value from props
            onChange={(e) => onChange(headerName, e.target.value)}
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

export type HeaderItemType = {
  headerName: string;
  headerValue: string;
  isChecked: boolean;
};

export default function HeadersForm() {
  const {
    headers: headerItems,
    setHeaders: setHeaderItems,
    removeHeader,
  } = useFormStore((state) => ({
    headers: state.headers,
    setHeaders: state.setHeaders,
    removeHeader: state.removeHeader,
  }));

  const handleChange = (
    index: number,
    headerName: string,
    headerValue: string
  ) => {
    const newHeaderItems = [...headerItems];
    newHeaderItems[index] = {
      ...newHeaderItems[index],
      headerName,
      headerValue,
    };
    setHeaderItems(newHeaderItems);

    if (headerName && index === headerItems.length - 1) {
      newHeaderItems.push({
        headerName: "",
        headerValue: "",
        isChecked: false,
      });
      setHeaderItems(newHeaderItems);
    }
  };

  const handleCheck = (index: number, isChecked: boolean) => {
    const newHeaderItems = [...headerItems];
    newHeaderItems[index] = { ...newHeaderItems[index], isChecked };

    setHeaderItems(newHeaderItems);

    if (!isChecked && headerItems.length > 3) {
      console.log(headerItems);
      // Remove the last item by slicing off the last element
      removeHeader();
    } else if (isChecked && index === headerItems.length - 1) {
      // Add a new item if the current item is checked and it is the last item
      newHeaderItems.push({
        headerName: "",
        headerValue: "",
        isChecked: false,
      });
      setHeaderItems(newHeaderItems);
    }
  };

  const handleDelete = () => {
    if (headerItems.length > 3) {
      removeHeader();
    }
  };

  return (
    <div className="p-4 w-full">
      {headerItems.map((item, index) => (
        <HeaderItem
          key={index}
          headerName={item.headerName}
          headerValue={item.headerValue}
          isChecked={item.isChecked}
          onChange={(headerName: string, headerValue: string) =>
            handleChange(index, headerName, headerValue)
          }
          onCheck={(isChecked: boolean) => handleCheck(index, isChecked)}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

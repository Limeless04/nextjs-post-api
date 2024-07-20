"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import TabMenu from "./TabMenu";
const GateawayForm = () => {
  return (
    <form className="flex flex-col space-x-4 p-4 border rounded-lg w-1/2">
      <section className="flex flex-row space-x-4 p-4">
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Method</SelectLabel>
              <SelectItem value="ge">GET</SelectItem>
              <SelectItem value="post">POST</SelectItem>
              <SelectItem value="put">PUT</SelectItem>
              <SelectItem value="delete">DELETE</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input type="text" placeholder="Enter adress" />
        <Button>Send</Button>
      </section>

      <TabMenu />
    </form>
  );
};

export default GateawayForm;

"use client";

import React, { useCallback, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { State, fetchMethod } from "@/lib/action";
import { useFormState, useFormStatus } from "react-dom";
import { useFormStore } from "@/stores/useStateForm";
import TabMenu from "./TabMenu";

function SubmitButton() {
  const { pending } = useFormStatus();
  const { setLoading } = useFormStore((state) => ({
    setLoading: state.setLoading,
  }));

  useEffect(() => {
    setLoading(pending);
  }, [pending, setLoading]);
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Sending..." : "Send"}
    </Button>
  );
}

export default function Form() {
  const {
    method,
    querys,
    headers,
    body,
    setMethod,
    address,
    setAddress,
    setMessage,
    setData,
    setResponseDetail,
  } = useFormStore((state) => ({
    method: state.method,
    querys: state.querys,
    headers: state.headers,
    body: state.body,
    setMethod: state.setMethod,
    address: state.address,
    setAddress: state.setAddress,
    setMessage: state.setMessage,
    setData: state.setData,
    setResponseDetail: state.setResponseDetail,
  }));

  const initialState: State = {
    method,
    address,
    querys,
    headers,
    body,
    message: null,
    errors: null,
    data: null,
  };

  const [state, formAction] = useFormState(fetchMethod, initialState);

  useEffect(() => {
    if (state.message) {
      setMessage(state.message);
    }
    if (state.data) {
      setData(state.data);
    }
    if (state.status && state.size && state.time) {
      const responseDetail = {
        status: state.status,
        size: state.size,
        time: state.time,
      };
      setResponseDetail(responseDetail);
    }
  }, [state, setMessage, setData, setResponseDetail]);

  const handleSubmit = useCallback(
    (formData: FormData) => {
      formData.set("method", method);
      formData.set("address", address);
      formData.set("querys", JSON.stringify(querys));
      formData.set("headers", JSON.stringify(headers));
      formData.set("body", body);
      formAction(formData);
    },
    [formAction, method, address, querys, headers, body]
  );

  const handleMethodChange = (value: string) => {
    setMethod(value);
    // You can also handle validation or other logic here
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  return (
    <>
      <form
        className="flex flex-row space-x-4 p-4 border rounded-lg w-1/2"
        action={handleSubmit}
      >
        <div className="flex flex-col w-1/3">
          <Select onValueChange={(value) => handleMethodChange(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Method</SelectLabel>
                <SelectItem value="get">GET</SelectItem>
                <SelectItem value="post">POST</SelectItem>
                <SelectItem value="put">PUT</SelectItem>
                <SelectItem value="delete">DELETE</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {state.errors?.method &&
            state.errors.method.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>

        <div className="flex flex-col w-full">
          <Input
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={handleAddressChange}
          />
          {state.errors?.address && (
            <p className="mt-2 text-sm text-red-500">
              {state.errors.address[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <SubmitButton />
        </div>
      </form>
      <TabMenu />
    </>
  );
}

import { create } from 'zustand'
import { persist } from "zustand/middleware";
export type FormType = {
    method: string,
    address: string,
    message: string | null,
    data: any
}
export type FormStateAction = {
    setMethod: (value: string) => void;
    setAddress: (value: string) => void;
    setMessage: (value: string) => void;
    setData: (data: object[]) => void;
}

export type FormStore = FormType & FormStateAction



export const initialState = {
    method: "",
    address: "",
    message: null,
    data: [],
};


export const useFormStore = create<FormStore>()(persist((set) => ({
    ...initialState,
    setMethod: (method) => set({ method: method }),
    setAddress: (address) => set({ address: address }),
    setMessage: (newMessage) => set((state) => ({ ...state, message: newMessage })),
    setData: (newData) => set((state) => ({
        ...state, data: newData
    }))

}),
    {
        name: "formState"
    }
))
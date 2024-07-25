import { create } from 'zustand'
import { persist } from "zustand/middleware";
import { QueryItemType } from '@/components/main/QueryForm';
import { HeaderItemType } from '@/components/main/HeadersForm';


export type ResponseDetail = {
    status: number | undefined;
    size: string | number | undefined;
    time: string | number | undefined;
}
export type FormType = {
    method: string,
    address: string,
    message: string | null,
    data: any,
    querys: QueryItemType[],
    headers: HeaderItemType[],
    body: string,
    loading: boolean,
    responseDetail: ResponseDetail

}
export type FormStateAction = {
    setMethod: (value: string) => void;
    setAddress: (value: string) => void;
    setMessage: (value: string) => void;
    setData: (data: object[]) => void;
    setQuery: (query: QueryItemType[]) => void;
    setHeaders: (header: HeaderItemType[]) => void;
    setBody: (value: string) => void;
    removeHeader: () => void;
    removeQuery: () => void;
    setLoading: (value: boolean) => void;
    setResponseDetail: (newResponse: ResponseDetail) => void
}

export type FormStore = FormType & FormStateAction



export const initialState = {
    method: "",
    address: "",
    message: null,
    data: [],
    querys: [
        {
            queryName: "",
            queryValue: "",
            isChecked: false,
        },
    ],
    headers: [
        {
            headerName: "Accept",
            headerValue: "*/*",
            isChecked: true,
        },
        {
            headerName: "User-Agent",
            headerValue:
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
            isChecked: true,
        },
        {
            headerName: "",
            headerValue: "",
            isChecked: false,
        },
    ],
    body: "",
    loading: false,
    responseDetail: {
        size: 0,
        status: undefined,
        time: 0
    }
};


export const useFormStore = create<FormStore>()(persist((set, get) => ({
    ...initialState,
    setMethod: (method) => set({ method: method }),
    setAddress: (address) => set({ address: address }),
    setMessage: (newMessage) => set((state) => ({ ...state, message: newMessage })),
    setData: (newData) => set((state) => ({
        ...state, data: newData
    })),
    setQuery: (newQuery) => set(state => (
        {
            ...state,
            querys: newQuery
        }
    )),
    setHeaders: (newHeader) => set(state => ({
        ...state,
        headers: newHeader
    })),
    removeHeader: () => set(state => ({
        ...state,
        headers: get().headers.slice(0, -1)
    })),
    removeQuery: () => set(state => ({
        ...state,
        querys: get().querys.slice(0, -1)
    })),
    setBody: (value) => set({
        body: value
    }),
    setLoading: (value) => set({
        loading: value
    }),
    setResponseDetail: (newVal) => set(state => ({
        ...state,
        responseDetail: newVal
    })),
}),
    {
        name: "formState"
    }
))
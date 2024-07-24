"use server"

import { z } from 'zod'
// import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios"
// import { error } from 'console';
const formSchema = z.object({
    method: z.enum(["get", "post", "put", "delete"], {
        invalid_type_error: "Please select an method",
    }),
    address: z.string().url(),
    query:
        z.object({
            parameter: z.string(),
            value: z.string(),
        }).optional(),
    headers:
        z.object({
            parameter: z.string(),
            value: z.string(),
        }).optional(),
    body: z.string().optional(),
});

export type State = {
    data?: any | null;
    errors?: {
        method?: string[];
        address?: string[];
        error?: string[]
    } | null;
    message?: string | null;
    method?: string;
    address?: string;
};




export async function getMethod(prevState: State, formData: FormData): Promise<State> {
    const rawFormData = {
        method: formData.get('method'),
        address: formData.get('address')
    };
    console.log(rawFormData)

    const validateData = formSchema.safeParse(rawFormData)

    if (!validateData.success) {
        return {
            ...prevState,
            data: null,
            errors: validateData.error.flatten().fieldErrors,
            message: 'Invalid input. Please check your entries.',
        };
    }

    const { method, address } = validateData.data;

    try {
        const response = await fetch(address, { method });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return {
            data,
            message: "Success",
        };
    } catch (error) {
        return {
            ...prevState,
            message: "Something went wrong!",
            errors: { error: [(error as Error).message] },
            data: null
        };
    }

}

import { z } from 'zod'
import { QueryItemType } from '@/components/main/QueryForm';
import { HeaderItemType } from "@/components/main/HeadersForm"
// import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios"
// import { error } from 'console';
const formSchema = z.object({
    method: z.enum(["get", "post", "put", "delete"], {
        invalid_type_error: "Please select an method",
    }),
    address: z.string().url(),
    querys:
        z.string(),
    headers:
        z.string(),
    body: z.string(),
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
    querys?: QueryItemType[];
    headers?: HeaderItemType[];
    body?: string;
    status?: number | undefined;
    size?: string | number | undefined;
    time?: string | number | undefined;
};




export async function fetchMethod(prevState: State, formData: FormData): Promise<State> {
    const rawFormData = Object.fromEntries(formData)

    const validateData = formSchema.safeParse(rawFormData)
    if (!validateData.success) {
        console.error("Validation failed:", validateData.error);
        return {
            ...prevState,
            data: null,
            errors: validateData.error.flatten().fieldErrors,
            message: 'Invalid input. Please check your entries.',
            status: undefined,
            size: undefined,
            time: undefined,
        };
    }

    const { method, address, querys, headers, body } = validateData.data;
    const objQuerys: QueryItemType[] = JSON.parse(querys)
    const objHeaders: HeaderItemType[] = JSON.parse(headers)
    const cleanedQueries = objQuerys.filter(query => (query.queryName !== '' || query.queryValue !== '') && query.isChecked);
    // For headers
    const cleanedHeaders = objHeaders.filter(header => (header.headerName !== '' || header.headerValue !== '') && header.isChecked);

    const queryMap = new Map(cleanedQueries.map(query => [query.queryName, query.queryValue]));
    const headerMap = new Map(cleanedHeaders.map(header => [header.headerName,
    header.headerValue]));


    const url = new URL(address);
    queryMap.forEach((value, key) => {
        url.searchParams.append(key, value);
    });

    // Construct the headers object
    const headersOpt = Object.fromEntries(headerMap);
    try {

        const startTime = Date.now();

        const response = await fetch(url.toString(), {
            method: method,
            headers: headersOpt,
            body: method.toUpperCase() !== 'GET' ? body : undefined
        });
        const endTime = Date.now();
        const timeElapsed = endTime - startTime;
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentLength = response.headers.get('Content-Length');
        const data = await response.json();
        const size = contentLength ? parseInt(contentLength, 10) : 'unknown';
        return {
            data,
            message: "Success",
            status: response.status,
            size: size,
            time: timeElapsed,
        };
    } catch (error) {
        return {
            ...prevState,
            message: "Something went wrong!",
            errors: { error: [(error as Error).message] },
            data: null,
            status: error instanceof Error && error.message.includes('status')
                ? parseInt(error.message.split('status: ')[1], 10)
                : undefined,
            size: undefined,
            time: undefined,
        };
    }

}
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const openAiCoreApi = createApi({
    reducerPath: 'openAiCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://open-ai-codex-5pom.onrender.com/',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getTest: builder.query({
            query: () => '/',
        }),
        postAiCore: builder.mutation({
            query: (body) => {
                return {
                    url: '/',
                    method: 'POST',
                    body 
                }
            }
        }),
    }),
});

export const {
    useGetTestQuery,
    usePostAiCoreMutation
} = openAiCoreApi;


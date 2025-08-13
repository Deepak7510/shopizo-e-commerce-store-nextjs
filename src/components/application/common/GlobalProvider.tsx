"use client"
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { Provider } from 'react-redux'
import React, { Suspense } from 'react'
import { store } from '@/redux/store'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const GlobalProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {

    return (<QueryClientProvider client={queryClient} >
        <Provider store={store}>
            {children}
        </Provider>
        <Suspense fallback={null}>
            <ReactQueryDevtools initialIsOpen={false} />
        </Suspense>
    </QueryClientProvider>)



}

export default GlobalProvider

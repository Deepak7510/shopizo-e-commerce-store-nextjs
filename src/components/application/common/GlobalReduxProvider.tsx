"use client"

import { Provider } from 'react-redux'
import React from 'react'
import { store } from '@/redux/store'
const GlobalReduxProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return <Provider store={store}>
        {children}
    </Provider>
}

export default GlobalReduxProvider

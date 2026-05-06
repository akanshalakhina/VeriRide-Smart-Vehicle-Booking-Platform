'use client'
import React, { ReactNode } from 'react'
// @ts-ignore: ignore missing react-redux module/type declarations
import { Provider } from 'react-redux'
import { store } from './store'

const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
        {children}

    </Provider>
        
      
    
  )
}

export default ReduxProvider


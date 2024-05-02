import { configureStore } from '@reduxjs/toolkit'
import commonReducer from './common'

export const store = configureStore({
    reducer: {
        common: commonReducer,
    },
})
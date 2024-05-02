import { createSlice } from "@reduxjs/toolkit";

const initialState: {
    testValue?:string
} = {
    testValue: ''
}

export const common = createSlice({
    name: "common",
    initialState,
    reducers: {
        setTestValue: (state, action) => {
            state.testValue = action.payload;
        },
    }
})

export const {
    setTestValue,
} = common.actions

export default common.reducer
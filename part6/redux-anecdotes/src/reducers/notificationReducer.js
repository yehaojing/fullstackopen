import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: 'This is a notification.',
    reducers: {
        setNotification(action, state) {
            return action.payload
        }
    },
})

export default notificationSlice.reducer
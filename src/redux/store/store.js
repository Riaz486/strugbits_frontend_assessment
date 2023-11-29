import { configureStore } from "@reduxjs/toolkit";
import user from "../slice/UserSlice";

const store = configureStore({
    reducer: {
        userData: user.reducer,
    },
});

export default store;
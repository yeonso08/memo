import { configureStore } from "@reduxjs/toolkit";
import memos from "../modules/memo";
const store = configureStore({
    reducer: {
        memos: memos,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
    devTools: true,
});

export default store
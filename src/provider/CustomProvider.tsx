"use client"

import { store } from "@/redux/store";
import { Provider } from "react-redux";

const CustomProvider = ({ session, children }: { session:any, children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <div>
                
                <main style={{ minHeight: '100vh' }}>
                    {children}
                </main>

              

            </div>
        </Provider>
    );
}

export default CustomProvider;
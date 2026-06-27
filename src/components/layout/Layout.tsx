import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { observer } from "mobx-react-lite";
import GlobalMessageStore from "../../stores/GlobalMessageStore";
import GlobalMessageDisplay from "../base/GlobalMessageDisplay";
import RefreshToken from "../RefreshToken";
import AuthenticationStore from "../../stores/AuthenticationStore";
import { useEffect } from "react";

export default observer(function Layout() {
    useEffect(() => {
        AuthenticationStore.getCurrentState();
    }, []);
    
    return (
        <div className="flex flex-col min-h-screen primary-fg-color">
            <Header />
            <div className="flex-1 flex flex-row">
                <Sidebar />
                <main className="flex-1 container mx-auto px-4 py-8">
                    <Outlet />
                </main>
            </div>
            {GlobalMessageStore.globalMessage && (
                <GlobalMessageDisplay {...GlobalMessageStore.globalMessage} isExiting={GlobalMessageStore.isExiting} />
            )}
            {AuthenticationStore.authState && <RefreshToken />}
        </div>
    );
});
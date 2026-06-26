import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen primary-fg-color">
            <Header />
            <div className="flex-1 flex flex-row">
                <Sidebar />
                <main className="flex-1 container mx-auto px-4 py-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
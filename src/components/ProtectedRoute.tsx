import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import AuthenticationStore from "../stores/AuthenticationStore";
import { Navigate, Outlet } from "react-router-dom";

export default observer(function ProtectedRoute() {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setLoading(true);
        const checkAuth = async () => {
            try {
                await AuthenticationStore.getCurrentState();
                setIsAdmin(AuthenticationStore.authState != undefined && AuthenticationStore.authState?.isAdmin);
            } catch (error: unknown) {
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        }
        checkAuth();
    }, []);

    if (loading) {
        return (
            <p className="text-center">Loading...</p>
        );
    }

    return isAdmin ? <Outlet /> : <Navigate to="/" replace />
});
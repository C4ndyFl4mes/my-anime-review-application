import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import SearchPage from "./pages/SearchPage";
import BrowsePage from "./pages/BrowsePage";
import InspectionPage from "./pages/InspectionPage";
import ReviewsPage from "./pages/ReviewsPage";
import ProfilePage from "./pages/ProfilePage";
import AnimeListPage from "./pages/AnimeListPage";
import FeedPage from "./pages/FeedPage";
import PanelPage from "./pages/PanelPage";
import UserReportsPage from "./pages/UserReportsPage";
import ReviewReportsPage from "./pages/ReviewReportsPage";
import BugReportsPage from "./pages/BugReportsPage";
import AuthenticationPage from "./pages/AuthenticationPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <SearchPage />
            },
            {
                path: "/browse",
                element: <BrowsePage />
            },
            {
                path: "/browse/:malid",
                element: <InspectionPage />
            },
            {
                path: "/browse/:malid/reviews/:page",
                element: <ReviewsPage />
            },
            {
                path: "/user/:userid/profile",
                element: <ProfilePage />
            },
            {
                path: "/user/:userid/list",
                element: <AnimeListPage />
            },
            {
                path: "/user/:userid/reviews/:page",
                element: <ReviewsPage />
            },
            {
                path: "/feed",
                element: <FeedPage />
            },
            {
                path: "/account",
                element: <AuthenticationPage />
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/admin/panel",
                        element: <PanelPage />
                    },
                    {
                        path: "/admin/user-reports",
                        element: <UserReportsPage />
                    },
                    {
                        path: "/admin/review-reports",
                        element: <ReviewReportsPage />
                    },
                    {
                        path: "/admin/bug-reports",
                        element: <BugReportsPage />
                    }
                ]
            }
        ]
    }
]);
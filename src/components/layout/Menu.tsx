import { NavLink } from "react-router-dom";
import type { IAuthRes } from "../../interfaces/responses/IAuthRes";
import panel_icon from "../../assets/icons/panel.svg";
import profile_icon from "../../assets/icons/profile.svg";
import signin_icon from "../../assets/icons/signin.svg";
import browse_icon from "../../assets/icons/browse.svg";
import feed_icon from "../../assets/icons/feed.svg";

export default function Menu({ authState }: { authState: IAuthRes | null })
{
    return(
        <aside className="w-screen flex flex-row fixed bottom-0 md:relative md:flex-col md:w-50 secondary-bg-color">
            <ul className="flex justify-evenly md:flex-col w-full md:px-2">
                {authState && authState.isAdmin && (
                    <li className="flex-1 flex items-center justify-center md:justify-start">
                        <NavLink to="/admin/panel" className="w-full h-full flex items-center justify-center md:justify-start md:p-2 py-2 menu-bg-color hover:brightness-125 duration-200">
                            <img src={panel_icon} alt="Panel" width={32} height={32} className="w-10 h-10 md:w-8 md:h-8" />
                            <span className="ml-2 hidden md:inline">Panel</span>
                        </NavLink>
                    </li>
                )}
                {authState ? (
                    <li className="flex-1 flex items-center justify-center md:justify-start">
                        <NavLink to={`/user/${authState.userId}/profile`} className="w-full h-full flex items-center justify-center md:justify-start md:p-2 py-2 menu-bg-color hover:brightness-125 duration-200">
                            <img src={profile_icon} alt="Profile" width={32} height={32} className="w-10 h-10 md:w-8 md:h-8" />
                            <span className="ml-2 hidden md:inline">Profile</span>
                        </NavLink>
                    </li>
                ) : (
                    <li className="flex-1 flex items-center justify-center md:justify-start">
                        <NavLink to="/account" className="w-full h-full flex items-center justify-center md:justify-start md:p-2 py-2 menu-bg-color hover:brightness-125 duration-200">
                            <img src={signin_icon} alt="Sign In" width={32} height={32} className="w-10 h-10 md:w-8 md:h-8" />
                            <span className="ml-2 hidden md:inline">Sign in</span>
                        </NavLink>
                    </li>
                )}
                <li className="flex-1 flex items-center justify-center md:justify-start">
                    <NavLink to="/" className="w-full h-full flex items-center justify-center md:justify-start md:p-2 py-2 menu-bg-color hover:brightness-125 duration-200">
                        <img src={browse_icon} alt="Browse" width={32} height={32} className="w-10 h-10 md:w-8 md:h-8" />
                        <span className="ml-2 hidden md:inline">Browse</span>
                    </NavLink>
                </li>
                <li className="flex-1 flex items-center justify-center md:justify-start">
                    <NavLink to="/feed" className="w-full h-full flex items-center justify-center md:justify-start md:p-2 py-2 menu-bg-color hover:brightness-125 duration-200">
                        <img src={feed_icon} alt="Feed" width={32} height={32} className="w-10 h-10 md:w-8 md:h-8" />
                        <span className="ml-2 hidden md:inline">Feed</span>
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
}
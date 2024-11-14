import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Handshake, User, LogOut, Menu, Target, Flame } from "lucide-react"; // Use Flame icon for streak

export const Header = () => {
    const { authUser, logout } = useAuthStore();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [streak, setStreak] = useState(authUser?.streakCount || 0); // Initialize streak from authUser
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (authUser) {
            setStreak(authUser.streakCount || 0); // Update streak when authUser changes
        }
    }, [authUser]);

    return (
        <header className='bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 shadow-lg'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center py-4'>
                    <div className='flex items-center'>
                        <Link to='/' className='flex items-center space-x-2'>
                            <Handshake className='w-8 h-8 text-white' />
                            <span className='text-2xl font-bold text-white hidden sm:inline'>GymBuddy</span>
                        </Link>
                    </div>

                    <div className='hidden md:flex items-center space-x-4'>
                        {/* Streak Counter */}
                        <div className='flex items-center bg-white text-orange-600 px-4 py-2 rounded-full font-medium'>
                            <Flame className='mr-2' size={20} />
                            Streak: {streak} Days
                        </div>

                        {/* Program Planner Button */}
                        <Link
                            to='/program-planner'
                            className='flex items-center bg-white text-orange-600 px-4 py-2 rounded-full font-medium hover:bg-orange-100 transition duration-150 ease-in-out'
                        >
                            <Target className='mr-2' size={20} />
                            Program Planner
                        </Link>

                        {authUser ? (
                            <div className='relative' ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className='flex items-center space-x-2 focus:outline-none'
                                >
                                    <img
                                        src={authUser.image || "/avatar.png"}
                                        className='h-10 w-10 object-cover rounded-full border-2 border-white'
                                        alt='User image'
                                    />
                                    <span className='text-white font-medium'>{authUser.name}</span>
                                </button>
                                {dropdownOpen && (
                                    <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10'>
                                        <Link
                                            to='/profile'
                                            className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center'
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            <User className='mr-2' size={16} />
                                            Profile
                                        </Link>
                                        <button
                                            onClick={logout}
                                            className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center'
                                        >
                                            <LogOut className='mr-2' size={16} />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link
                                    to='/auth'
                                    className='text-white hover:text-orange-200 transition duration-150 ease-in-out'
                                >
                                    Login
                                </Link>
                                <Link
                                    to='/auth'
                                    className='bg-white text-orange-600 px-4 py-2 rounded-full font-medium hover:bg-orange-100 transition duration-150 ease-in-out'
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className='md:hidden'>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className='text-white focus:outline-none'
                        >
                            <Menu className='size-6' />
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE MENU */}
            {mobileMenuOpen && (
                <div className='md:hidden bg-orange-600'>
                    {/* Centered Streak Counter */}
                    <div className='flex items-center justify-center py-4'>
                        <div className='flex items-center bg-white text-orange-600 px-4 py-2 rounded-full font-medium'>
                            <Flame className='mr-2' size={20} />
                            Streak: {streak} Days
                        </div>
                    </div>

                    {/* Mobile Links */}
                    <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
                        {authUser ? (
                            <>
                                <Link
                                    to='/profile'
                                    className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-orange-700'
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Profile
                                </Link>
                                <Link
                                    to='/program-planner'
                                    className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-orange-700'
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Program Planner
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className='block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-orange-700'
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to='/auth'
                                    className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-orange-700'
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    to='/auth'
                                    className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-orange-700'
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};
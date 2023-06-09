import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { Dropdown } from 'antd';

import { logOut, setRedirectOfLogin } from 'redux/slice/authSlice';
import { removeCart } from 'redux/slice/cartSlice';

function TopHeader() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const user = useSelector(state => state.auth.currentUser);
    const isLogin = useSelector(state => state.auth.isLogin);
    console.log(user);

    const handleLogout = () => {
        dispatch(logOut());
        dispatch(removeCart());
        dispatch(setRedirectOfLogin(null));

        navigate('/');
    };

    const goToLogin = () => {
        dispatch(setRedirectOfLogin(pathname));
        navigate('login');
    };

    const items = [
        {
            key: '1',
            label: <Link to="/user/account/profile">My account</Link>
        },
        {
            key: '2',
            label: <Link to="/user/order">Orders</Link>
        },
        {
            key: '3',
            label: <p onClick={handleLogout}>Log out</p>
        }
    ];

    return (
        <div className="bg-gray-200">
            <div className="container flex justify-end items-center h-9 text-xs">
                {/* <div className="hover:text-gray-500 px-3 border-r border-gray-500">
                    <Link to="/contact">Contact</Link>
                </div> */}
                {isLogin ? (
                    <Dropdown
                        menu={{ items }}
                        placement="bottom"
                        arrow
                        overlayStyle={{
                            minWidth: 160
                        }}
                    >
                        <div className="flex-center hover:cursor-pointer pl-3">
                            <span className="mr-2">Hi, {user?.fullname}</span>
                            <div className=" h-9 w-9 flex-center rounded-full hover:bg-gray-300">
                                {user.avatar ? (
                                    <img src={user.avatar.url} alt="avatar" className="w-6 h-6 rounded-full" />
                                ) : user.authAvatar ? (
                                    <img src={user.authAvatar} alt="avatar" className="w-6 h-6 rounded-full" />
                                ) : (
                                    <FiUser size={20} />
                                )}
                            </div>
                        </div>
                    </Dropdown>
                ) : (
                    <>
                        <div className="hover:text-gray-500 px-3 border-r border-gray-500">
                            <Link to="/register">Sign up</Link>
                        </div>
                        <div className="hover:text-gray-500 px-3 cursor-pointer">
                            <span onClick={goToLogin}>Sign in</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default TopHeader;

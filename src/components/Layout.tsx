import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer';
const Layout = () => {
    return (
        <div>
            <div>
                <Navbar/>
            </div>
            <div>
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const RootLayout = () => {
    return (
        <div>
            
            <div className="pt-10"></div>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;
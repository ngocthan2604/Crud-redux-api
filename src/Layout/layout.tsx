import { NavLink } from 'react-router-dom';
import styles from './layout.module.css';

function Layout() {
    return (
        <div>
            <header className={styles.header}>Welcome!</header>

            <nav className={styles.navbar}>
                <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to="/">
                    User List
                </NavLink>
                <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to="/add">
                    Add User
                </NavLink>
            </nav>
        </div>
    );
}

export default Layout;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth } from 'redux/auth/authSlice';
import { logoutUser } from 'redux/auth/authOperations';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from '../UserMenu/UserMenu.module.css'

export const UserMenu = () => {
    const { user, isLoggedIn } = useSelector(getAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogoutClick = () => {
        dispatch(logoutUser())
        navigate('/login')
    }

    const getClassName = ({isActive}) => {
    return isActive ? `${styles.link} ${styles.active}` : styles.link;
}

    return (
        <nav className={styles.navWrapper}>
            {isLoggedIn && <NavLink className={styles.link} to='/contacts'>Contacts</NavLink>}
            {isLoggedIn ?
                <div className={styles.userWrapper}>
                    <p className={styles.greeting}>{`Welcome, ${user.name}!`}</p>
                    <button className={styles.link} type='button' onClick={onLogoutClick}>Log Out</button>
                </div> :
                <div className={styles.menuWrapper}>
                    <NavLink className={getClassName} to='/register'>Sign Up</NavLink>
                    <NavLink className={getClassName} to='/login'>Log In</NavLink>
                </div>
            }
        </nav>
    )
}
import { useEffect, useState } from 'react';
import styles from '../pages.module.css';
import UserItem from './components/UserItem/userItem';
import { useDarkMode } from 'usehooks-ts';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { RootState } from '../../redux/store';
import { useAppSelector, useAppDispatch } from '../../redux/hook';
import { getUserListAction } from '../../redux/userSlice';
import { ApiStatus } from '../../redux/UserType';
import { TbLoader3 } from 'react-icons/tb';
import { VscError } from 'react-icons/vsc';

function ListUser() {
    const { isDarkMode, toggle } = useDarkMode();
    const dispatch = useAppDispatch();
    const { list, listStatus } = useAppSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(getUserListAction());
    }, []);

    console.log(listStatus);
    console.log(list);

    return (
        <div className={`${isDarkMode ? styles.dark : styles.light} ${styles.user}`}>
            <div className={styles.btndarkmode} onClick={toggle}>
                <span className={styles.iconselect}></span>
                <MdLightMode />
                <MdDarkMode />
            </div>
            <table className={styles.userlist}>
                <tr className={styles.useritem}>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>USER NAME</th>
                    <th>DESCRIPTION</th>
                    <th>ACTION</th>
                </tr>

                {listStatus === ApiStatus.loading && (
                    <div className={styles.load}>
                        <TbLoader3 />
                    </div>
                )}
                {listStatus === ApiStatus.error && (
                    <div className={styles.err}>
                        <VscError /> This is Error. You need to check API Config
                    </div>
                )}
                {listStatus === ApiStatus.ideal &&
                    list.map((user, index) => (
                        <UserItem
                            key={index}
                            id={user.id}
                            name={user.name}
                            username={user.username}
                            desc={user.email}
                        />
                    ))}
            </table>
        </div>
    );
}

export default ListUser;

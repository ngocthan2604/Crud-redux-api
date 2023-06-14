import { useEffect } from 'react';
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
    const { list, listStatus, deleteId } = useAppSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(getUserListAction());
    }, []);

    //handle delete UI
    useEffect(() => {
        const tableElement = document.querySelector<HTMLTableElement>('#userlist');
        const rowsToRemove = [];

        if (tableElement) {
            for (let i = 0; i < tableElement.rows.length; i++) {
                const row = tableElement.rows[i];
                const firstCell = row.cells[0];

                if (
                    deleteId !== null &&
                    firstCell.textContent &&
                    firstCell.textContent.trim() === deleteId.toString()
                ) {
                    rowsToRemove.push(row);
                }
            }
        }

        rowsToRemove.forEach((row) => row.remove());
    }, [deleteId]);

    return (
        <div className={`${isDarkMode ? styles.dark : styles.light} ${styles.user}`}>
            <div className={styles.btndarkmode} onClick={toggle}>
                <span className={styles.iconselect}></span>
                <MdLightMode />
                <MdDarkMode />
            </div>
            <table className={styles.userlist} id="userlist">
                <tr className={styles.useritem}>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>AGE</th>
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
                {listStatus === ApiStatus.success &&
                    list.map((user, index) => (
                        <UserItem
                            key={index}
                            id={user.id}
                            name={user.name}
                            age={user.age}
                            description={user.description}
                        />
                    ))}
            </table>
        </div>
    );
}

export default ListUser;

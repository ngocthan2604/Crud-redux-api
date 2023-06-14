import { useRef, useState } from 'react';
import styles from '../../../pages.module.css';
import UserDetail from '../UserDetail/userdetail';
import Overlay from '../Overlay/overlay';
import { MdDeleteForever } from 'react-icons/md';
import { useOnClickOutside } from 'usehooks-ts';
import { useDispatch } from 'react-redux';
import { deleteUserAction } from '../../../../redux/userSlice';
import UserEdit from '../UserEdit/userEdit';

interface userData {
    id: number;
    name: string;
    age: number;
    description: string;
}

function UserItem({ id, name, age, description }: userData) {
    const [userDetail, setUserDetail] = useState(false);
    const [userEdit, setUserEdit] = useState(false);
    const [remove, setRemove] = useState(false);
    const ref = useRef(null);
    const dispatch = useDispatch();

    function handleViewUserDetail() {
        setUserDetail(true);
    }

    function handleNoRemove(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        setRemove(false);
    }

    async function handleYesRemove(id: number, event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        await dispatch<any>(deleteUserAction(id));
        setRemove(false);
    }

    function handleClickOutSide() {
        setRemove(false);
    }

    useOnClickOutside(ref, handleClickOutSide);

    function handleEditUser() {
        setUserEdit(true);
    }

    return (
        <tr className={styles.useritem}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{age}</td>
            <td>{description}</td>
            <td>
                <button className={styles.actionbtn} onClick={handleViewUserDetail}>
                    View
                </button>
                <button className={styles.actionbtn} onClick={handleEditUser}>
                    Edit
                </button>
                <button className={styles.actionbtn} onClick={() => setRemove(true)}>
                    Delete
                    {remove && (
                        <div ref={ref} className={styles.formdelete}>
                            <p>
                                <MdDeleteForever />
                                Are you sure to delete this User?
                            </p>
                            <div>
                                <button className={styles.nodeletebtn} onClick={handleNoRemove}>
                                    No
                                </button>
                                <button className={styles.yesdeletebtn} onClick={(event) => handleYesRemove(id, event)}>
                                    Yes
                                </button>
                            </div>
                        </div>
                    )}
                </button>
            </td>
            {userDetail && <UserDetail id={id} name={name} age={age} description={description} />}
            {userDetail && <Overlay onRemove={() => setUserDetail(false)} />}
            {userEdit && <UserEdit />}
        </tr>
    );
}

export default UserItem;

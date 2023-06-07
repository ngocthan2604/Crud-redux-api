import styles from '../../../pages.module.css';

interface userData {
    id: number;
    name: string;
    username: string;
    desc: string;
}

function UserItem({ id, name, username, desc }: userData) {
    return (
        <tr className={styles.useritem}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{username}</td>
            <td>{desc}</td>
            <td>
                <button className={styles.actionbtn}>View</button>
                <button className={styles.actionbtn}>Edit</button>
                <button className={styles.actionbtn}>Delete</button>
            </td>
        </tr>
    );
}

export default UserItem;

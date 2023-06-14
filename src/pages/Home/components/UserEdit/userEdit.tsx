import styles from '../../../pages.module.css';

function UserEdit() {
    return (
        <div className={styles.useredit}>
            <form className={styles.usereditform}>
                <label htmlFor="name">Name :</label>
                <input className={styles.editname} />
                <label htmlFor="age"> Age :</label>
                <input className={styles.editage} />
                <label htmlFor="desc"> Description :</label>
                <input className={styles.editdesc} />
                <button className={styles.btnedit}>Update</button>
            </form>
        </div>
    );
}

export default UserEdit;

import styles from '../../../pages.module.css';

interface Detail {
    id: number;
    name: string;
    age: number;
    description: string;
}

function UserDetail({ id, name, age, description }: Detail) {
    return (
        <div className={styles.userdetail}>
            <h1>User Details</h1>
            <p>ID : {id}</p>
            <p>Name : {name}</p>
            <p>AGE : {age}</p>
            <p>DESCRIPTION : {description}</p>
        </div>
    );
}

export default UserDetail;

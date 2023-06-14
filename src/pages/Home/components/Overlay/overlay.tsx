import styles from '../../../pages.module.css';

function Overlay({ onRemove }: any) {
    return <div className={styles.overlay} onClick={onRemove}></div>;
}

export default Overlay;

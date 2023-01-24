import { PencilLine } from 'phosphor-react';
import { Avatar } from './Avatar';
import coverAvatarImg from '../assets/code.png';

import styles from './Sidebar.module.css';

export function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <img
                className={styles.cover}
                src={coverAvatarImg}
            />

            <div className={styles.profile}>
                <Avatar src="https://github.com/vanim77.png" />

                <strong>Giovanni Nunes</strong>
                <span>Web Developer</span>
            </div>

            <footer>
                <a href="#">
                    <PencilLine size={20}/>
                    Editar seu perfil
                </a>
            </footer>
        </aside>
    );
}

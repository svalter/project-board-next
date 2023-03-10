import { signIn, signOut, useSession } from 'next-auth/react';
import styles from './styles.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import Image from 'next/image';

export function SignInButton() {

    const { data: session } = useSession();

    return session ? (
        <button
            type="button"
            className={styles.singInButton}
        >
            <span className={styles.user}>
                <Image src={session.user.image} alt="Foto do Usuário"  width={35} height={35}/>
                Olá {session.user.name}
            </span>
            <FiLogOut color="#ededed" className={styles.closeIcon}   onClick={() => signOut()}/>
        </button>
    ) : (
        <button
            type="button"
            className={styles.singInButton}
            onClick={() => signIn('github')}
        >
            <FaGithub color="#FFB800" />
            Entrar com GitHub
        </button>
    )
}
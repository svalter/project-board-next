import { signIn, signOut, useSession } from 'next-auth/react';
import styles from './styles.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

export function SignInButton() {

    const { data: session } = useSession();

    return session ? (
        <button
            type="button"
            className={styles.singInButton}
            onClick={() => signOut()}
        >
            <img src={session.user.image} alt="Foto do Usuário" />
            Olá {session.user.name}
            <FiX color="#737380" className={styles.closeIcon} />
        </button>
    ) : (
        <button
            type="button"
            className={styles.singInButton}
            onClick={() => signIn('github')}
        >
            <FaGithub color="#FFB800" />
            Entrar com github
        </button>
    )
}
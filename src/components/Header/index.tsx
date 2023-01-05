import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { SignInButton } from '../SignInButton';
import logo from '../../../public/images/logo.svg'

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/">
                    <Image src={logo} alt="Logo" height={45} width={45}/>
                </Link>
                <nav>
                    <Link href="/">
                        Home
                    </Link>
                    <Link href="/board">
                        Meu board
                    </Link>
                </nav>
                <SignInButton />
            </div>
        </header>
    )
}
import styles from '../styles/styles.module.scss';
import Head from "next/head";
import Image from 'next/image';
import imgTool from '../../public/images/board-user.svg';

export default function Home() {
  return (
    <>
      <Head>
        <title>Board - Gerenciando suas tarefas</title>
      </Head>
      <main className={styles.contentContainer}>
        <Image src={imgTool} alt="Ferramenta board" priority/>
        <section className={styles.callToAction}>
          <h1>Uma excelente ferramenta para gerenciar seu dia a dia Escreva, planeje e organize-se ...</h1>
          <p>
            <span>100% Gratuita </span> e online
          </p>
        </section>
      </main>
    </>
  )
}

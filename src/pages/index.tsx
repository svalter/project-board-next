import Head from "next/head";
import styles from '../styles/styles.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Board - Gerenciando suas tarefas</title>
      </Head>
      <main className={styles.contentContainer}>
        <img src="/images/board-user.svg" alt="Ferramenta board"/>
        <section className={styles.callToAction}>
          <h1>Uma excelente ferramenta para gerenciar seu dia a dia Escreva, planeje e organize-se ...</h1>
          <p>
            <span>100% Gratuita </span> e online
          </p>
        </section>

        <section className={styles.donaters}>
          <img src='https://sujeitoprogramador.com/steve.png' alt="Usuário 1" />          
        </section>
      </main>
    </>
  )
}

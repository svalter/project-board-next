import Head from 'next/head';
import { FiPlus, FiCalendar, FiEdit2, FiTrash } from 'react-icons/fi';
import { GetServerSideProps } from 'next';
import styles from './styles.module.scss';
import { getSession } from 'next-auth/react';
import { useState, FormEvent } from 'react';
import firebase from '../../services/firebaseConnection'

interface BoardProps {
    user: {
        id: string;
        nome: string;
    }
}

export default function Board({ user }: BoardProps) {

    const [input, setInput] = useState('');

    async function handleAddTask(e: FormEvent) {
        e.preventDefault();

        if (input === '') {
            alert('Preencha alguma tarefa!')
            return
        }

        await firebase.firestore().collection('tarefas')
            .add({
                created: new Date(),
                tarefa: input,
                userId: user.id,
                name: user.nome
            })
            .then((doc) => {
                console.log('Cadastrado com sucesso', doc)
            })
            .catch((err) => {
                console.log('erro ao cadastrar: ', err)
            })
    }

    return (
        <>
            <Head>
                <title> Minhas tarefas - Board</title>
            </Head>
            <main className={styles.container}>
                <form onSubmit={handleAddTask}>
                    <input
                        type="text"
                        placeholder="Digite sua tarefa..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button type="submit">
                        <FiPlus size={25} color={"17181f"} />
                    </button>
                </form>
                <h1> Voce tem 2 tarefas!</h1>
                <section>
                    <article className={styles.taskList}>
                        <p>Texto</p>
                        <div className={styles.actions}>
                            <div>
                                <div>
                                    <FiCalendar size={20} color="#FFB800" />
                                    <time>17 de Julho 2021</time>
                                </div>
                                <button>
                                    <FiEdit2 size={20} color="#FFFFFF" />
                                    <span>Editar</span>
                                </button>
                            </div>
                            <button>
                                <FiTrash size={20} color="#FF3636" />
                                <span>Excluir</span>
                            </button>
                        </div>
                    </article>
                </section>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session = await getSession({ req });

    if (!session?.id) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const user = {
        nome: session?.user.name,
        id: session?.id,
    }

    return {
        props: {
            user
        }
    }
}
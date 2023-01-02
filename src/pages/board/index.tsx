import Head from 'next/head';
import styles from './styles.module.scss';
import firebase from '../../services/firebaseConnection';
import Link from 'next/link';
import { FiPlus, FiCalendar, FiEdit2, FiTrash } from 'react-icons/fi';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useState, FormEvent } from 'react';
import { format } from 'date-fns';

type TaskList = {
    id: string;
    created: string | Date;
    createdFormated?: string;
    tarefa: string;
    userId: string;
    nome: string;

}

interface BoardProps {
    user: {
        id: string;
        nome: string;
    }
    data: string;
}

export default function Board({ user, data }: BoardProps) {

    const [input, setInput] = useState('');
    const [taskList, setTaskList] = useState<TaskList[]>(JSON.parse(data));

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
                let data = {
                    id: doc.id,
                    created: new Date(),
                    createdFormated: format(new Date(), 'dd MMMM yyyy'),
                    tarefa: input,
                    nome: user.nome
                }

                setTaskList([...taskList, data]);
                setInput('');
            })
            .catch((err) => {
                console.log('erro ao cadastrar: ', err)
            })
    }

    async function handleDelete(id: string) {
        await firebase.firestore()
            .collection('tarefas')
            .doc(id)
            .delete()
            .then(() => {
                console.log('Tarefa deletada com sucesso');
                let taskDeleted = taskList.filter(item => {
                    return (item.id !== id)
                })
                setTaskList(taskDeleted);
            })
            .catch((err) => {
                console.log('Erro ao deletar', err);
            });
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
                <h1> Você tem {taskList.length} {taskList.length == 1 ? 'Tarefa' : 'Tarefas'}!</h1>
                <section>
                    {taskList.map(task => (
                        <article className={styles.taskList} key={task.id}>
                            <Link href={`/board/${task.id}`}>
                                <p>{task.tarefa}</p>
                            </Link>

                            <div className={styles.actions}>
                                <div>
                                    <div>
                                        <FiCalendar size={20} color="#FFB800" />
                                        <time>{task.createdFormated}</time>
                                    </div>
                                    <button>
                                        <FiEdit2 size={20} color="#FFFFFF" />
                                        <span>Editar</span>
                                    </button>
                                </div>
                                <button onClick={() => handleDelete(task.id)}>
                                    <FiTrash size={20} color="#FF3636" />
                                    <span>Excluir</span>
                                </button>
                            </div>
                        </article>
                    ))}
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

    const tasks = await firebase.firestore()
        .collection('tarefas')
        .where('userId', '==', session?.id)
        .orderBy('created', 'asc')
        .get();

    const data = JSON.stringify(tasks.docs.map(item => {
        return {
            id: item.id,
            createdFormated: format(item.data().created.toDate(), 'dd MMMM yyyy'),
            ...item.data()
        }
    }))

    const user = {
        nome: session?.user.name,
        id: session?.id,
    }

    return {
        props: {
            user,
            data
        }
    }
}
import Head from 'next/head';
import styles from './styles.module.scss';
import firebase from '../../services/firebaseConnection';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiX } from 'react-icons/fi';
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
    const [taskUpdate, setTaskUpdate] = useState<TaskList | null>();

    async function handleAddTask(e: FormEvent) {
        e.preventDefault();

        if (input === '' || input === null || input === undefined) {
            toast.error("Insira um texto");
            return
        }

        if (taskUpdate) {
            await firebase.firestore()
                .collection('tarefas')
                .doc(taskUpdate.id)
                .update({
                    tarefa: input
                })
                .then(() => {
                    let data = taskList;
                    let taskIndex = taskList.findIndex(item => item.id === taskUpdate.id)
                    data[taskIndex].tarefa = input;

                    setTaskList(data);
                    setTaskUpdate(null);
                    setInput('');
                    toast.info("Tarefa editada");
                })
            return;
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
                toast.success("Nova tarefa cadastrada");
            })
            .catch((err) => {
                toast.error("Erro ao cadastrar nova tarefa");
            })
    }

    async function handleDelete(id: string) {
        await firebase.firestore()
            .collection('tarefas')
            .doc(id)
            .delete()
            .then(() => {
                let taskDeleted = taskList.filter(item => {
                    return (item.id !== id)
                })
                setTaskList(taskDeleted);
                setTaskUpdate(null);
                setInput('');
                toast.info("Tarefa deletada");
            })
            .catch((err) => {
                toast.error("Erro ao deletar tarefa");
            });
    }

    function handleUpdateTask(task: TaskList) {
        setTaskUpdate(task)
        setInput(task.tarefa);
    }

    function handleCancelUpdate() {
        setInput('');
        setTaskUpdate(null);
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
                    {taskUpdate ? (
                        <button type="submit" className={styles.buttonUpdate}>
                            <FiEdit2 size={20} color="#FFFFFF" />
                        </button>
                    ) : (
                        <button type="submit">
                            <FiPlus size={25} color={"#FFFFFF"} />
                        </button>
                    )
                    }
                </form>
                {taskUpdate && (
                    <span className={styles.warnText}>
                        <button onClick={handleCancelUpdate}>
                            <FiX size={18} color="#FF3636" />
                        </button>
                        Voc?? est?? editando uma tarefa!
                    </span>
                )
                }
                <h3> Voc?? tem {taskList.length} {taskList.length == 1 ? 'Tarefa' : 'Tarefas'}!</h3>
                <section>
                    {taskList.map(task => (
                        <article className={styles.taskList} key={task.id}>
                            <div className={styles.actions}>
                                <div>
                                    <div>
                                        <FiCalendar size={16} color="#FFB800" />
                                        <time>{task.createdFormated}</time>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={() => handleUpdateTask(task)}>
                                        <FiEdit2 size={14} color="#ffffff" />
                                    </button>
                                    <button onClick={() => handleDelete(task.id)}>
                                        <FiTrash size={14} color="#fadbdb" />
                                    </button>
                                </div>
                            </div>
                            <Link href={`/board/${task.id}`}>
                                <p>DESCRI????O: <br /><br /> {task.tarefa}</p>
                            </Link>
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
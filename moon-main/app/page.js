import { Inter } from 'next/font/google';
import s from './page.module.scss';
import Nav from '@/components/nav/Nav';
import Calendar from '@/components/cal/Calendar';
import TodoList from '@/components/todo/TodoList';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <div className={s.main}>
            <Nav />
            <TodoList />
            <Calendar />
        </div>
    );
}

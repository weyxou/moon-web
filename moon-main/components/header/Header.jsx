import React from 'react';
import s from './Header.module.scss';
import { IoIosSearch } from 'react-icons/io';
import Link from 'next/link';

const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.task}>
                <h1> Task Manager</h1>
            </div>
            <div className={s.input}>
                <input type="text" name="" id="" />
                <IoIosSearch color="#6900b5" />
            </div>
            <div className={s.btn}>
                <Link className={s.link} href="/register">
                    Register
                </Link>
                <Link className={s.link} href="/login">
                    Login
                </Link>
            </div>
        </header>
    );
};

export default Header;

import React from 'react';
import s from './nav.module.scss';
import { WiMoonWaxingCrescent1 } from 'react-icons/wi';

const Nav = () => {
    return (
        <div className={s.nav}>
            <div className={s.start}>
                <h1>
                    Moon <WiMoonWaxingCrescent1 />{' '}
                </h1>
            </div>
            <div className={s.center}>
                <p>Dashboard</p>
                <p>Tasks</p>
                <p>Completed</p>
                <p>Schedule</p>
            </div>
            <div className={s.end}>
                <p>Settings</p>
                <p>Information</p>
            </div>
        </div>
    );
};

export default Nav;

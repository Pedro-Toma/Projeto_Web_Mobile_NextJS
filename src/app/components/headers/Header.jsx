"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from './header.module.css';

const Header = () => {

    const pathname = usePathname();
    const router = useRouter();

    const [termoBusca, setTermoBusca] = useState("");

    const dispararBusca = (e) => {
        e.preventDefault();
        if (termoBusca.trim() === '') {
            router.push('/');
        } else {
            router.push(`/?busca=${encodeURIComponent(termoBusca.trim().toLowerCase())}`);
        }
    };

    return (
        <header className={styles.header}>
            <h3 className={styles.titulo}> Lista Barata </h3>
            <h3 className={styles.titulo}> São Paulo </h3>
            {pathname === '/' && (
                <form id="Pesquisa" className={styles['pesquisa-desktop']} onSubmit={dispararBusca}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={styles['search-icon']}/>
                    <input type="text" placeholder="Pesquisar..." className={styles['busca']} onChange={(e) => setTermoBusca(e.target.value)}/>
                </form>
            )}
        </header>
    );
};

export default Header;
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './pesquisaMobile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const PesquisaMobile = ({ termoBusca }) => {

    const [buscaMobile, setBuscaMobile] = useState(termoBusca);
    const router = useRouter();
    
    const dispararBuscaMobile = (e) => {
        e.preventDefault();
        if (buscaMobile.trim() === '') {
            router.push('/');
        } else {
            router.push(`/?busca=${encodeURIComponent(buscaMobile.trim().toLowerCase())}`);
        }
    };

    useEffect(() => {
        setBuscaMobile(termoBusca);
    }, [termoBusca]);

    return (
        <form id="Pesquisa-Mobile" className={styles['pesquisa-mobile']} onSubmit={dispararBuscaMobile}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className={styles['search-icon-mobile']}/>
            <input type="text" placeholder="Pesquisar..." className={styles['busca-mobile']} onChange={(e) => setBuscaMobile(e.target.value)}/>
        </form>
    );
};

export default PesquisaMobile;
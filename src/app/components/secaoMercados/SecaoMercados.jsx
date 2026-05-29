"use client";

import Link from 'next/link';
import styles from './secaoMercados.module.css';
import CardMercado from '../cardMercado/CardMercado';

const SecaoMercados = ({ mercados }) => {

    return (
        <>
            <article className={styles.titulo}>Mercados</article>
            <section className={styles.mercados}>
                { mercados.length === 0 ? (
                    <p>Nenhum mercado encontrado.</p>
                ) : ( 
                    mercados.map(mercado => (
                    <Link href={`/mercado/${mercado.id}`} key={mercado.endereco} className={styles['link-mercado']}>
                    <CardMercado nome={mercado.nome} endereco={mercado.endereco} imagem={mercado.imagem}/>
                    </Link>
                ))
                )}
            </section>
        </>
    );
};

export default SecaoMercados;
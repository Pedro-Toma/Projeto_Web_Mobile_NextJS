"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from './secaoLateral.module.css';
import { useLista } from '../../context/ListaContext';

const SecaoLateral = () => {

    const [estaAberto, setEstaAberto] = useState(false);

    const { minhaLista, alterarQuantidade, calcularTotal } = useLista();

    const toggleLista = () => {
        setEstaAberto(!estaAberto);
    };

    return (
        <aside className={`${styles['secao-lateral']} ${estaAberto ? styles.aberto : ''}`}>
            <button className={styles['toggle-lista']} onClick={toggleLista}> 
                <i className="fa-solid fa-chevron-left"></i> 
                Lista
            </button>
            <section className={styles.lista}>
                <ul className={styles['lista-itens']}>
                    {minhaLista.length === 0 ? (
                        <p className={styles.vazio}>Adicione Itens à Lista...</p>
                    ) : (
                        minhaLista.map((produto, indice) => (
                            <li key={indice} className={styles['produto-lista']}>
                                <Image src={produto.imagem} alt={produto.nome} width={100} height={100}/>
                                <article className={styles['produto-info-lista']}>
                                    <p> {produto.nome} </p>
                                    <p> R$ {(produto.preco * produto.quantidade).toFixed(2).replace('.', ',')} </p>
                                </article>
                                <section className={styles['controle-quantidade']}>
                                    <button onClick={() => alterarQuantidade(produto.id, 1)}>+</button>
                                    <p> {produto.quantidade} </p>
                                    <button onClick={() => alterarQuantidade(produto.id, -1)}>-</button>
                                </section>
                            </li>
                        ))
                    )}
                </ul>
                <footer className={styles['rodape-lista']}>
                    <p className={styles['preco-total']}>
                        Total: R$ {calcularTotal().toFixed(2).replace('.', ',')}
                    </p>
                </footer>
            </section>
        </aside>
    );
};

export default SecaoLateral;
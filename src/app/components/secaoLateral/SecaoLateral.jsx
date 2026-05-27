"use client"

import { useState } from 'react';
import Image from 'next/image';
import './secaoLateral.css';
import { useLista } from '../../context/ListaContext';

const SecaoLateral = () => {

    const [estaAberto, setEstaAberto] = useState(false);

    const { minhaLista, alterarQuantidade, calcularTotal } = useLista();

    const toggleLista = () => {
        setEstaAberto(!estaAberto);
    };

    return (
        <aside className={`secao-lateral ${estaAberto ? 'aberto' : ''}`}>
            <button id="toggle-lista" onClick={toggleLista}> 
                <i className="fa-solid fa-chevron-left"></i> 
                Lista
            </button>
            <section className="lista">
                <ul id="lista-itens">
                    {minhaLista.length === 0 ? (
                        <p className="vazio">Adicione Itens à Lista...</p>
                    ) : (
                        minhaLista.map((produto, indice) => (
                            <li key={indice} className="produto-lista">
                                <Image src={produto.imagem} alt={produto.nome} width={100} height={100}/>
                                <article className="produto-info-lista">
                                    <p> {produto.nome} </p>
                                    <p> R$ {(produto.preco * produto.quantidade).toFixed(2).replace('.', ',')} </p>
                                </article>
                                <section className="controle-quantidade">
                                    <button onClick={() => alterarQuantidade(produto.id, 1)}>+</button>
                                    <p> {produto.quantidade} </p>
                                    <button onClick={() => alterarQuantidade(produto.id, -1)}>-</button>
                                </section>
                            </li>
                        ))
                    )}
                </ul>
                <footer className="rodape-lista">
                    <p id="preco-total">
                        Total: R$ {calcularTotal().toFixed(2).replace('.', ',')}
                    </p>
                </footer>
            </section>
        </aside>
    );
};

export default SecaoLateral;
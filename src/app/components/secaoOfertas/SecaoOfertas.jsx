"use client";

import styles from './secaoOfertas.module.css';
import CardProduto from '../cardProduto/CardProduto';

const SecaoOfertas = ({ categorias, produtosFiltrados, categoriaAtiva, setCategoriaAtiva }) => {

    return (
        <section className={styles['secao-ofertas']}>
            <article className={`${styles.titulo} ${styles.branco}`}>Ofertas Imperdíveis</article>
            <section className={styles['categorias-desktop']}>
                <ul className={styles['categorias-filtros']}>
                    { categorias.map(categoria => (
                        <li key={categoria} onClick={() => setCategoriaAtiva(categoria)} className={categoriaAtiva === categoria ? styles['filtro-ativo'] : ""}> {categoria} </li>
                    ))}
                </ul>
            </section>
            <section className={styles['categorias-mobile']}>
                <select id="filtros-mobile" value={categoriaAtiva} onChange={(e) => setCategoriaAtiva(e.target.value)}>
                    { categorias.map(categoria => (
                        <option key={categoria} value={categoria}>{categoria}</option>
                    ))}
                </select>
            </section>
            <section className={styles.produtos}>
                { produtosFiltrados.length === 0 ? (
                    <p>Nenhum produto encontrado nesta categoria.</p>
                ) : ( 
                    produtosFiltrados.map(produto => ( 
                        <CardProduto id={produto.id} nome={produto.nome} preco={produto.preco} imagem={produto.imagem} key={produto.id}/>
                    ))
                )}
            </section>
        </section>
    );
};

export default SecaoOfertas;
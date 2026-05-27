"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import CardProduto from "./components/cardProduto/CardProduto";
import CardMercado from "./components/cardMercado/CardMercado";

export default function Home() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  
  const [produtos, setProdutos] = useState([]);
  const [mercados, setMercados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);

  async function carregarDados() {
    try {
      const resProdutos = await fetch("/api/produtos");
      const dataProdutos = await resProdutos.json();
      setProdutos(dataProdutos);

      const resMercados = await fetch("/api/mercados");
      const dataMercados = await resMercados.json();
      setMercados(dataMercados);

      const resCategorias = await fetch("/api/categorias");
      const dataCategorias = await resCategorias.json();
      setCategorias(dataCategorias);
    } catch (erro) {
      console.error("Erro ao carregar os dados do API:", erro);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  if (carregando) return <p>Carregando página inicial...</p>;

  const produtosComPreco = produtos.map((p) => {
    if (!p.ofertas || p.ofertas.length === 0) return { ...p, preco: 0 };

    const melhorOferta = p.ofertas.reduce((menor, atual) => {
      return atual.preco < menor.preco ? atual : menor;
    }, p.ofertas[0]);
    
    return {
      ...p,
      preco: melhorOferta.preco
    };
  });

  const produtosFiltrados = categoriaAtiva === "Todos" 
    ? produtosComPreco 
    : produtosComPreco.filter(p => p.categoria === categoriaAtiva);

  return (
    <>
      <form id="Pesquisa-Mobile" className="pesquisa-mobile">
          <i className="fa fa-search icon"></i>
          <input type="text" placeholder="Pesquisar..."/>
      </form>
      <main className="conteudo">
        <article className={styles.titulo}>Produtos Mais Populares</article>
        <section className={styles['categorias-desktop']}>
            <ul id="categorias-filtros">
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
      </main>
    </>
  );
}
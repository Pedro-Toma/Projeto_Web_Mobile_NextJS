"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import CardProduto from "../../components/cardProduto/CardProduto";

export default function PaginaMercado() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  
  const [produtos, setProdutos] = useState([]);
  const [mercado, setMercado] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const params = useParams();
  const idMercado = decodeURIComponent(params.id);

  async function carregarDados() {
    try {
      const resProdutos = await fetch("/api/produtos");
      const dataProdutos = await resProdutos.json();
      setProdutos(dataProdutos);

      const resMercado = await fetch(`/api/mercados/${idMercado}`);
      const dataMercado = await resMercado.json();
      setMercado(dataMercado);

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

  if (carregando) return <p>Carregando produtos...</p>;

  if (!mercado) return <p>Mercado não encontrado</p>;

  const produtosNesteMercado = produtos
    .map(produto => {
      const oferta = produto.ofertas.find(
        o => o.endereco === mercado.endereco
      );

      if (!oferta) return null;

      return {
        ...produto,
        preco: oferta.preco
      };
    })
    .filter(Boolean);
  
  const produtosFiltrados = categoriaAtiva === "Todos" 
    ? produtosNesteMercado 
    : produtosNesteMercado.filter(p => p.categoria === categoriaAtiva);

  return (
    <main className={styles.conteudo}>
      <section className={styles['pagina-detalhes']}>

        <button className={styles.voltar}>
          <Link href={`/`} className={styles['link-home']}> Home </Link> &gt; {mercado.nome}
        </button>

        <section className={styles['pagina-mercado']}>

          <section className={styles['info-mercado']}>
            <div className={styles['imagem-mercado']}>
              <img className={styles['pagina-mercado-imagem']} src={mercado.imagem} alt={mercado.nome}  />
            </div>
            <h1>{mercado.nome}</h1>
            <p>{mercado.endereco}</p>
          </section>        

          <section className={styles['produtos-mercado']}>

            <article className={styles.titulo}>
              Ofertas Imperdíveis
            </article>
            <section className={styles['categorias-desktop']}>
              <ul className={styles['categorias-filtros']}>
                { categorias.map(categoria => (
                  <li key={categoria} onClick={() => setCategoriaAtiva(categoria)} className={categoriaAtiva == categoria ? styles['filtro-ativo'] : ""}> {categoria} </li>
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

              {produtosFiltrados.length === 0 ? (
                <p>Nenhum produto encontrado neste mercado</p>
              ) : (
                produtosFiltrados.map(produto => (
                  <CardProduto id={produto.id} nome={produto.nome} preco={produto.preco} imagem={produto.imagem} key={produto.id}/>
                ))
              )}

            </section>

          </section>
        </section>
      </section>
    </main>
  );
}
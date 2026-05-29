"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';
import PesquisaMobile from "./components/pesquisaMobile/PesquisaMobile";
import SecaoOfertas from './components/secaoOfertas/SecaoOfertas';
import SecaoMercados from './components/secaoMercados/SecaoMercados';

export default function Home() {

  const searchParams = useSearchParams();

  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [produtos, setProdutos] = useState([]);
  const [mercados, setMercados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const termoBusca = searchParams.get('busca') || '';
  
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

  const produtosFiltrados = produtosComPreco.filter(p => {
      const passaCategoria = categoriaAtiva === "Todos" || p.categoria === categoriaAtiva;

      const passaTermo = !termoBusca || p.nome.toLowerCase().includes(termoBusca.toLowerCase());

      return passaCategoria && passaTermo;
    });

  return (
    <>
      <PesquisaMobile termoBusca={termoBusca} />
      <main className={styles.conteudo}>
        <SecaoOfertas categorias={categorias} produtosFiltrados={produtosFiltrados} categoriaAtiva={categoriaAtiva} setCategoriaAtiva={setCategoriaAtiva}/>
        <SecaoMercados mercados={mercados} />
      </main>
    </>
  );
}
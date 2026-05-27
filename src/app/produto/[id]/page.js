"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { useLista } from '../../context/ListaContext';

export default function Produto() {
  const params = useParams();
  const idProduto = params.id;

  const { adicionarProduto } = useLista();

  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);

  if (!idProduto) return;

  async function carregarProduto() {
    try {
      const res = await fetch(`/api/produtos/${idProduto}`);
      
      if (res.ok) {
        const data = await res.json();
        setProduto(data);
      } else {
        setProduto(null);
      }
    } catch (erro) {
      console.error("Erro ao buscar o produto:", erro);
      setProduto(null);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarProduto();
  }, [idProduto]);

  if (carregando) {
    return (
      <main className="conteudo">
        <p>Carregando detalhes do produto...</p>
      </main>
    );
  }

  return (
    <main className="conteudo">
      <section className={styles['pagina-detalhes']}>
        {!produto ? (
          <>
            <button className={styles.voltar}>
              <Link href={`/`} className={styles['link-home']}> Home </Link> &gt; Produto não encontrado
            </button>
            <p> Produto Não Encontrado </p>
          </>
        ) : (
          <>
            <button className={styles.voltar}>
              <Link href={`/`} className={styles['link-home']}> Home </Link> &gt; {produto.nome}
            </button>
            
            <h1>{produto.nome}</h1>
            
            <section className={styles['pagina-produto']}>
              <div className={styles['imagem-produto']}>
                <img src={produto.imagem} alt={produto.nome} />
              </div>
              
              <section className={styles['lista-mercados']}>
                {(!produto.ofertas || produto.ofertas.length === 0) ? (
                  <p>Nenhuma oferta encontrada.</p>
                ) : (
                  produto.ofertas.map(oferta => (
                    <article className={styles['produto-mercado']} key={oferta.endereco}>
                      <img src={oferta.mercado} alt={oferta.loja} />
                      <div className={styles['produto-conteudo']}>
                        <p> Endereço: {oferta.endereco} </p>
                        <p className={styles['produto-preco']}> 
                          R$ {oferta.preco.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                      <button className={styles['adicionar-produto']}
                        data-nome={produto.nome} 
                        data-preco={oferta.preco} 
                        data-imagem={produto.imagem}
                        onClick={() => adicionarProduto({
                          id: produto.id, 
                          nome: produto.nome, 
                          preco: oferta.preco, 
                          imagem: produto.imagem 
                        })}>
                        +
                      </button>
                    </article>
                  ))
                )}
              </section>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
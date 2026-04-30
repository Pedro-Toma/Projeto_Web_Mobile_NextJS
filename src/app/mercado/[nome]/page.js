"use client";

import { mercados } from "../../../data/mercados";
import { produtos } from "../../../data/produtos";
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function PaginaMercado() {

  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const params = useParams();
  const nomeMercado = params.nome;

  const mercado = mercados.find(
    m => m.nome.toLowerCase() === nomeMercado.toLowerCase()
  );

  if (!mercado) return <p>Mercado não encontrado</p>;

  const produtosNesteMercado = produtos
    .map(produto => {
      const oferta = produto.ofertas.find(
        o => o.loja === mercado.nome
      );

      if (!oferta) return null;

      return {
        ...produto,
        precoLocal: oferta.preco
      };
    })
    .filter(Boolean);

  return (
    <section className="pagina-detalhes">

      <button className="voltar">
        <Link href={`/`} className="link-home"> Home </Link> &gt; {mercado.nome}
      </button>

      <section className="pagina-mercado">

        <section className="info-mercado">
          <div className="imagem-mercado">
            <img className="pagina-mercado-imagem" src={mercado.imagem} alt={mercado.nome}  />
          </div>
          <h1>{mercado.nome}</h1>
          <p>{mercado.endereco}</p>
        </section>        

        <section className="produtos-mercado">

          <article className="titulo">
            Produtos Mais Populares
          </article>

          {gerarCategorias?.()}

          <section className="produtos">

            {produtosNesteMercado.length === 0 ? (
              <p>Nenhum produto encontrado neste mercado</p>
            ) : (
              produtosNesteMercado.map(produto => (
                <article key={produto.id} className="produto">

                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                  />

                  <section className="info-produto">
                    <p>{produto.nome}</p>
                    <p className="preco">
                      R$ {produto.precoLocal.toFixed(2).replace(".", ",")}
                    </p>
                  </section>

                  <button className="adicionar-home">
                    +
                  </button>

                </article>
              ))
            )}

          </section>

        </section>
      </section>
    </section>
  );

  // Gerar categorias dos produtos
function gerarCategorias() {
  return <>
    <section className="categorias-desktop">
      <ul id="categorias-filtros">
        <li onClick={() => setCategoriaAtiva("Todos")} className={categoriaAtiva === "Todos" ? "filtro-ativo" : ""}> Todos </li>
        <li onClick={() => setCategoriaAtiva("Higiene e Perfumaria")} className={categoriaAtiva === "Higiene e Perfumaria" ? "filtro-ativo" : ""}> Higiene e Perfumaria </li>
        <li onClick={() => setCategoriaAtiva("Salgadinhos e Snacks")} className={categoriaAtiva === "Salgadinhos e Snacks" ? "filtro-ativo" : ""}> Salgadinhos e Snacks </li>
        <li onClick={() => setCategoriaAtiva("Padaria e Matinais")} className={categoriaAtiva === "Padaria e Matinais" ? "filtro-ativo" : ""}> Padaria e Matinais </li>
        <li onClick={() => setCategoriaAtiva("Bebidas")} className={categoriaAtiva === "Bebidas" ? "filtro-ativo" : ""}> Bebidas </li>
        <li onClick={() => setCategoriaAtiva("Energéticos e Isotônicos")} className={categoriaAtiva === "Energéticos e Isotônicos" ? "filtro-ativo" : ""}> Energéticos e Isotônicos </li>
        <li onClick={() => setCategoriaAtiva("Doces")} className={categoriaAtiva === "Doces" ? "filtro-ativo" : ""}> Doces </li>
      </ul>
    </section>
    <section className="categorias-mobile">
      <select id="filtros-mobile" value={categoriaAtiva} onChange={(e) => setCategoriaAtiva(e.target.value)}>
        <option value="Todos">Todos</option>
        <option value="Higiene e Perfumaria">Higiene e Perfumaria</option>
        <option value="Salgadinhos e Snacks">Salgadinhos e Snacks</option>
        <option value="Padaria e Matinais">Padaria e Matinais</option>
        <option value="Bebidas">Bebidas</option>
        <option value="Energéticos e Isotônicos">Energéticos e Isotônicos</option>
        <option value="Doces">Doces</option>
      </select>
    </section>
  </>;
}
}
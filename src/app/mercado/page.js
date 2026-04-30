"use client";

import { useState } from "react";

const PaginaMercado = ({ mercados, produtos, renderizarHome }) => {
  const [nomeMercado, setNomeMercado] = useState(null);

  const mercado = mercados.find(m => m.nome === nomeMercado);

  if (!mercado) {
    return <p>Selecione um mercado</p>;
  }

  const produtosNesteMercado = produtos
    .map(produto => {
      const oferta = produto.ofertas.find(o => o.loja === nomeMercado);
      if (!oferta) return null;

      return {
        ...produto,
        precoLocal: oferta.preco
      };
    })
    .filter(Boolean);

  return (
    <section className="pagina-detalhes">
      <button onClick={renderizarHome} className="voltar">
        <span className="link-home">Home</span> &gt; {mercado.nome}
      </button>

      <section className="pagina-mercado">
        <section className="info-mercado">
          <div className="imagem-mercado">
            <img src={mercado.imagem} alt={mercado.nome} />
          </div>
          <h1>{mercado.nome}</h1>
          <p>{mercado.endereco}</p>
        </section>

        <section className="produtos-mercado">
          <article className="titulo">Produtos Mais Populares</article>

          {gerarCategorias()}

          <section className="produtos">
            {gerarCardsProdutos("Todos", produtosNesteMercado)}
          </section>
        </section>
      </section>
    </section>
  );
};

export default PaginaMercado;
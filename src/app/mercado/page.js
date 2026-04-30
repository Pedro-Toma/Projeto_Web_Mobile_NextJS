"use client";

import { mercados } from "../../data/mercados";
import { produtos } from "../../data/produtos";

export default function PaginaMercado() {

  const mercado = mercados.find(
    m => m.nome.toLowerCase() === "assaí"
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
        Home &gt; {mercado.nome}
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
}

function gerarCategorias() {
      return <>
          <section className="categorias-desktop">
              <ul id="categorias-filtros">
                  <li data-categoria="Todos"> Todos </li>
                  <li data-categoria="Higiene e Perfumaria"> Higiene e Perfumaria </li>
                  <li data-categoria="Salgadinhos e Snacks"> Salgadinhos e Snacks </li>
                  <li data-categoria="Padaria e Matinais"> Padaria e Matinais </li>
                  <li data-categoria="Bebidas"> Bebidas </li>
                  <li data-categoria="Energéticos e Isotônicos"> Energéticos e Isotônicos </li>
                  <li data-categoria="Doces"> Doces </li>
              </ul>
          </section>
          <section className="categorias-mobile">
              <select id="filtros-mobile" defaultValue="Todos">
                  <option value="Todos">Todos</option>
                  <option value="Higiene e Perfumaria">Higiene e Perfumaria</option>
                  <option value="Salgadinhos e Snacks">Salgadinhos e Snacks</option>
                  <option value="Padaria e Matinais">Padaria e Matinais</option>
                  <option value="Bebidas">Bebidas</option>
                  <option value="Energéticos e Isotônicos">Energéticos e Isotônicos</option>
                  <option value="Doces">Doces</option>
              </select>
          </section>
      </>
    ;
  }
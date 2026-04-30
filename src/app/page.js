"use client"
import Link from "next/link"
import Header from "./components/headers/Header.jsx"
import SecaoLateral from "./components/secaoLateral/SecaoLateral.jsx";
import { produtos } from "../data/produtos";

export default function Home() {

  // Dados de produtos, mercados e lista do usuário

  const mercados = [];

  let minhaLista = [];

  // Verificar cada produto e adicionar mercados à lista de mercados

  produtos.forEach(produto => {
      produto.ofertas.forEach(oferta => {
          const existe = mercados.find(m => m.endereco === oferta.endereco);
          
          if (!existe) {
              mercados.push({
                  nome: oferta.loja,
                  imagem: oferta.mercado,
                  endereco: oferta.endereco
              });
          }
      });
  });

  // Verificar cada produto e preço de cada oferta para mostrar menor preço na página "Home"

    const produtosComPreco = produtos.map((p) => {
    const melhorOferta = p.ofertas.reduce((menor, atual) => {
      return atual.preco < menor.preco ? atual : menor;
    }, p.ofertas[0]);

    return {
      ...p,
      preco: melhorOferta.preco
    };
  });

  return (
    <>
      <Header/>
      <nav>menu: <Link href="/produto"> Produto </Link></nav>
      <form id="Pesquisa-Mobile" className="pesquisa-mobile">
          <i className="fa fa-search icon"></i>
          <input type="text" placeholder="Pesquisar..."/>
      </form>
      <main className="conteudo">
        <article className="titulo">Produtos Mais Populares</article>
        {gerarCategorias()} 
        <section className="produtos">
            {gerarCardsProdutos()} 
        </section>
      </main>
    </>
  );

  // Gerar categorias dos produtos
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

  function gerarCardsProdutos(categoriaFiltro = "Todos", listaBase = null) {

      let listaParaFiltrar = (listaBase !== null) ? listaBase : produtosComPreco;
      let listaFiltrada = listaParaFiltrar;

      if (categoriaFiltro !== "Todos") {
          listaFiltrada = listaParaFiltrar.filter(p => p.categoria === categoriaFiltro);
      }

      if (listaFiltrada.length === 0) return <p>Nenhum produto encontrado nesta categoria.</p>;

      return listaFiltrada.map(produto => ( 
          <article className="produto" key={produto.id}>
              <img src={produto.imagem} onClick={() => renderizarPaginaProduto(produtosComPreco.id)} />
              <section className="info-produto">
                  <p> {produto.nome} </p>
                  <p className="preco"> R$ ${produto.preco.toFixed(2).replace('.', ',')} </p>
              </section>
              <button className="adicionar-home" 
                  data-nome={produto.nome} 
                  data-preco={produto.preco}
                  data-imagem={produto.imagem}
              >
                +
              </button>
          </article>
      )
    );
  }
}
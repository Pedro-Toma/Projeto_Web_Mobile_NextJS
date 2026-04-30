"use client"
import Link from "next/link"
import Header from "./componentes/headers/Header.js"
import SecaoLateral from "./components/SecaoLateral.js";
import { useState } from 'react';

export default function Home() {

  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");

  // Dados de produtos, mercados e lista do usuário

  const produtos = [
      {
          id: 1,
          nome: "Coca-Cola 2L",
          imagem: "/imagens-produtos/coca.jpg",
          categoria: "Bebidas",
          ofertas: [
              { loja: "Assaí", preco: 8.99, mercado: "/imagens-mercados/assai.png", endereco: "R. James Holland, 668" },
              { loja: "Pão de Açúcar", preco: 9.49, mercado: "/imagens-mercados/pao_de_acucar.png", endereco: "R. Maranhão, 875" },
              { loja: "Carrefour", preco: 8.75, mercado: "/imagens-mercados/carrefour.png", endereco: "Av. Rio Branco, 115" }
          ]
      },
      {
          id: 2,
          nome: "Chocolate Kinder Joy 20g",
          imagem: "/imagens-produtos/kinder-ovo.avif",
          categoria: "Doces",
          ofertas: [
              { loja: "Lojas Americanas", preco: 7.99, mercado: "/imagens-mercados/mambo.webp", endereco: "R. Aurélia, 1973 - Vila Romana" },
              { loja: "Pão de Açúcar", preco: 9.20, mercado: "/imagens-mercados/pao_de_acucar.png", endereco: "R. Maranhão, 875" }
          ]
      },
      {
          id: 3,
          nome: "Leite Parmalat 1L",
          imagem: "/imagens-produtos/leite-parmalat.avif",
          categoria: "Padaria e Matinais",
          ofertas: [
              { loja: "Assaí Atacadista", preco: 5.49, mercado: "/imagens-mercados/assai.png", endereco: "R. James Holland, 668" },
              { loja: "Extra", preco: 5.98, mercado: "/imagens-mercados/extra.png", endereco: "Av. Gen. Olímpio da Silveira, 414 - Barra Funda" }
          ]
      },
      {
          id: 4,
          nome: "Monster Branco 473ml",
          imagem: "/imagens-produtos/monster-branco.avif",
          categoria: "Energéticos e Isotônicos",
          ofertas: [
              { loja: "Posto Shell", preco: 12.00, mercado: "/imagens-mercados/extra.png", endereco: "Av. Gen. Olímpio da Silveira, 414 - Barra Funda" },
              { loja: "Assaí", preco: 8.69, mercado: "/imagens-mercados/assai.png", endereco: "R. James Holland, 668" },
              { loja: "Mambo", preco: 9.98, mercado: "/imagens-mercados/mambo.webp", endereco: "R. Aurélia, 1973 - Vila Romana" }
          ]
      },
      {
          id: 5,
          nome: "Sabonete Dove 90g",
          imagem: "/imagens-produtos/sabonete-dove.avif",
          categoria: "Higiene e Perfumaria",
          ofertas: [
              { loja: "Droga Raia", preco: 4.50, mercado: "/imagens-mercados/assai.png", endereco: "R. James Holland, 668" },
              { loja: "Carrefour", preco: 3.99, mercado: "/imagens-mercados/carrefour.png", endereco: "Av. Rio Branco, 115" }
          ]
      },
      {
          id: 6,
          nome: "Bis Original 126g",
          imagem: "/imagens-produtos/bis.avif",
          categoria: "Doces",
          ofertas: [
              { loja: "Assaí", preco: 7.15, mercado: "/imagens-mercados/assai.png", endereco: "R. James Holland, 668" },
              { loja: "Pão de Açúcar", preco: 8.49, mercado: "/imagens-mercados/pao_de_acucar.png", endereco: "R. Maranhão, 875" },
              { loja: "Americanas", preco: 7.99, mercado: "/imagens-mercados/extra.png", endereco: "Av. Gen. Olímpio da Silveira, 414 - Barra Funda" }
          ]
      },
      {
          id: 7,
          nome: "Barra Cereal Nutry",
          imagem: "/imagens-produtos/barra-nutry.avif",
          categoria: "Salgadinhos e Snacks",
          ofertas: [
              { loja: "Extra", preco: 1.55, mercado: "/imagens-mercados/extra.png", endereco: "Av. Gen. Olímpio da Silveira, 414 - Barra Funda" },
              { loja: "Assaí Atacadista", preco: 1.38, mercado: "/imagens-mercados/assai.png", endereco: "R. James Holland, 668" }
          ]
      },
  ];

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

  produtos.forEach((p) => {
      const melhorOferta = p.ofertas.reduce((menor, atual) => {
          return atual.preco < menor.preco ? atual : menor;
      }, p.ofertas[0]);

      p.preco = melhorOferta.preco;
  });

  const produtosFiltrados = categoriaAtiva === "Todos" 
    ? produtos 
    : produtos.filter(p => p.categoria === categoriaAtiva);

  return (
    <>
      <Header/>
      <form id="Pesquisa-Mobile" className="pesquisa-mobile">
          <i className="fa fa-search icon"></i>
          <input type="text" placeholder="Pesquisar..."/>
      </form>
      <main className="conteudo">
        <article className="titulo">Produtos Mais Populares</article>
        {gerarCategorias()} 
        <section className="produtos">
            {gerarCardsProdutos("Todos", produtosFiltrados)} 
        </section>
        <article class="titulo">Mercados</article>
        <section class="mercados">
            {gerarCardsMercados()}
        </section>
      </main>
      <SecaoLateral/>
    </>
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
      </>
    ;
  }

  function gerarCardsProdutos(categoriaFiltro = "Todos", listaBase = null) {

      let listaParaFiltrar = (listaBase !== null) ? listaBase : produtos;
      let listaFiltrada = listaParaFiltrar;

      if (categoriaFiltro !== "Todos") {
          listaFiltrada = listaParaFiltrar.filter(p => p.categoria === categoriaFiltro);
      }

      if (listaFiltrada.length === 0) return "<p>Nenhum produto encontrado nesta categoria.</p>";

      return listaFiltrada.map(produto => ( 
          <article className="produto" key={produto.id}>
              <img src={produto.imagem}/>
              <section className="info-produto">
                  <p> {produto.nome} </p>
                  <p className="preco"> R$ {produto.preco.toFixed(2).replace('.', ',')} </p>
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

  function gerarCardsMercados() {
    return mercados.map(mercado => (
          <article className="mercado">
            <img src={mercado.imagem}/>
            <p> {mercado.nome} </p>
            <p> {mercado.endereco} </p>
          </article>
      )
    );
  }
}
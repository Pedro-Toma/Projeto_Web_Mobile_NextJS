import Link from "next/link"
import Header from "./components/headers/Header.jsx"
import SecaoLateral from "./components/secaoLateral/SecaoLateral.jsx";

export default function Home() {

  return (
    <>
      <Header/>
      <nav>menu: <Link href="/sobre"> Sobre </Link></nav>
      <form id="Pesquisa-Mobile" className="pesquisa-mobile">
          <i className="fa fa-search icon"></i>
          <input type="text" placeholder="Pesquisar..."/>
      </form>
      <main className="conteudo">
      </main>
    </>
  );
}


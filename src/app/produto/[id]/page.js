"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { produtos } from "../../../data/produtos";
import { mercados } from "../../../data/mercados";

export default function Produto() {

    const params = useParams();
    const idProduto = params.id;

    const produto = produtos.find(p => p.id === Number(idProduto));
    console.log(produto)
    if (!produto) {
        alert("Produto Não Encontrado");
        return;
    }

    return(
        <section className="pagina-detalhes">
            <button className="voltar">
                <Link href={`/`} className="link-home"> Home </Link> &gt; {produto.nome}
            </button>
            <h1>{produto.nome}</h1>
            <section className="pagina-produto">
                <div className="imagem-produto">
                    <img src={produto.imagem}/>
                </div>
                <section className="lista-mercados">
                    {gerarMercadosDoProduto(produto.nome)}
                </section>
            </section>
        </section>
    );

    function gerarMercadosDoProduto(nome) {

        const produto = produtos.find((p) => p.nome === nome);

        if (!produto || !produto.ofertas) {
            return "<p>Nenhuma oferta encontrada.</p>"
        };
        
        return produto.ofertas.map(oferta => (
            <article className="produto-mercado" key={oferta.endereco}>
                <img src={oferta.mercado}/>
                <div className="produto-conteudo">
                    <p> Endereço: {oferta.endereco} </p>
                    <p className="produto-preco"> R$ {oferta.preco.toFixed(2).replace('.', ',')}</p>
                </div>
                <button className="adicionar-produto"
                    data-nome={produto.nome} 
                    data-preco={oferta.preco} 
                    data-imagem={produto.imagem}>&plus;
                </button>
            </article>
            )
        );
    }
};
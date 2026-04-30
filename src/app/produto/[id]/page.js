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
        <section class="pagina-detalhes">
            <button className="voltar">
                <Link href={`/`} className="link-home"> Home </Link> &gt; {produto.nome}
            </button>
            <h1>{produto.nome}</h1>
            <section class="pagina-produto">
                <div class="imagem-produto">
                    <img src={produto.imagem}/>
                </div>
                <section class="lista-mercados">
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
            <article class="produto-mercado">
                <img src={oferta.mercado}/>
                <div class="produto-conteudo">
                    <p> Endereço: {oferta.endereco} </p>
                    <p class="produto-preco"> R$ {oferta.preco.toFixed(2).replace('.', ',')}</p>
                </div>
                <button class="adicionar-produto"
                    data-nome={produto.nome} 
                    data-preco={oferta.preco} 
                    data-imagem={produto.imagem}>&plus;
                </button>
            </article>
            )
        );
    }
};
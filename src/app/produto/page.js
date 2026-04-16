async function getProduto() {
    const res = await fetch("https://jsonplaceholder.typicode.com/produtos/1");
    return res.json();
}

export default async function Produto() {

    // const produto = await getProduto();

    return(
        <section class="pagina-detalhes">
            <button onclick="renderizarHome()" class="voltar">
                <span class="link-home">Home</span> <i class="fa-solid fa-chevron-right"></i> nome
            </button>
            <h1>nome</h1>
            <section class="pagina-produto">
                <div class="imagem-produto">
                    imagem
                </div>
                <section class="lista-mercados">
                    mercados
                </section>
            </section>
        </section>
    );
};
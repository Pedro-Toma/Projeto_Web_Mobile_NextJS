function renderizarPaginaMercado(nomeMercado) {
    mostrarPesquisa(true);
    const main = document.querySelector('.conteudo');

    const mercado = mercados.find(m => m.nome === nomeMercado);

    if (!mercado) {
        alert("Mercado Não Encontrado");
        return;
    }

    let produtosNesteMercado = [];
    
    produtos.forEach(produto => {
        const ofertaNoMercado = produto.ofertas.find(oferta => oferta.loja === nomeMercado);
        
        if (ofertaNoMercado) {
            produtosNesteMercado.push({
                ...produto,
                precoLocal: ofertaNoMercado.preco 
            });
        }
    });

    // Renderiza a tela
    main.innerHTML = `
        <section class="pagina-detalhes">
            <button onclick="renderizarHome()" class="voltar">
                <span class="link-home">Home</span> <i class="fa-solid fa-chevron-right"></i> ${mercado.nome}
            </button>
            <section class="pagina-mercado">
                <section class="info-mercado">
                    <div class="imagem-mercado">
                        <img src="${mercado.imagem}">
                    </div>
                    <h1>${mercado.nome}</h1>
                    <p>${mercado.endereco}</p>
                </section>
                <section class="produtos-mercado">
                    <article class="titulo">Produtos Mais Populares</article>
                    ${gerarCategorias()} 
                    <section class="produtos">
                        ${gerarCardsProdutos("Todos", produtosNesteMercado)} 
                    </section>
                </section>
            </section>
        </section>
    `;

    // Ativa os botões de adicionar na lista para esta nova tela
    configurarBotoesAdicionar('.adicionar-home');
    configurarFiltros(produtosNesteMercado);
    renderizarLista();
}
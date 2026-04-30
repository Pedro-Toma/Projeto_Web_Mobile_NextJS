function gerarCardsProdutos(categoriaFiltro = "Todos", listaBase = null) {

    let listaParaFiltrar = (listaBase !== null) ? listaBase : produtos;
    let listaFiltrada = listaParaFiltrar;

    if (categoriaFiltro !== "Todos") {
        listaFiltrada = listaParaFiltrar.filter(p => p.categoria === categoriaFiltro);
    }

    if (listaFiltrada.length === 0) return "<p>Nenhum produto encontrado nesta categoria.</p>";

    return listaFiltrada.map(produto => `
        <article class="produto">
            <img src="${produto.imagem}" onclick="renderizarPaginaProduto(${produto.id})">
            <section class="info-produto">
                <p> ${produto.nome} </p>
                <p class="preco"> R$ ${produto.preco.toFixed(2).replace('.', ',')} </p>
            </section>
            <button class="adicionar-home" 
                data-nome="${produto.nome}" 
                data-preco="${produto.preco}" 
                data-imagem="${produto.imagem}">&plus;
            </button>
        </article>
    `).join('');
}
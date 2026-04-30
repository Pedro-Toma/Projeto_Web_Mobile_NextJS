function gerarCardsMercados() {
    return mercados.map(mercado => `
        <article class="mercado" onclick="renderizarPaginaMercado('${mercado.nome}')">
            <img src="${mercado.imagem}">
            <p> ${mercado.nome} </p>
            <p> ${mercado.endereco} </p>
        </article>
    `).join('');
}
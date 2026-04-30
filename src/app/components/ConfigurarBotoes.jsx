function configurarBotoesAdicionar(seletor) {
    const botoesAdicionar = document.querySelectorAll(seletor);

    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', function () {
            const nomeProduto = this.getAttribute('data-nome');
            const precoProduto = this.getAttribute('data-preco');
            const imagemProduto = this.getAttribute('data-imagem');

            const produto = {
                nome: nomeProduto,
                preco: precoProduto,
                imagem: imagemProduto,
            };

            adicionarNaLista(produto);
        });
    });
}
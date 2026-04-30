function alterarQuantidade(indice, valor) {
    if (!minhaLista[indice].quantidade) minhaLista[indice].quantidade = 1;
    
    minhaLista[indice].quantidade += valor;

    if (minhaLista[indice].quantidade < 1) {
        removerDaLista(indice);
    } else {
        renderizarLista();
    }
}

function renderizarLista() {

    const container = document.getElementById('lista-itens');
    const precoTotalElemento = document.getElementById('preco-total');
    
    let somaTotal = 0;
    container.innerHTML = "";

    if (minhaLista.length === 0) {
        container.innerHTML = '<p className="vazio">Adicione Itens à Lista......</p>';
        precoTotalElemento.innerHTML = "Total: R$ 0,00";
    } else {

        const fragmento = document.createDocumentFragment();

        minhaLista.forEach((produto, indice) => {

            const quantidade = produto.quantidade || 1;
            const subtotal = produto.preco * quantidade;

            somaTotal += subtotal;
            
            const li = document.createElement('li');
            li.classNameName = 'produto-lista';

            li.innerHTML = `
                <img src="${produto.imagem}">
                <article className="produto-info-lista">
                    <p> ${produto.nome} </p>
                    <p className-> R$ ${(produto.preco * quantidade).toFixed(2).replace('.', ',')} </p>
                </article>
                <section className="controle-quantidade">
                    <button onclick="alterarQuantidade(${indice}, 1)">&plus;</button>
                    <p> ${quantidade} </p>
                    <button onclick="alterarQuantidade(${indice}, -1)">&minus;</button>
                </section>
            `;
            fragmento.appendChild(li);
        });
        container.appendChild(fragmento);
        
        precoTotalElemento.innerHTML = `Total: R$ ${somaTotal.toFixed(2).replace('.', ',')}`;
    }
}


const SecaoLateral = () => {
    return (
        <aside className="secao-lateral">
            <button id="toggle-lista"> 
                <i className="fa-solid fa-chevron-left"></i> 
                Lista
            </button>
            <section className="lista">
                <ul id="lista-itens">
                </ul>
                <footer className="rodape-lista">
                    <p id="preco-total"></p>
                </footer>
            </section>
        </aside>
    );
};

export default SecaoLateral;
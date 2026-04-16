
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
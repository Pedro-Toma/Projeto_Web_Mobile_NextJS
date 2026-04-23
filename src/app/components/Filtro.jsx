function configurarFiltros(listaBase = null) {

    const filtroDesktop = document.querySelectorAll('#categorias-filtros li');
    const filtroMobile = document.querySelector('#filtros-mobile');
    const containerProdutos = document.querySelector('.produtos');

    const executarFiltro = (categoria) => {
        containerProdutos.innerHTML = gerarCardsProdutos(categoria, listaBase);
        configurarBotoesAdicionar('.adicionar-home');
        
        if (filtroMobile) filtroMobile.value = categoria;
    };

    filtroDesktop.forEach(filtro => {
        filtro.onclick = () => {

            const jaAtivo = filtro.classList.contains('filtro-ativo');
            let categoriaFiltro;

            if (jaAtivo) {
                filtro.classList.remove('filtro-ativo');
                categoriaFiltro = "Todos"; 
            } else {
                filtroDesktop.forEach(f => f.classList.remove('filtro-ativo'));
                filtro.classList.add('filtro-ativo');
                categoriaFiltro = filtro.getAttribute('data-categoria');
            }
            if (filtroMobile) { 
                filtroMobile.value = categoriaFiltro;
            }
            executarFiltro(categoriaFiltro);
        };
    });

    if (filtroMobile) {
        filtroMobile.onchange = (e) => {
            const categoriaSelecionada = e.target.value;

            filtroDesktop.forEach(f => {
                f.classList.remove('filtro-ativo');
                if(f.getAttribute('data-categoria') === categoriaSelecionada) {
                    f.classList.add('filtro-ativo');
                }
            });

            executarFiltro(categoriaSelecionada);
        };
    }
}
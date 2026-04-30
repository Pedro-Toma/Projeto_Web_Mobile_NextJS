const gerarCardsMercados = (mercados) => {
  return (
    <>
      {mercados.map((mercado) => (
        <article
          key={mercado.nome}
          className="mercado"
          onClick={() => renderizarPaginaMercado(mercado.nome)}
        >
          <img src={mercado.imagem} alt={mercado.nome} />
          <p>{mercado.nome}</p>
          <p>{mercado.endereco}</p>
        </article>
      ))}
    </>
  );
};

export default gerarCardsMercados;
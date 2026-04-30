import { produtos } from "./produtos";

export const mercados = produtos.reduce((acc, produto) => {
  produto.ofertas.forEach(oferta => {
    const existe = acc.find(m => m.endereco === oferta.endereco);

    if (!existe) {
      acc.push({
        nome: oferta.loja,
        imagem: oferta.mercado,
        endereco: oferta.endereco
      });
    }
  });

  return acc;
}, []);
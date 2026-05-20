"use client";
import { createContext, useState, useContext } from "react";

const ListaContext = createContext();

export function ListaProvider({ children }) {
    const [minhaLista, setMinhaLista] = useState([]);

    const adicionarProduto = (produto) => {

        const itemExiste = minhaLista.find((item) => item.id === produto.id);

        if (itemExiste) {
            alert("Item já está na lista!");
            return;
        }
        
        setMinhaLista((listaAtual) => {
            return [...listaAtual, { ...produto, quantidade: 1 }];
        });
    };

    const calcularTotal = () => {
        return minhaLista.reduce((acc, produto) => acc + produto.preco * produto.quantidade, 0);
    }

    const alterarQuantidade = (id, valor) => {
        setMinhaLista((listaAtual) =>
            listaAtual
                .map((item) => {
                    if (item.id === id) {
                        return { ...item, quantidade: item.quantidade + valor };
                    }
                    return item;
                })
                .filter((item) => item.quantidade > 0)
        );
    };

    return (
        <ListaContext.Provider value={{ minhaLista, adicionarProduto, alterarQuantidade, calcularTotal }}>
            {children}
        </ListaContext.Provider>
    );
}

export function useLista() {
    return useContext(ListaContext);
}
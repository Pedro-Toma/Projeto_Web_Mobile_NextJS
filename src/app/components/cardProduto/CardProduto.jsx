import Link from 'next/link';
import styles from './cardProduto.module.css';
import { useLista } from '../../context/ListaContext';

const CardProduto = ({id, nome, preco, imagem}) => {

    const { adicionarProduto } = useLista();

    return (
        <article className={styles.produto}>
            <Link href={`/produto/${id}`}>
                <img src={imagem}/>
            </Link>
            <section className={styles['info-produto']}>
                <p> {nome} </p>
                <p className={styles.preco}> R$ {preco.toFixed(2).replace('.', ',')} </p>
            </section>
            <button className={styles['adicionar-home']} 
                data-nome={nome}
                data-preco={preco} 
                data-imagem="${imagem}"
                onClick={() => adicionarProduto({ id, nome, preco, imagem })}>
                    +        
            </button>
        </article>
    );
}

export default CardProduto;
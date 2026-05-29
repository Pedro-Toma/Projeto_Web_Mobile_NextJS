import styles from './page.module.css';

export default function sobreNos(){
    return (
        <>
        <h2 className={styles.titulo}>
            Fale Conosco
        </h2>

        <p className={styles.texto}>
            Caso precise de alguma ajuda, mande mensagem através dos contatos abaixo:
        </p>

        <p className={styles.texto}>
            Email: contato@listaBarata.com.br
        </p>

        <p className={styles.texto}>
            Telefone: (11)92568-6536
        </p>
        </main>
    );
}
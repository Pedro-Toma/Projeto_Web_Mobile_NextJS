"use client"
import { useState } from "react";

const Contador = () => {
    const [contador, setContador] = useState(0);

    return(
        <section>
            <p> Contador: {contador} </p>
            <button onClick={() => setContador(contador+1)}> + </button>
        </section>
    );
};

export default Contador;
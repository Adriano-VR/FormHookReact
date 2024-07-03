import React from 'react';
import useForm from '../Hooks/useForm';
import CampoForm from './CampoForm';
import { USER_POST, USER_GET } from "../Endpoint/Api.js";
import useFetch from '../Hooks/useFetch.jsx';

export default function FormComponent() {
    const nome = useForm({ label: "nome" });
    const { loading, request, data } = useFetch();
    const [noData, setNoData] = React.useState(false); // Estado para controlar a exibição da mensagem "Nenhum dado disponível"

    async function handleSubmit(event) {
        event.preventDefault();

        if (nome.validate()) {
            const { url, options } = USER_POST({ name: nome.value });
            const { json } = await request(url, options);
            console.log(json);
        } else {
            alert(nome.error);
        }
    }

    async function handleGet() {
        const { url, options } = USER_GET();
        const { json } = await request(url, options);

        // Atualiza o estado para mostrar a mensagem se não houver dados
        if (json.length === 0) {
            setNoData(true);
        } else {
            setNoData(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CampoForm {...nome} />
            {/* <CampoForm {...email} />
            <CampoForm {...senha} /> */}
            <button type='submit'>Enviar</button>
            <button type='button' onClick={handleGet}>LISTAR</button>

            {loading && <div>Carregando...</div>}

            {noData ? (
                <div>Nenhum dado disponível.</div>
            ) : (
                data.length > 0 && data.map((item, index) => (
                    <div key={index}>
                        <p>{item.name}</p>
                    </div>
                ))
            )}
        </form>
    );
}

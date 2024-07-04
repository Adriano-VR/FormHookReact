import React from 'react'; // Importa a biblioteca React
import useForm from '../Hooks/useForm'; // Importa o hook personalizado useForm
import CampoForm from './CampoForm'; // Importa o componente CampoForm
import { USER_POST, USER_GET } from "../Endpoint/Api.js"; // Importa funções de API para POST e GET
import useFetch from '../Hooks/useFetch.jsx'; // Importa o hook personalizado useFetch

export default function FormComponent() {
    const nome = useForm({ label: "nome", type: 'text' }); // Inicializa useForm para o campo nome
    const email = useForm({ label: "email", type: "email" }); // Inicializa useForm para o campo email
    const senha = useForm({ label: "senha", type: "password" }); // Inicializa useForm para o campo senha

    const { loading, request, data } = useFetch(); // Desestrutura o estado e métodos do hook useFetch
    const [noData, setNoData] = React.useState(false); // Estado para controlar a exibição da mensagem "Nenhum dado disponível"

    // Função para lidar com a submissão do formulário
    async function handleSubmit(event) {
        event.preventDefault(); // Previne o comportamento padrão do formulário

        // Valida os campos antes de enviar
        if (nome.validate() && email.validate() && senha.validate()) {
            const { url, options } = USER_POST({ name: nome.value }); // Obtém a URL e opções para a requisição POST
            const { json } = await request(url, options); // Faz a requisição e obtém a resposta
            console.log(json); // Loga a resposta no console
        }
    }

    // Hook de efeito para validar os campos email e senha quando o componente é montado
    React.useEffect(() => {
        email.validate();
        senha.validate();
    }, []);

    // Função para lidar com a requisição GET
    async function handleGet() {
        const { url, options } = USER_GET(); // Obtém a URL e opções para a requisição GET
        const { json } = await request(url, options); // Faz a requisição e obtém a resposta

        // Atualiza o estado para mostrar a mensagem se não houver dados
        if (json.length === 0) {
            setNoData(true); // Define noData como true se não houver dados
        } else {
            setNoData(false); // Define noData como false se houver dados
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* Renderiza os campos do formulário usando o componente CampoForm */}
            <CampoForm {...nome} />
            <CampoForm {...email} />
            <CampoForm {...senha} />

            {/* Exibe as mensagens de erro para cada campo, se houver */}
            <p>{nome.error}</p>
            <p>{senha.error}</p>
            <p>{email.error}</p>

            {/* Botão para enviar o formulário */}
            <button type='submit'>Enviar</button>
            {/* Botão para listar os dados usando a requisição GET */}
            <button type='button' onClick={handleGet}>LISTAR</button>

            {/* Exibe um indicador de carregamento enquanto a requisição está em andamento */}
            {loading && <div>Carregando...</div>}

            {/* Exibe uma mensagem se não houver dados ou lista os dados se houver */}
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

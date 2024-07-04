import React from 'react'; // Importa a biblioteca React

// Objeto contendo as regras de validação para diferentes tipos de campos
const validacao = {
  text: {
    // Função de validação que verifica se o valor não está vazio após remover espaços em branco
    validate: (value) => value.trim() !== '',
    // Mensagem de erro exibida se a validação falhar
    message: 'Este campo não pode ficar em branco',
  },
  email: {
    // Expressão regular para validar um email
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    // Mensagem de erro exibida se a validação falhar
    message: 'Preencha um email válido',
  },
  password: {
    // Expressão regular para validar uma senha
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    // Mensagem de erro exibida se a validação falhar
    message: 'A senha precisa ter 1 caracter maiúsculo, 1 minúsculo e 1 dígito. Com no mínimo 8 caracteres.',
  },
};

// Hook personalizado para gerenciar o estado de um campo de formulário
const useForm = ({ label, type }) => {
  const [value, setValue] = React.useState(""); // Estado para o valor do campo
  const [error, setError] = React.useState(null); // Estado para a mensagem de erro

  // Função chamada quando o valor do campo muda
  function onChange({ target }) {
    if (error) validate(target.value); // Valida o valor se já houver um erro
    setValue(target.value); // Atualiza o estado do valor do campo
  }

  // Função para validar o valor do campo
  function validate(value) {
    if (type === "false") return true; // Se o tipo for "false", não faz validação

    if (validacao[type]) {
      // Se houver uma regra de validação para o tipo especificado
      if (validacao[type].regex && !validacao[type].regex.test(value)) {
        // Se houver uma regex e o valor não passar na validação da regex
        setError(validacao[type].message); // Define a mensagem de erro
        return false; // Retorna false indicando que a validação falhou
      } else if (validacao[type].validate && !validacao[type].validate(value)) {
        // Se houver uma função de validação e o valor não passar na validação da função
        setError(validacao[type].message); // Define a mensagem de erro
        return false; // Retorna false indicando que a validação falhou
      } else {
        setError(null); // Remove a mensagem de erro se a validação passar
        return true; // Retorna true indicando que a validação passou
      }
    }
    return true; // Se não houver regra de validação, retorna true
  }

  // Retorna um objeto contendo as propriedades e métodos necessários para o campo de formulário
  return {
    onChange, // Função para atualizar o valor do campo
    value, // Valor atual do campo
    label, // Rótulo do campo
    type, // Tipo do campo
    validate: () => validate(value), // Função para validar o valor atual do campo
    error // Mensagem de erro atual
  }
}

export default useForm; // Exporta o hook personalizado como padrão

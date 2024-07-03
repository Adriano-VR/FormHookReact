import React from 'react'

const useForm = ({label,type}) => {
    const [value, setValue] = React.useState("");
    const [error, setError] = React.useState(null);

    function onChange({ target }) {
      if (error) validate(target.value);

        setValue(target.value);
      }

      function validate(value) {
    if (type === false) return true; // Se type for false, não faz validação

    if (value.length === 0) {
      setError("Campo Vazio");
      return false;
    }else{
      setError(null); // Limpa o erro se a validação passar
      return true;

    }

    
  }
    
  return {
    onChange,
    value,
    label,
    type,
    validate: () => validate(value),
    error
  }
}

export default useForm

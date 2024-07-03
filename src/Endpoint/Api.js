 const API_URL = 'http://localhost:3000';



export function USER_GET() {
  return {
    url: API_URL + '/listar',
    options: {
      method: 'GET',
    },
  };
}


export function USER_POST(body) {
    return {
      url: API_URL + '/new',
      options: {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      },
    };
  }


  
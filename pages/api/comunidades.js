import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {

  if(request.method === 'POST'){

    const TOKEN = 'f44bc0addb9c11182543b7fba7be39';
    const client = new SiteClient(TOKEN);
    console.log("corpo da requisição"+request.body.imageUrl);
    const registroCriado = await client.items.create({
        itemType: "972361",
        ...request.body,
        // title: "Comunidade de Teste",
        // imageUrl: "https://github.com/imaggine.jpg",
        // creatorSlug: "imaggine",
    })
    console.log(registroCriado);
  
    response.json({
      dados: 'Algum dado qualquer',
      registroCriado: registroCriado,
    })

  } else {
    console.log("Nenhum registro inserido. Somente POST.");
  }

}
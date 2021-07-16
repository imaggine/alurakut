import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  console.log(propriedades);
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>

      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades){
  return (
    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
    </h2>
    <ul>
        {propriedades.items.map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={`/users/${itemAtual.title}`}>
                <img src={itemAtual.imageUrl} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })}
    </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const usuarioAleatorio = 'imaggine';
  const [comunidades, setComunidades] = React.useState([

  ]);

  const pessoasFavoritasObj = [
    {id: 'omariosouto', title: 'omariosouto', imageUrl: 'https://github.com/omariosouto.png'},
    {id: 'junegreiros', title: 'juunegreiros', imageUrl: 'https://github.com/juunegreiros.png'},
    {id: 'guilhermesilveira', title: 'guilhermesilveira', imageUrl: 'https://github.com/guilhermesilveira.png'},
    {id: 'marcobrunodev', title: 'marcobrunodev', imageUrl: 'https://github.com/marcobrunodev.png'},
    {id: 'peas', title: 'peas', imageUrl: 'https://github.com/peas.png'},
    {id: 'felipefialho', title: 'felipefialho', imageUrl: 'https://github.com/felipefialho.png'},
  ]

  const seguidoresObj = [
    {id: 'djwell', title: 'djwell', imageUrl: 'data:image/jpeg;base64,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'},
    {id: 'mariosa', title: 'jackson', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLEVdpHDiB7K90l98aCH643SuSny9DgGuICpq0YdZRnlplULbFYSMw8-dx78360Nlwg_7Ppczv&usqp=CAU'},
    {id: 'cazuza', title: 'cazuza', imageUrl: 'https://img.estadao.com.br/fotos/politica/eleicoes-2020/MG/FMG130001007716_div.jpg'},
    {id: 'gui', title: 'guizão', imageUrl: 'https://pbs.twimg.com/profile_images/1210368153835974656/ap8SZ4Jw_400x400.jpg'},
    {id: 'denis', title: 'denivaldo', imageUrl: 'https://media-exp1.licdn.com/dms/image/C4E03AQGDgPyK3VnZgw/profile-displayphoto-shrink_200_200/0/1516477101236?e=1630540800&v=beta&t=bio6eX-jF_pXRREQeB9e-SxfNGA2-q0KtEFuR-wlXqI'},
    {id: 'chico', title: 'chico', imageUrl: 'https://scontent-gru2-1.cdninstagram.com/v/t51.2885-19/s320x320/130802557_208883217492607_8403395150885192218_n.jpg?_nc_ht=scontent-gru2-1.cdninstagram.com&_nc_ohc=wdKj2s3u9WQAX-os-rt&edm=ABfd0MgBAAAA&ccb=7-4&oh=9b0b2cc5b1a4cd97736c4520c7f882d3&oe=60F8892C&_nc_sid=7bff83'},
  ]

  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(function(){
    fetch('https://api.github.com/users/peas/followers')
    .then(function(respostaDoServidor){
      return respostaDoServidor.json();
      console.log("resposta do servidor");
    })
    .then(function(respostaCompleta){
      setSeguidores(respostaCompleta);
      console.log("resposta completa");
    })
    const token = '81e1feb13e0004f903145206514b58';

    fetch(
      'https://graphql.datocms.com/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `{
            allCommunities {
              id
              title
              imageUrl
              _status
              _firstPublishedAt
            }
          }`
        }),
      }
    )
    .then((response) => response.json())
    .then((respostaCompleta) => {
      const comunidadesDato = respostaCompleta.data.allCommunities;
      setComunidades(comunidadesDato);
      console.log(comunidadesDato)
    })
    .catch((error) => {
      console.log(error);
    });
  }, [])

  return (
  <>
      <AlurakutMenu githubUser={usuarioAleatorio}/>
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a), Marcos_.
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
              <h2 className="subTitle">Crie uma comunidade para chamar de sua</h2>
              <form onSubmit={function handleCriarComunidade(e){
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);

                const comunidade = {
                  id: new Date().toISOString(),
                  title: dadosDoForm.get('title'),
                  image: dadosDoForm.get('image'),
                }

                setComunidades([...comunidades, comunidade]);
              }}>
                <div>
                  <input 
                    placeholder="Qual vai ser o nome da sua comunidade?" 
                    name="title" 
                    aria-label="Qual vai ser o nome da sua comunidade"
                    type="text"
                  />
                </div>
                <div>
                  <input 
                    placeholder="Coloque uma URL para usar de capa" 
                    name="image" 
                    aria-label="Coloque uma URL para usar de capa"
                  />
                </div>
                <button>
                  Criar comunidade
                </button>
              </form>

          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="Seguidores" items={seguidoresObj}/>
          <ProfileRelationsBox title="Comunidades" items={comunidades}/>
          <ProfileRelationsBox title="Pessoas da Comunidade" items={pessoasFavoritasObj}/>
        </div>
      </MainGrid>
  </>
  )
}
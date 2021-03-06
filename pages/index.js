import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import recebedorDeRequests from './api/comunidades.js';
import nookies from 'nookies';
import jwt from 'jsonwebtoken'


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
  let contador = 1;
  return (
    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
    </h2>
    <ul>
        {propriedades.items.map((itemAtual) => {
          if (contador <= 6) {
            contador = contador + 1
            return (
              <li key={itemAtual.id}>
                <a href={`/users/${itemAtual.title}`}>
                  <img src={itemAtual.imageUrl} />
                  <span>{itemAtual.title}</span>
                </a>
              </li>
            )
          }
        })}
    </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {
  const usuarioAleatorio = props.githubUser;
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
    {id: 'djwell', title: 'djwell', imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyt3.ggpht.com%2Fa%2FAGF-l78wt9bEiYW_0ZDnFKl2ssZ0I0z7dRI9kO3FOQ%3Ds900-c-k-c0xffffffff-no-rj-mo&f=1&nofb=1'},
    {id: 'mariosa', title: 'jackson', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLEVdpHDiB7K90l98aCH643SuSny9DgGuICpq0YdZRnlplULbFYSMw8-dx78360Nlwg_7Ppczv&usqp=CAU'},
    {id: 'cazuza', title: 'cazuza', imageUrl: 'https://img.estadao.com.br/fotos/politica/eleicoes-2020/MG/FMG130001007716_div.jpg'},
    {id: 'gui', title: 'guiz??o', imageUrl: 'https://pbs.twimg.com/profile_images/1210368153835974656/ap8SZ4Jw_400x400.jpg'},
    {id: 'denis', title: 'denivaldo', imageUrl: 'https://media-exp1.licdn.com/dms/image/C4E03AQGDgPyK3VnZgw/profile-displayphoto-shrink_200_200/0/1516477101236?e=1630540800&v=beta&t=bio6eX-jF_pXRREQeB9e-SxfNGA2-q0KtEFuR-wlXqI'},
    {id: 'chico', title: 'chico', imageUrl: 'https://i.ibb.co/z5mYv2q/130802557-208883217492607-8403395150885192218-n.jpg'},
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
              Bem vindo(a), {usuarioAleatorio}_.
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
              <h2 className="subTitle">Crie uma comunidade para chamar de sua</h2>
              <form onSubmit={function handleCriarComunidade(e){
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);

                const comunidade = {
                  //id: new Date().toISOString(),
                  title: dadosDoForm.get('title'),
                  imageUrl: dadosDoForm.get('imageUrl'),
                  creatorSlug: usuarioAleatorio,
                }

                fetch('/api/comunidades',{
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(comunidade)
                })
                .then(async(response) => {
                  const dados = await response.json();
                  console.log(dados.registroCriado.id);
                  const comunidade = dados.registroCriado;
                  setComunidades([...comunidades, comunidade]);
                })

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
                    name="imageUrl" 
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


export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;

  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
  .then((resposta) => resposta.json());

console.log(isAuthenticated)

  if(!isAuthenticated){
    return {
      redirect: {
      destination: '/login',
      permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);


  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}
import { Router } from 'express';
import Instagram from 'instagram-web-api';
import FileCookieStore from 'tough-cookie-filestore2';
import { sleep } from './../tools/Time';

const seguidoresRouter = Router();

const listaSeguidorUnhas = ["unhas_decorada_oficial", "alongamentodeunhas.oficial", "fibradevidro_cursoonline","_unhas.perfeita"]
const listaSeguidorTec = ["tecnoblog", "techtudo_oficial", "tecno.infor_"]
const listaSeguidorCroche = ["crochetaria","croche.decasa", "croche.minha.paixao","_.crochecomamor._","croche.de.luxo"]
const listaSeguidorOferta = ["magazinee_ofertas","viverdeofertas","fast_ofertas","meunovoapestore","americanascom","submarino","fastshop","tec_mundo", "betechers"]

const objetosPostagem = [
   
    //OFERTABEST
    {
        "username": "ofertabestt",
        "usernameCookie": "ofertabestt",
        "password": "Monteiro01*",
        "category": "4",
        "token": "KAHDHA(S(&#&@)#(9234",
        "perfisrelacionados": listaSeguidorOferta
    },
    {
        "username": "ofertabest._",
        "usernameCookie": "ofertabest._",
        "password": "Monteiro01*",
        "category": "4",
        "token": "KAHDHA(S(&#&@)#(9234",
        "perfisrelacionados": listaSeguidorOferta
    }
];

seguidoresRouter.get("/", async (request, response) => {
    seguir();        
    console.log(`PROCESSO FINALIZADO!    -----------------------------------  ${new Date()}`);
    return response.status(201).json({ status: "OK"});
})

async function seguir(){

    for (var obj in objetosPostagem) {
        try{

            const { username, usernameCookie, password, token, perfisrelacionados} = objetosPostagem[obj];     

            console.log(`SEGUIDORES AUTENTICANDO -------- ${username}  `)
            try{
                const cookieStore = new FileCookieStore(`./cookies/cookies${usernameCookie}.json`)
                const client = new Instagram({ username, password, cookieStore })

                await client
                    .login()
                    .then(() => {
                    client
                        .getProfile()
                        //.then(console.log)
                    });

                await sleep(5000);

            try{
                console.log(`PAGINA ${username}  PARA DE SEGUIR SEGUIDORES ${username} ---------------------------------------- ${new Date()}`)

                const userProfile = await client.getUserByUsername({ username: username }) 

                const objProfile = await  client.getFollowings({ userId: userProfile.id});
                const listSeguidores: any[] = objProfile.data;

                for (var objS in listSeguidores) { 
                    await client.unfollow({ userId: listSeguidores[objS].id});
                    await setTimeout( function() {
                    }, 120000 );
                }
                
            } catch(error){
                console.log(`Erro: ${error}`);
            }
            
            await setTimeout( function() {   
            }, 1200000 );

            

                const usernameSeguidor = perfisrelacionados[Math.floor(Math.random() * perfisrelacionados.length)]

                console.log(`PAGINA ${username}  BUSCAR SEGUIDORES ${usernameSeguidor} ---------------------------------------- ${new Date()}`)

                const userSeguir = await client.getUserByUsername({ username: usernameSeguidor }) 
                
                const objProfileSeguir = await  client.getFollowers({ userId: userSeguir.id});
                await sleep(5000);

                const listSeguidoresSeguir: any[] = objProfileSeguir.data;
                
                for (var objS in listSeguidoresSeguir) { 

                    await client.follow({ userId: listSeguidoresSeguir[objS].id});
                    console.log(`SEGUINDO ${objS} to ${listSeguidoresSeguir.length}  ${listSeguidoresSeguir[objS].username} --------------------------- ${new Date()}`);
                    await sleep(5000);
        
                }

            } catch(error){
                console.log(`Erro: ${error}`);
            }

            await sleep(20000);

        } catch(error){
            console.log(`Erro: ${error}`);
        }
    }
    return true;
}

export { seguidoresRouter };
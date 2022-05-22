import { Router } from 'express';
import Instagram from 'instagram-web-api';
import FileCookieStore from 'tough-cookie-filestore2';
import { sleep } from './../tools/Time';

import { readdirSync, copyFileSync } from 'fs';
import { join } from 'path';

import fs from 'fs';
import request from 'request';
import { isEmpty } from '../tools/Empty';

const postsRouter = Router();



postsRouter.post("/", async (req, res) => {

    const { username, password, category, tags, description, urlImage, token} = req.body;

        try{

        if(token != "KAHDHA(S(&#&@)#(9234"){
            return res.status(404).json({ error: "Token Invalid"});
        }

        let pasta = '';
        if(category === "1") {
            pasta = './imagens/Unhas';
        }else if(category == "2") {
            pasta = './imagens/Tecnologia';
        }else if(category == "3") {
            pasta = './imagens/Croche';
        }
        
        const cookieStore = new FileCookieStore(`./cookies/cookies${username}.json`)
        const client = new Instagram({ username, password, cookieStore })
        
        let informacoes = "";
        if(isEmpty(urlImage)){
            const arquivos = readdirSync(`${pasta}`).filter((nome) => nome.indexOf('.jpg') !== -1 || nome.indexOf('.png'));
            const selecionado = arquivos[Math.floor(Math.random() * arquivos.length)];
            informacoes = join(pasta, selecionado); //.replace('.jpg', '.json').replace('.png', '.json'));    
        }else{
            
            pasta = './imagens/Temp';
            if (!fs.existsSync(pasta)){
                fs.mkdirSync(pasta);
            }
            const name =  "ArquivoTemp.jpg";
            try{
                var download = async function (uri, filename, callback) {
                    request.head(uri, function (err, res, body) {
                         request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    });
                };
                
                download(urlImage, `${pasta}/${name}`, await function(){
                  
                });

            }catch(error){
               
            }

            informacoes = join(pasta, name);
        }
        
        const photo = informacoes;

        await client
            .login()
            .then(() => {
            client
                .getProfile()
               
            })

        let caption  = `${description}    ${tags}`
        await sleep(5000);

      
        try{
            const mediaFeed = await client.uploadPhoto({ photo: photo, caption: caption, post: 'feed' });
           
        } catch(error){
           
        }

        await sleep(5000);

        try{
            const mediaStory = await client.uploadPhoto({ photo: photo, caption: caption, post: 'story' });
            
        } catch(error){
            
        }

    } catch(error){
        
    }

      
    return res.status(201).json({ status: "OK"});
})


const objetosPostagem = [

    //UNHAS
    {
        "username": "nailforms._",
        "password": "Monteiro01*",
        "category": "1",
        "tags": "      #nailforms #nailfom #nailformsnotips #unhasalongadas, #unhaslongas #aprendahoje",
        "description": "Unhas mega inscriveis, nos siga.",
        "token": "KAHDHA(S(&#&@)#(9234"
    },
    {
        "username": "alongamentounha._",
        "password": "Monteiro01*",
        "category": "1",
        "tags": "      #nailforms #nailfom #nailformsnotips #unhasalongadas, #unhaslongas #aprendahoje",
        "description": "Unhas mega inscriveis, nos siga.",
        "token": "KAHDHA(S(&#&@)#(9234"
    },  
    {
        "username": "megaunhas._",
        "password": "Monteiro01*",
        "category": "1",
        "tags": "      #nailforms #nailfom #nailformsnotips #unhasalongadas, #unhaslongas #aprendahoje",
        "description": "Unhas mega inscriveis, nos siga.",
        "token": "KAHDHA(S(&#&@)#(9234"
    },
    {
        "username": "nelformstop._",
        "password": "Monteiro01*",
        "category": "1",
        "tags": "      #nailforms #nailfom #nailformsnotips #unhasalongadas, #unhaslongas #aprendahoje",
        "description": "Unhas mega inscriveis, nos siga.",
        "token": "KAHDHA(S(&#&@)#(9234"
    },
    {
        "username": "nail_forms._",
        "password": "Monteiro01*",
        "category": "1",
        "tags": "      #nailforms #nailfom #nailformsnotips #unhasalongadas, #unhaslongas #aprendahoje",
        "description": "Unhas mega inscriveis, nos siga.",
        "token": "KAHDHA(S(&#&@)#(9234"
    },
    //TECNOLOGIAL
    {
        "username": "monteiroblog",
        "password": "Monteiro01*",
        "category": "2",
        "tags": "      #tecnologia #novidades #smartphone #noticias #iphone13 #ios15 #macos #tutoriais",
        "description": " Acesse www.monterioblog.com",
        "token": "KAHDHA(S(&#&@)#(9234"
    },

    //CROCHE 
    {
        "username": "croche.oficial._",
        "password": "Monteiro01*",
        "category": "3",
        "tags": "      #croche",
        "description": "  Melhores ideias de crochê.",
        "token": "KAHDHA(S(&#&@)#(9234"
    },
    {
        "username": "croche_minha_paixao_oficial",
        "password": "Monteiro01*",
        "category": "3",
        "tags": "    #croche",
        "description": "  Melhores ideias de crochê.",
        "token": "KAHDHA(S(&#&@)#(9234"
    },

    {
        "username": "mega_croche.oficial",
        "password": "Monteiro01*",
        "category": "3",
        "tags": "     #croche",
        "description": "  Melhores ideias de crochê.",
        "token": "KAHDHA(S(&#&@)#(9234"
    },

    {
        "username": "croche_em_casa._",
        "password": "Monteiro01*",
        "category": "3",
        "tags": "    #croche",
        "description": " Melhores ideias de crochê.",
        "token": "KAHDHA(S(&#&@)#(9234"
    },
];

postsRouter.get("/", async (request, response) => {
    postar()
    return response.status(201).json({ status: "OK"});
})

async function postar(){

    for (var obj in objetosPostagem) {
       
        try{
            const { username, password, category, tags, description, token} = objetosPostagem[obj];     

           
            if(token != "KAHDHA(S(&#&@)#(9234"){
                return false;
            }

            let pasta = '';
            if(category === "1") {
                pasta = './imagens/Unhas';
            }else if(category == "2") {
                pasta = './imagens/Tecnologia';
            }else if(category == "3") {
                pasta = './imagens/Croche';
            }
            
            const cookieStore = new FileCookieStore(`./cookies/cookies${username}.json`)
            const client = new Instagram({ username, password, cookieStore })
            
            const arquivos = readdirSync(`${pasta}`).filter((nome) => nome.indexOf('.jpg') !== -1 || nome.indexOf('.png'));
            const selecionado = arquivos[Math.floor(Math.random() * arquivos.length)];
            const photo = join(pasta, selecionado); //.replace('.jpg', '.json').replace('.png', '.json'));    

            await client
                .login()
                .then(() => {
                client
                    .getProfile()
                })

            let caption  = `${description}    ${tags}`
            await sleep(5000);
            // Upload Photo to feed or story, just configure 'post' to 'feed' or 'story'
            try{
                await client.uploadPhoto({ photo: photo, caption: caption, post: 'feed' });
           } catch(error){
            }

            await sleep(10000);

            try{
                await client.uploadPhoto({ photo: photo, caption: caption, post: 'story' });
            } catch(error){
               
            }
            
        
        } catch(error){
            
        }

        await sleep(20000);
    }
      
    return true
}

export { postsRouter };
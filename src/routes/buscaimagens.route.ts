import { Router } from 'express';
import Instagram from 'instagram-web-api';
import FileCookieStore from 'tough-cookie-filestore2';
import fs from 'fs';
import request from 'request';


const buscarImagensRouter = Router();

const objetosPostagem = [
    {
        "username": "nail_forms._",
        "password": "Monteiro01*",
        "category": "3",
        "usernames" : ["crochetaria"],
        "token": "KAHDHA(S(&#&@)#(9234",
    },
    
];

buscarImagensRouter.post("/", async (req, response) => {

    processar(req.body);
    return response.status(201).json({ status: "OK"});
})


async function processar(body :any ){

    const { usernames, category, tags, dir }  = body;

    for (var obj in objetosPostagem) {

        try {

            const { username, password, token } = objetosPostagem[obj];     

            if(token != "KAHDHA(S(&#&@)#(9234"){
                return false;
            }

            if(isEmpty(username)){
                return false;
            }

            if(isEmpty(password)){
                return false;
            }

            let pasta = '';

            const cookieStore = new FileCookieStore(`./cookies/cookies${username}.json`)
            const client = new Instagram({ username, password, cookieStore })

            await client
                .login()
                .then(() => {
                client
                    .getProfile()
                    .then()
                });


            const listaTags: any[] = tags;
            for (var objU in listaTags) {  

                try{
                    const imagensTag  = await client.getPhotosByHashtag({ hashtag: listaTags[objU] });

                    pasta = `./imagens/Extras/${listaTags[objU]}`;
                    if(!isEmpty(dir)){
                        pasta = `./imagens/${dir}`;
                    }
                    
                    if (!fs.existsSync(pasta)){
                        fs.mkdirSync(pasta);
                    }

                    for (var objS in imagensTag.hashtag.edge_hashtag_to_media.edges) { 
                        const obj = imagensTag.hashtag.edge_hashtag_to_media.edges[objS];
                        const url = obj.node.display_url;
                        const name = obj.node.id;
                        try{ 
                            var download = await function(uri, filename, count, callback){
                                request.head(uri, function(err, res, body){  
                                    try{  
                                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);

                                    }catch(error){
   
                                    }
                                });
                            };
                            
                            download(url, `${pasta}/${name}.jpg`, objS, function(){
                                
                            });

                        }catch(error){

                        }
                        setTimeout( function() {
                        }, 120000 );
                    }
                }catch(error){

                }
                
            }


            const listaUsernames: any[] = usernames;
            for (var objU in listaUsernames) { 
                
                try{
                    const imagensUser = await client.getPhotosByUsername({ username: listaUsernames[objU], first: 100})

                    if(category === "1") {
                        pasta = './imagens/Unhas';
                    }else if(category == "2") {
                        pasta = './imagens/Tecnologia';
                    }else if(category == "3") {
                        pasta = './imagens/Croche';
                    }else {
                        pasta = `./imagens/Extras/${listaUsernames}`;
                        if (!fs.existsSync(pasta)){
                            fs.mkdirSync(pasta);
                        }
                    }

                    if(!isEmpty(dir)){
                        pasta = `./imagens/${dir}`;
                        if (!fs.existsSync(pasta)){
                            fs.mkdirSync(pasta);
                        }
                    }

                    
                    for (var objS in imagensUser.user.edge_owner_to_timeline_media.edges) { 
                        try{
                            const obj = imagensUser.user.edge_owner_to_timeline_media.edges[objS];
                            const url = obj.node.display_url;
                            const name = obj.node.id;
                    
                            var downloadName = await function (uri, filename, count, callback) {
                                request.head(uri, function (err, res, body) {
                                    try{
                                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                                    }catch(error){
                                    }
                                });
                            };
                            
                            downloadName(url, `${pasta}/${name}.jpg`,objS, function(){
                            });

                        }catch(error){
                           
                        }
                        setTimeout( function() {
                        }, 120000 );
                    }
                }catch(error){
                    
                   
                }
                
            }
        
            setTimeout( function() {
                
            }, 120000 );

        } catch(error){
  
        }

    }

    return true;
}



var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    if (obj == null) return true;

    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

export { buscarImagensRouter };
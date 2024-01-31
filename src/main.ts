import express from 'express';
import {db,firestore} from '../banco_de_dados/firebase';
import { doc } from 'firebase/firestore';

const app = express();

app.get('/',(req,res) =>{   
    res.send("Sejam bem vindos à minha primeira API");
});

app.post('/usuario', async (req, res) =>{
    const usuario  = req.body.nome
    try {
        const docRef = await firestore.addDoc(firestore.collection(db, 'usuario'),{
            nome: nome,
        })
        res.send(docRef.id)
    } catch (e) {
        console.log(e) 

        res.status(500).send(e)

        
    }
})

app.listen(3000,function (){
    console.log("serviço rodando na porta em http://localhost:3000");
});

import express from 'express';
import { db, firestore } from '../banco_de_dados/firebase';
import { doc } from 'firebase/firestore';
import { json } from 'stream/consumers';
import { get } from 'http';

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Sejam bem vindos à minha primeira API");
});

app.post('/usuario', async (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;


    try {
        const docRef = await firestore.addDoc(firestore.collection(db, 'usuario'), {
            nome: nome,
            email: email,
            telefone: telefone
        })
        res.send("Usuário adicionado com sucesso:" + docRef.id)
    } catch (e) {
        console.log(e)

        res.status(500).send(e)


    }
})
app.get('/listarUsuarios', async (req, res) => {
try {
    const usuarios = await firestore.getDocs(firestore.collection(db, 'usuario'))
    const usuarioslista = usuarios.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }))

    res.send(usuarioslista)
} catch (e) {
    console.log("Erro ao listar usuários:" + e)
    
    res.status(500).send("Erro ao listar usuários: " + e )
    
}
})



app.listen(3000, function () {
    console.log("serviço rodando na porta em http://localhost:3000");
});

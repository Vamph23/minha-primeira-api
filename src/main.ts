import express from 'express';
import cors from "cors";
import { db, firestore } from '../banco_de_dados/firebase';


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true }));
app.use(cors({ 
    "origin": "*",
    "methods": "GET,HEARD,PUT,PATCH,POST,DELETE",
}))

app.get('/', (req, res) => {
    res.send("Sejam bem vindos à minha primeira API");
});

app.post('/formulario', async (req, res) => {
    const nome = req.body.nome;
    const telefone = req.body.telefone;
    const email = req.body.email;
    const descricao = req.body.descricao;


    try {
        const docRef = await firestore.addDoc(firestore.collection(db, 'formulario'), {
            nome: nome,
            telefone: telefone,
            email: email,
            descricao: descricao,
            
        })
        res.send("Resposta enviada com sucesso:" + docRef.id)
    } catch (e) {
        console.log(e)

        res.status(500).send(e)


    }
})
app.get('/listarFormulario', async (req, res) => {
    try {
        const formulario = await firestore.getDocs(firestore.collection(db, 'formulario'))
        const formularioLista = formulario.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))

        res.send(formularioLista)
    } catch (e) {
        console.log("Erro ao listar formulario:" + e)

        res.status(500).send("Erro ao listar formulario: " + e)

    }
})



app.put('/atualizarUsuario/:id', async (req, res) => {

    const id = req.params.id
    const nome = req.body.nome

    try {
        await firestore.updateDoc(firestore.doc(db, 'usuarios', id), {

            nome: nome,

        })
        res.send("Usuário atualizado com sucesso!")
    } catch (e) {
        console.log('Erro ao atualizar usuários: ' + e)
        res.status(500).send('Erro ao atualizar usuários: ' + e)
    }

})

app.delete('/deletarUsuario/:id', async (req, res)=>{
    const id = req.params.id

    try {
        await firestore.deleteDoc(firestore.doc(db,'usuarios', id))

        res.send ('Usuário deletado com sucesso!')
    } catch (e) {
       console.log('Erro  ao deletar usuário:' +e)

       res.status(500).send('Erro ao deletae usuário:' +e)
        
      
    }
})

app.listen(3000, function () {
    console.log("serviço rodando na porta em http://localhost:3000");
});

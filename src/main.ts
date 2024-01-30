import express from 'express';
import {db,firestore} from '../banco_de_dados/firebase';

const app = express();



app.listen(300,function (){
    console.log("serviço rodando na porta em http://locelhost:3000");
});

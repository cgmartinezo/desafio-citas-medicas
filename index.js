import axios from 'axios'
import express from 'express'
import _ from 'lodash'
import { nanoid } from 'nanoid'
import chalk from 'chalk';
import moment from 'moment'
moment.locale('es')

const app = express()
const users = []

app.get('/', async (req, res) => {
    try {
        const { data } = await axios.get('https://randomuser.me/api/')
        const user = {
            genero: data.results[0].gender,
            nombre: data.results[0].name.first,
            apellido: data.results[0].name.last,
            ID: nanoid(4),
            Timestamp: moment().format('MMMM Do YYYY, h:mm:ss a')
        }

        users.push(user)

        const items = _.partition(users, (item) => item.genero === "female")

        // Imprimir usuario por consola con fondo blanco y texto azul
        console.log(chalk.bgWhite.blue(JSON.stringify(user)));

        // Generar la salida HTML
        let html = `<h2>Mujeres:</h2>`;
        items[0].forEach((persona, index) => {
            html += `<p>${index + 1}. Nombre: ${persona.nombre} - Apellido: ${persona.apellido} - ID: ${persona.ID} - Timestamp: ${persona.Timestamp}</p>`;
        });

        html += `<h2>Hombres:</h2>`;
        items[1].forEach((persona, index) => {
            html += `<p>${index + 1}. Nombre: ${persona.nombre} - Apellido: ${persona.apellido} - ID: ${persona.ID} - Timestamp: ${persona.Timestamp}</p>`;
        });

        // Agregar botón de actualizar
        html += `<button id="actualizar" onclick="location.reload()">Agregar Paciente</button>`;

        // Enviar la salida HTML como respuesta
        res.send(html);

    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server andando...'))


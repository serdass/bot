require('dotenv').config();
const { MainDialog } = require('./mainDialog');
const { BotFrameworkAdapter } = require('botbuilder');
const express = require('express');

// Crear la aplicación de express
const app = express();
app.use(express.json());

// Configuración de Credenciales
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Manejo de Errores
adapter.onTurnError = async (context, error) => {
    console.error(`[onTurnError] Error: ${error.message}`);
    await context.sendActivity('Ocurrió un error inesperado en el bot.');
};

// Instancia de nuestro diálogo principal
const bot = new MainDialog();

// Ruta para escuchar mensajes y ejecutar el bot
app.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        await bot.run(context);
    });
});

// Configuración del puerto y inicio del servidor
const port = process.env.PORT || 3978;
app.listen(port, () => {
    console.log(`Bot está escuchando en el puerto ${port}`);
});
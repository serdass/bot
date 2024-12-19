const { ActivityHandler } = require('botbuilder');

class MainDialog extends ActivityHandler {
    constructor() {
        super();

        // Manejar mensajes entrantes
        this.onMessage(async (context, next) => {
            const userMessage = context.activity.text;
            await context.sendActivity(`Dijiste: ${userMessage}`);
            await next();
        });

        // Manejar usuarios que se unen a la conversación
        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = '¡Hola! Soy tu bot. Escribe algo para comenzar.';
            for (let member of membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    await context.sendActivity(welcomeText);
                }
            }
            await next();
        });
    }
}

module.exports.MainDialog = MainDialog;
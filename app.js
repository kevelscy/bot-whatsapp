const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const TwilioProvider = require('@bot-whatsapp/provider/twilio')
const MockAdapter = require('@bot-whatsapp/database/mock')


const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowDocs = addKeyword(['doc', 'documentacion', 'documentación']).addAnswer(
    [
        '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
        'https://bot-whatsapp.netlify.app/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🚀 Puedes aportar tu granito de arena a este proyecto',
        '[*opencollective*] https://opencollective.com/bot-whatsapp',
        '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
        '[*patreon*] https://www.patreon.com/leifermendez',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowDiscord = addKeyword(['discord']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido a este *Chatbot*')
    .addAnswer(
        [
            'te comparto los siguientes links de interes sobre el proyecto',
            '👉 *doc* para ver la documentación',
            '👉 *gracias*  para ver la lista de videos',
            '👉 *discord* unirte al discord',
        ],
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowDiscord]
    )

const buttonsFlow = addKeyword('botones').addAnswer('Este mensaje envia tres botones', {
    buttons: [{ body: 'doc' }, { body: 'gracias' }, { body: 'discord' }],
})

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, buttonsFlow])

    const adapterProvider = createProvider(TwilioProvider, {
        accountSid: 'AC5151bc6ad5a3f0e9ae22d56dc9baa22e',
        authToken: '9a5cdc19c052e62c3aa50f50d393b008',
        vendorNumber: '+15075688896',
    })

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
}

main()

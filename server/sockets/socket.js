const { io } = require('../server');
const { TicketControl } = require("../classes/ticket-control");

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on("conteoTicket", function(data, callback) {
        let conteo = ticketControl.siguiente();
        console.log(conteo);
        callback(conteo);
    });

    // Enviamos último ticket "estadoActual"
    client.emit("estadoActual", {
        ticket: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });


    client.on("atenderTicket", (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        client.broadcast.emit("ultimos4", {
            ultimos4: ticketControl.getUltimos4()
        });
    })
});
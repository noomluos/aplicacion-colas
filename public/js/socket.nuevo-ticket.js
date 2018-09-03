// Comando para establecer la conexión
var socket = io();
var label = $('#lblNuevoTicket');


socket.on("connect", function() {
    console.log("Conectado al servidor");
});

socket.on("disconnect", function() {
    console.log("Perdimos conexión con el servidor");
});
socket.on("conteoTicket", function(mensaje) {
    console.log(mensaje);
});
socket.on("estadoActual", function(ticket) {
    label.text(ticket.ticket);
});

$("button").on("click", function() {
    socket.emit("conteoTicket", null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });

})
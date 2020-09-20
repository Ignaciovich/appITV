const getCitas = () => {
    return [
        newCita({usuario: 1, coche: "7992 XYZ", estacion: 1, operario: 1, fecha: "09/16/20", hora: "15:00", evaluacion: 1, observaciones: "Pues aqui y alli, ya sabesaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}),
        newCita({usuario: 1, coche: "7992 XYZ", estacion: 1, operario: 2, fecha: "09/16/20", hora: "15:00", evaluacion: 1, observaciones: "Oh hi mark"}),
        newCita({usuario: 1, coche: "7992 XYZ", estacion: 1, operario: 2, fecha: "09/16/20", hora: "15:00", evaluacion: 1, observaciones: "MI pana miguel"}),
        newCita({usuario: 1, coche: "7992 XYZ", estacion: 1, operario: 2, fecha: "09/16/20", hora: "15:00", evaluacion: 1, observaciones: "Corte empresario ultrafachero"}),
        newCita({usuario: 1, coche: "7992 XYZ", estacion: 1, operario: 2, fecha: "09/16/20", hora: "15:00", evaluacion: 1, observaciones: "Mira como esta el arroyo, que pena que no este cementado"}),
        newCita({usuario: 1, coche: "7992 XYZ", estacion: 1, operario: 2, fecha: "09/16/20", hora: "15:00", evaluacion: 1, observaciones: "Bueno ya no se que más poner la verdad."}),
        newCita({usuario: 1, coche: "7992 XYZ", estacion: 1, operario: 1, fecha: "09/16/20", hora: "15:00", evaluacion: 1, observaciones: "Cita totalmente inventada sin animo de ofender a nadie asi que no caras tristes"}),
        newCita({usuario: 1, coche: "7992 XYZ", estacion: 1, operario: 1, fecha: "09/16/20", hora: "15:00", evaluacion: 1, observaciones: "115"}),
        newCita({usuario: 1, coche: "7992 XYZ", estacion: 1, operario: 1, fecha: "09/16/20", hora: "15:00", evaluacion: 1, observaciones: "Que ganitas de que salga shadowlands"}),
    ]
};

const getCitasByUsuario = (usuario) => {
    const lista = getCitas();
    const filtro = [];

    lista.map((item) => {
        if(item.usuario == usuario){
            filtro.push(newCita(item));
        } 
    });

    return filtro;
};

const getCitasByOperario = (operario) =>  {
    const lista = getCitas();
    const filtro = [];

    lista.map((item) => {
        if(item.operario == operario){
            filtro.push(newCita(item));
        } 
    });

    return filtro;
};

const getCitasByFecha = (fecha) => {
    const lista = getCitas();
    const filtro = [];

    lista.map((item) => {
        if(item.fecha == fecha){
            filtro.push(newCita(item));
        } 
    });

    return filtro;
};

const getCitasByCoche = (coche) => {
    const lista = getCitas();
    const filtro = [];

    lista.map((item) => {
        if(item.coche == coche){
            filtro.push(newCita(item));
        } 
    });

    return filtro;
};

const newCita = cita => ({
    usuario: cita.usuario,
    coche: cita.coche,
    estacion: cita.estacion,
    operario: cita.operario,
    fecha: cita.fecha,
    hora: cita.hora,
    evaluacion: cita.evaluacion,
    observaciones: cita.observaciones,
});

export {getCitasByUsuario, getCitasByCoche, getCitasByFecha, getCitasByOperario};
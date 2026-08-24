const register = [];

function eventOne() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                eventName: "eventOne",
                eventType: "aviso largo",
                scheduledTime: Date.now(),
                realTime: Date.now()
            });
        }, 500);
    });
}

function eventTwo() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                eventName: "eventTwo",
                eventType: "aviso largo",
                scheduledTime: Date.now(),
                realTime: Date.now()
            });
        }, 530);
    });
}




function eventNever() {
    return new Promise(() => {
    });
}


async function runLimitCase() {

    console.log("Inicio del caso límite");

    const e1 = await eventOne();

    register.push(e1);

    console.log("Evento 1 ejecutado");

    const e2 = await eventTwo();

    register.push(e2);

    console.log("Evento 2 ejecutado");

    console.log("Esperando evento que nunca termina...");

    await eventNever();

    // Esta línea Esto nunca aparecerá

    console.log("Esto nunca aparecerá");
}

runLimitCase();
const refTime = Date.now();

function eventOne() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                eventName: "eventOne",
                eventType: "aviso largo",
                scheduledTime: refTime + 500,
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
                scheduledTime: refTime + 530,
                realTime: Date.now()
            });
        }, 530);
    });
}

function eventThree() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                eventName: "eventThree",
                eventType: "aviso largo",
                scheduledTime: refTime + 560,
                realTime: Date.now()
            });
        }, 560);
    });
}

function eventFour() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                eventName: "eventFour",
                eventType: "aviso largo",
                scheduledTime: refTime + 590,
                realTime: Date.now()
            });
        }, 590);
    });
}

function eventFive() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                eventName: "eventFive",
                eventType: "aviso largo",
                scheduledTime: refTime + 620,
                realTime: Date.now()
            });
        }, 620);
    });
}

function eventSix() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                eventName: "eventSix",
                eventType: "aviso largo",
                scheduledTime: refTime + 650,
                realTime: Date.now()
            });
        }, 650);
    });
}

function eventSeven() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                eventName: "eventSeven",
                eventType: "aviso largo",
                scheduledTime: refTime + 680,
                realTime: Date.now()
            });
        }, 680);
    });
}

function eventEight() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                eventName: "eventEight",
                eventType: "aviso largo",
                scheduledTime: refTime + 710,
                realTime: Date.now()
            });
        }, 710);
    });
}

// SECUENCIAL CON PROMESAS

const register = [];

eventOne()
    .then((e1) => {
        register.push(e1);
        return eventTwo();
    })
    .then((e2) => {
        register.push(e2);
        return eventThree();
    })
    .then((e3) => {
        register.push(e3);
        return eventFour();
    })
    .then((e4) => {
        register.push(e4);
        return eventFive();
    })
    .then((e5) => {
        register.push(e5);
        return eventSix();
    })
    .then((e6) => {
        register.push(e6);
        return eventSeven();
    })
    .then((e7) => {
        register.push(e7);
        return eventEight();
    })
    .then((e8) => {
        register.push(e8);

        processResults();
    })
    .catch((error) => {
        console.error("Error durante la ejecución:", error);
    });

// PROCESAMIENTO 

function processResults() {

    console.log("\nfinal promesas\n");

    console.log(register);

    

    const totalLatency = register.reduce(
        (accum, current) => {
            return accum + (
                current.realTime - current.scheduledTime
            );
        },
        0
    );


    const averageLatency = totalLatency / register.length;

    console.log(
        `Latencia promedio: ${averageLatency.toFixed(3)} ms`
    );


    const threshold = 10;

    const eventsOverThreshold = register
        .filter((event) => {
            const latency =
                event.realTime - event.scheduledTime;

            return latency > threshold;
        })
        .map((event) => event.eventName);


    console.log(
        "\nEventos con desviación mayor a 10 ms:"
    );

    console.log(eventsOverThreshold);


    const firstDelayedEvent = register.find((event) => {

        const latency =
            event.realTime - event.scheduledTime;

        return latency > threshold;
    });


    console.log(
        "\nPrimer evento con desviación mayor a 10 ms:"
    );

    console.log(firstDelayedEvent);
}
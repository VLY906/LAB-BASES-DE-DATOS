const refTime = Date.now();
// EVENTOS


async function eventOne() {

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


async function eventTwo() {

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


async function eventThree() {

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


async function eventFour() {

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


async function eventFive() {

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


async function eventSix() {

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


async function eventSeven() {

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


async function eventEight() {

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

// REGISTRO

const register = [];


// EJECUCIÓN CON ASYNC/AWAIT

async function run() {

    try {

        const e1 = await eventOne();
        register.push(e1);

        const e2 = await eventTwo();
        register.push(e2);

        const e3 = await eventThree();
        register.push(e3);

        const e4 = await eventFour();
        register.push(e4);

        const e5 = await eventFive();
        register.push(e5);

        const e6 = await eventSix();
        register.push(e6);

        const e7 = await eventSeven();
        register.push(e7);

        const e8 = await eventEight();
        register.push(e8);


        processResults();

    } catch (error) {

        console.error(
            "Error durante la ejecución:",
            error
        );
    }
}

function processResults() {

    console.log(
        "\nfinal\n"
    );

    console.log(register);

    const totalLatency = register.reduce(
        (accum, current) => {

            return accum + (
                current.realTime - current.scheduledTime
            );

        },
        0
    );


    const averageLatency =
        totalLatency / register.length;


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

run();
const refTime = Date.now();

function eventOne(callback) {
    setTimeout(() => {
        callback({
            eventName: "eventOne",
            eventType: "aviso largo",
            scheduledTime: refTime + 500,
            realTime: Date.now()
        });
    }, 500);
}

function eventTwo(callback) {
    setTimeout(() => {
        callback({
            eventName: "eventTwo",
            eventType: "aviso largo",
            scheduledTime: refTime + 530,
            realTime: Date.now()
        });
    }, 530);
}

function eventThree(callback) {
    setTimeout(() => {
        callback({
            eventName: "eventThree",
            eventType: "aviso largo",
            scheduledTime: refTime + 530,
            realTime: Date.now()
        });
    }, 530);
}

function eventFour(callback) {
    setTimeout(() => {
        callback({
            eventName: "eventFour",
            eventType: "aviso largo",
            scheduledTime: refTime + 530,
            realTime: Date.now()
        });
    }, 530);
}

function eventFive(callback) {
    setTimeout(() => {
        callback({
            eventName: "eventFive",
            eventType: "aviso largo",
            scheduledTime: refTime + 530,
            realTime: Date.now()
        });
    }, 530);
}

function eventSix(callback) {
    setTimeout(() => {
        callback({
            eventName: "eventSix",
            eventType: "aviso largo",
            scheduledTime: refTime + 530,
            realTime: Date.now()
        });
    }, 530);
}

function eventSeven(callback) {
    setTimeout(() => {
        callback({
            eventName: "eventSeven",
            eventType: "aviso largo",
            scheduledTime: refTime + 530,
            realTime: Date.now()
        });
    }, 530);
}

function eventEight(callback) {
    setTimeout(() => {
        callback({
            eventName: "eventEight",
            eventType: "aviso largo",
            scheduledTime: refTime + 530,
            realTime: Date.now()
        });
    }, 530);
}


const register = [];

eventOne((e1) => {
    register.push(e1);

    eventTwo((e2) => {
        register.push(e2);

        eventThree((e3) => {
            register.push(e3);

            eventFour((e4) => {
                register.push(e4);

                eventFive((e5) => {
                    register.push(e5);

                    eventSix((e6) => {
                        register.push(e6);

                        eventSeven((e7) => {
                            register.push(e7);

                            eventEight((e8) => {
                                register.push(e8);

                                processResults();
                            });
                        });
                    });
                });
            });
        });
    });
});


function processResults() {

    console.log("========== BITÁCORA FINAL ==========");
    console.log(register);


    // ==========================================
    // REDUCE: LATENCIA PROMEDIO
    // ==========================================

    const totalLatency = register.reduce(
        (accum, current) => {
            return accum +
                (current.realTime - current.scheduledTime);
        },
        0
    );

    const averageLatency =
        totalLatency / register.length;

    console.log(
        `Latencia promedio: ${averageLatency} ms`
    );


    // ==========================================
    // FILTER + MAP
    // Eventos con desviación mayor a 10 ms
    // ==========================================

    const threshold = 10;

    const eventsOverThreshold = register
        .filter(event =>
            (event.realTime - event.scheduledTime) > threshold
        )
        .map(event => event.eventName);

    console.log(
        "Eventos con desviación mayor a 10 ms:"
    );

    console.log(eventsOverThreshold);


    // ==========================================
    // FIND
    // Primer evento con desviación > 10 ms
    // ==========================================

    const firstDelayedEvent = register.find(
        event =>
            (event.realTime - event.scheduledTime) > threshold
    );

    console.log(
        "Primer evento con desviación mayor a 10 ms:"
    );

    console.log(firstDelayedEvent);
}
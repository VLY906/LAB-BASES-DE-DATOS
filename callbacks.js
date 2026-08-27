function createCallbackEvent(eventName, delay, callback) {
    const scheduledTime = Date.now() + delay;
    setTimeout(() => {
        try {
            callback(null, {
                eventName: eventName,
                eventType: "long_notice",
                scheduledTime: scheduledTime,
                realTime: Date.now()
            });
        } catch (error) {
            callback(error, null);
        }
    }, delay);
}

const register = [];

createCallbackEvent("eventOne", 500, (err, eventData1) => {
    if (err) return console.error("Execution error:", err);
    register.push(eventData1);

    createCallbackEvent("eventTwo", 530, (err, eventData2) => {
        if (err) return console.error("Execution error:", err);
        register.push(eventData2);

        createCallbackEvent("eventThree", 560, (err, eventData3) => {
            if (err) return console.error("Execution error:", err);
            register.push(eventData3);

            createCallbackEvent("eventFour", 590, (err, eventData4) => {
                if (err) return console.error("Execution error:", err);
                register.push(eventData4);

                createCallbackEvent("eventFive", 620, (err, eventData5) => {
                    if (err) return console.error("Execution error:", err);
                    register.push(eventData5);

                    createCallbackEvent("eventSix", 650, (err, eventData6) => {
                        if (err) return console.error("Execution error:", err);
                        register.push(eventData6);

                        createCallbackEvent("eventSeven", 680, (err, eventData7) => {
                            if (err) return console.error("Execution error:", err);
                            register.push(eventData7);

                            createCallbackEvent("eventEight", 710, (err, eventData8) => {
                                if (err) return console.error("Execution error:", err);
                                register.push(eventData8);

                                processResults(register);
                            });
                        });
                    });
                });
            });
        });
    });
});

function processResults(eventRegister) {
    const totalLatency = eventRegister.reduce((accum, current) => {
        return accum + (current.realTime - current.scheduledTime);
    }, 0);

    const averageLatency = totalLatency / eventRegister.length;
    const threshold = 10;

    const eventsOverThreshold = eventRegister
        .filter((event) => (event.realTime - event.scheduledTime) > threshold)
        .map((event) => event.eventName);

    const firstDelayedEvent = eventRegister.find(
        (event) => (event.realTime - event.scheduledTime) > threshold
    );

    printResults(eventRegister, averageLatency, eventsOverThreshold, firstDelayedEvent);
}

function printResults(eventRegister, avgLatency, overThreshold, firstDelayed) {
    console.log("\n--- Final Callbacks Results ---");
    console.log("Register:", eventRegister);
    console.log(`Average Latency: ${avgLatency.toFixed(3)} ms`);
    console.log("Events over 10ms threshold:", overThreshold);
    console.log("First delayed event:", firstDelayed);
}

function createPromiseEvent(eventName, delay) {
    return new Promise((resolve) => {
        const scheduledTime = Date.now() + delay;
        setTimeout(() => {
            resolve({
                eventName: eventName,
                eventType: "long_notice",
                scheduledTime: scheduledTime,
                realTime: Date.now()
            });
        }, delay);
    });
}

const register = [];

createPromiseEvent("eventOne", 500)
    .then((eventData1) => {
        register.push(eventData1);
        return createPromiseEvent("eventTwo", 530);
    })
    .then((eventData2) => {
        register.push(eventData2);
        return createPromiseEvent("eventThree", 560);
    })
    .then((eventData3) => {
        register.push(eventData3);
        return createPromiseEvent("eventFour", 590);
    })
    .then((eventData4) => {
        register.push(eventData4);
        return createPromiseEvent("eventFive", 620);
    })
    .then((eventData5) => {
        register.push(eventData5);
        return createPromiseEvent("eventSix", 650);
    })
    .then((eventData6) => {
        register.push(eventData6);
        return createPromiseEvent("eventSeven", 680);
    })
    .then((eventData7) => {
        register.push(eventData7);
        return createPromiseEvent("eventEight", 710);
    })
    .then((eventData8) => {
        register.push(eventData8);
        processResults(register);
    })
    .catch((error) => {
        console.error("Execution error:", error);
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
    console.log("\n--- Final Promises Results ---");
    console.log("Register:", eventRegister);
    console.log(`Average Latency: ${avgLatency.toFixed(3)} ms`);
    console.log("Events over 10ms threshold:", overThreshold);
    console.log("First delayed event:", firstDelayed);
}

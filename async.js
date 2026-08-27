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

async function runAsyncExecution() {
    try {
        const eventData1 = await createPromiseEvent("eventOne", 500);
        register.push(eventData1);

        const eventData2 = await createPromiseEvent("eventTwo", 530);
        register.push(eventData2);

        const eventData3 = await createPromiseEvent("eventThree", 560);
        register.push(eventData3);

        const eventData4 = await createPromiseEvent("eventFour", 590);
        register.push(eventData4);

        const eventData5 = await createPromiseEvent("eventFive", 620);
        register.push(eventData5);

        const eventData6 = await createPromiseEvent("eventSix", 650);
        register.push(eventData6);

        const eventData7 = await createPromiseEvent("eventSeven", 680);
        register.push(eventData7);

        const eventData8 = await createPromiseEvent("eventEight", 710);
        register.push(eventData8);

        processResults(register);
    } catch (error) {
        console.error("Execution error:", error);
    }
}

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
    console.log("\n--- Final Async/Await Results ---");
    console.log("Register:", eventRegister);
    console.log(`Average Latency: ${avgLatency.toFixed(3)} ms`);
    console.log("Events over 10ms threshold:", overThreshold);
    console.log("First delayed event:", firstDelayed);
}

runAsyncExecution();

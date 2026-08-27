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

function eventNever() {
    return new Promise(() => {
        // Intentionally missing resolve() and reject()
    });
}

const register = [];

async function runLimitCase() {
    console.log("Starting limit case execution...");

    const eventData1 = await createPromiseEvent("eventOne", 500);
    register.push(eventData1);
    console.log("Event 1 executed successfully.");

    const eventData2 = await createPromiseEvent("eventTwo", 530);
    register.push(eventData2);
    console.log("Event 2 executed successfully.");

    console.log("Waiting for an event that never finishes...");
    
    await eventNever();

    console.log("This line will never appear.");
}

runLimitCase();
    // Esta línea Esto nunca aparecerá

    console.log("Esto nunca aparecerá");
}

runLimitCase();

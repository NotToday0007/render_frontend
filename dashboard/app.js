document.getElementById("runBtn").addEventListener("click", runTest);

async function runTest() {
    const statusBox = document.getElementById("status");
    const vncFrame = document.getElementById("vnc-frame");

    statusBox.innerHTML = "⚡ Starting test… please wait.";

    try {
        const response = await fetch("http://13.232.238.6:3000/run");
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        statusBox.innerHTML = "";
        
        // Print logs LIVE
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            statusBox.innerHTML += decoder.decode(value);
        }

        // Show VNC live view after test starts
        vncFrame.src = `http://13.232.238.6:3000/`;

    } catch (err) {
        statusBox.innerHTML = "❌ Failed to run test. Check server.";
        console.error(err);
    }
}

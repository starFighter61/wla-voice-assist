exports.handler = async () => {
    // 1. Get the key from Netlify Environment Variables
    const key = process.env.DEEPGRAM_API_KEY;

    // 2. Safety Check: Did you forget to add the key in Netlify?
    if (!key) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "No API Key found in Netlify Settings." })
        };
    }

    // 3. Send the key to the frontend so the Mic works
    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: key }),
    };
};
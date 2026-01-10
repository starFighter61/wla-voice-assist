exports.handler = async () => {
    // This tells Netlify: "Go get the key from the secure dashboard"
    const key = process.env.DEEPGRAM_API_KEY;

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: key }),
    };
};
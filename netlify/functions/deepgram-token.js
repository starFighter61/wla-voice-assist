exports.handler = async () => {
    const key = process.env.DEEPGRAM_API_KEY;
    if (!key) return { statusCode: 500, body: JSON.stringify({ error: "Missing Key" }) };
    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: key }),
    };
};
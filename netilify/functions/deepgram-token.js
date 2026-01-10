export default async (req) => {
  // CORS (safe defaults; tighten to your domain if you want)
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
  };

  if (req.method === "OPTIONS") {
    return new Response("", { status: 204, headers: corsHeaders });
  }

  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const apiKey = process.env.DEEPGRAM_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Missing DEEPGRAM_API_KEY env var" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Optional: you can request a longer TTL (max 3600 seconds). Defaults to 30 seconds. :contentReference[oaicite:1]{index=1}
  const payload = { ttl_seconds: 60 };

  try {
    const dgResp = await fetch("https://api.deepgram.com/v1/auth/grant", {
      method: "POST",
      headers: {
        "Authorization": `Token ${apiKey}`, // Deepgram requires "Token <API_KEY>" for /auth/grant :contentReference[oaicite:2]{index=2}
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await dgResp.json();

    if (!dgResp.ok) {
      return new Response(JSON.stringify({ error: "Deepgram error", details: data }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // data = { access_token, expires_in } :contentReference[oaicite:3]{index=3}
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error", details: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

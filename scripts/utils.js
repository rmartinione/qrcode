// Função para encurtar link via Bitly
async function encurtarLinkBitly(link) {
    const accessToken = '788e2b5106578517c9c0acb569ec0dc449751d15'; // Substitua pelo seu Access Token do Bitly
    const url = 'https://api-ssl.bitly.com/v4/shorten';
    const data = { "long_url": link };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            const shortLink = jsonResponse.link;
            document.getElementById("linkEncurtado").innerText = `Link encurtado (Bitly): ${shortLink}`;
        } else {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'Erro ao encurtar URL no Bitly');
        }
    } catch (error) {
        console.error('Erro ao tentar encurtar a URL no Bitly:', error);
        document.getElementById("linkEncurtado").innerText = `Erro ao encurtar URL: ${error.message}`;
    }
}

// Função para encurtar link via TinyURL
async function encurtarLinkTinyURL(link) {
    const apiKey = 'cq4EAvN6vcMaLP7D5tWqm0Exu0zF3wLRu3G8ss1HTGZMMFnMovP4iS1PAwL2';
    const url = 'https://api.tinyurl.com/create';
    const data = { url: link, domain: "tinyurl.com" };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            document.getElementById("linkEncurtado").innerText = `Link encurtado: ${jsonResponse.data.tiny_url}`;
        } else {
            const errorResponse = await response.json();
            throw new Error(errorResponse.errors?.[0]?.message || 'Erro ao encurtar URL no TinyURL');
        }
    } catch (error) {
        console.error('Erro ao tentar encurtar a URL no TinyURL:', error);
        document.getElementById("linkEncurtado").innerText = `Erro ao encurtar URL: ${error.message}`;
    }
}
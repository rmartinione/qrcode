// Função para exibir/ocultar o campo de tamanho personalizado
function toggleCustomSize(value) {
    const customSizeContainer = document.getElementById("customSizeContainer");
    if (value === "custom") {
        customSizeContainer.style.display = "flex";
    } else {
        customSizeContainer.style.display = "none";
    }
}

// Função para gerar o QR Code
function gerarQRCode() {
    const link = document.getElementById("link").value.trim();
    const service = document.querySelector('input[name="service"]:checked').value;
    const errorElement = document.getElementById("error");
    errorElement.textContent = '';

    if (!link) {
        errorElement.textContent = "Por favor, insira um link válido.";
        return;
    }
    if (!isValidURL(link)) {
        errorElement.textContent = "O link inserido não é válido.";
        return;
    }

    gerarQRCodeImagem(link);
    if (service === 'bitly') {
        console.log("Encurtando com Bitly");
        encurtarLinkBitly(link); // Agora utiliza a função do utils.js
    } else if (service === 'tinyurl') {
        console.log("Encurtando com TinyURL");
        encurtarLinkTinyURL(link); // Agora utiliza a função do utils.js
    } else if (service === 'qrcodegen') {
        console.log("Não encurtando");
        document.getElementById("linkEncurtado").innerText = `Link não encurtado (QR Code Generator)`;
    }
}

// Função para verificar se o URL é válido
function isValidURL(url) {
    const pattern = new RegExp('^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$', 'i');
    return pattern.test(url);
}

// Função para gerar a imagem do QR Code
function gerarQRCodeImagem(link) {
    let tamanho = document.getElementById("tamanho").value;
    if (tamanho === "custom") {
        const customWidth = document.getElementById("customWidth").value;
        const customHeight = document.getElementById("customHeight").value;

        console.log("Largura:", customWidth);
        console.log("Altura:", customHeight);

        if (!customWidth || !customHeight || customWidth < 100 || customHeight < 100 || customWidth > 1000 || customHeight > 1000) {
            document.getElementById("error").textContent = "Insira valores válidos para largura e altura (entre 100 e 1000).";
            return;
        }

        tamanho = `${customWidth}x${customHeight}`;
    }
    const correcao = document.getElementById("correcao").value;
    const qrCodeImg = document.getElementById("qrCodeImg");

    console.log("Link:", link);
    console.log("Tamanho:", tamanho);
    console.log("Correção:", correcao);

    qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=${tamanho}&data=${encodeURIComponent(link)}&ecc=${correcao}`;
    document.getElementById("qrCodeContainer").style.display = "block";
    document.getElementById("feedback").innerText = "QR Code gerado com sucesso!";
}

// Função para limpar os campos
function limparCampos() {
    document.getElementById("qrForm").reset();
    document.getElementById("qrCodeContainer").style.display = "none";
    document.getElementById("feedback").innerText = '';
    document.getElementById("linkEncurtado").innerText = '';
    document.getElementById("error").textContent = '';
}

document.getElementById("qrForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    gerarQRCode(); // Chama a função para gerar o QR Code
});

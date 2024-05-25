
var bodyStyle = document.createElement('style');
bodyStyle.id = 'bodyStyle';
bodyStyle.textContent = `
    body {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        margin: 0;
        background-color: #111;
        font-family: 'Roboto', sans-serif;
        color: white;
    }
`;

var loadingStyle = document.createElement('style');
loadingStyle.id = 'loadingStyle';
loadingStyle.textContent = `
    .loader {
        border: 8px solid #3498db;
        border-radius: 50%;
        border-top: 8px solid #f1c40f;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
document.head.appendChild(bodyStyle);
document.head.appendChild(loadingStyle);
var pathName = window.location.pathname;
fetch("https://imdevlol.pythonanywhere.com/1" + pathName, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})
.then(response => response.text())
.then(data => {
    var loader = document.getElementById('loader');
    var body = document.querySelector('#bodyStyle');
    if (data.startsWith("/")) {
        window.location.href = data;
    } else {
        loader.parentNode.removeChild(loader);
        body.parentNode.removeChild(body)
        document.body.innerHTML = data;
    }
})
.catch(error => {
    console.error(error);
    console.error("Invalid URL path name");
});

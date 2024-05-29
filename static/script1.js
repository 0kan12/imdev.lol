// Create a style element for body
var bodyStyle = document.createElement('style');
bodyStyle.id = 'bodyStyle';
bodyStyle.textContent = `
    body {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        margin: 0;
        background-color: #a9bbd1;
        font-family: 'Roboto', sans-serif;
        color: white;
    }
    .loader {
        animation: spin 1s linear infinite, zoom 1s ease-in-out infinite alternate;
        max-width: 100px; /* Adjust the size as needed */
        max-height: 100px; /* Adjust the size as needed */
    }
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    @keyframes zoom {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(0.5); /* Adjust the size as needed */
        }
    }
`;

// Append the body style to the head
document.head.appendChild(bodyStyle);

// Create an image element for loading image
var loadingImage = document.createElement('img');
loadingImage.id = 'loadingImage';
loadingImage.src = 'https://cdn.imdev.lol/assets/logo.png'; // Replace 'path_to_your_image.gif' with your image path
loadingImage.classList.add('loader');
document.body.appendChild(loadingImage);

// Get the pathname of the current URL
var pathName = window.location.pathname;

// Fetch data from the server
fetch("https://imdevlol.pythonanywhere.com/1" + pathName, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})
.then(response => response.text())
.then(data => {
    // Get the loading image element
    var loadingImage = document.getElementById('loadingImage');

    // Check if the data is a URL path
    if (data.startsWith("/")) {
        // Redirect to the fetched URL
        window.location.href = data;
    } else {
        // Remove the loading image
        loadingImage.parentNode.removeChild(loadingImage);

        // Remove the body style
        var body = document.querySelector('#bodyStyle');
        body.parentNode.removeChild(body);

        // Replace the document body with the fetched data
        document.body.innerHTML = data;
    }
})
.catch(error => {
    // Log and handle errors
    console.error(error);
    console.error("Invalid URL path name");
});

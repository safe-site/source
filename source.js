const passwordForm = document.querySelector("#password-form");
  const passwordInput = document.querySelector("#password-input");
  const convertForm = document.querySelector("#convert-form");
  const urlInput = document.querySelector("#url");
  const downloadLink = document.querySelector("#download");
  const codeBlock = document.querySelector("#code");
  const copyCodeBtn = document.querySelector("#copy-code-btn");
  
  passwordForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const password = passwordInput.value;
    
    // Replace 'your-password' with your desired password
    if (password === "1234") {
      passwordForm.style.display = "none";
      convertForm.style.display = "block";
    } else {
      alert("Incorrect password. Please try again.");
    }
  });
  
  convertForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const url = urlInput.value;
    
    fetch(url)
      .then(response => response.text())
      .then(data => {
        // Set the textContent of the code block to the HTML source code
        codeBlock.textContent = data;
  
        // Show the download and copy buttons
        downloadLink.innerHTML = `
          <button onclick="downloadHTML()">Download HTML</button>
          <button onclick="downloadCSS()">Download CSS</button>
          <button onclick="downloadJS()">Download JavaScript</button>
        `;
        copyCodeBtn.style.display = "inline-block";
      })
      .catch(error => {
        console.error(error);
        alert("There was an error fetching the web page. Please check the URL and try again.");
      });
  });
  
  function downloadHTML() {
    const data = codeBlock.textContent;
    const blob = new Blob([data], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'converted.html';
    link.click();
  }
  
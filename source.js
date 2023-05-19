const convertForm = document.querySelector("#convert-form");
      const urlInput = document.querySelector("#url");
      const downloadLink = document.querySelector("#download");
      const codeBlock = document.querySelector("#code");
      const copyCodeBtn = document.querySelector("#copy-code-btn");
      
      convertForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const url = urlInput.value;
        
        fetch(url)
          .then(response => response.text())
          .then(data => {
            // Set the textContent of the code block to the HTML source code
            codeBlock.textContent = data;
            
            // Show the download and copy buttons
            downloadLink.innerHTML = `<a href="data:text/plain;charset=utf-8,${encodeURIComponent(data)}" download="converted.html">Download HTML</a>`;
            copyCodeBtn.style.display = "inline-block";
          })
          .catch(error => {
            console.error(error);
            alert("There was an error fetching the web page. Please check the URL and try again.");
          });
});
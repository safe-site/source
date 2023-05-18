const convertForm = document.querySelector("#convert-form");
const urlInput = document.querySelector("#url");
const downloadLink = document.querySelector("#download");
const codeBlock = document.querySelector("#code");
const copyCodeBtn = document.querySelector("#copy-code-btn");
const customCss = document.querySelector("#custom-css");
const customJs = document.querySelector("#custom-js");

convertForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const url = urlInput.value;

  Promise.all([
    fetch(url).then(response => response.text()), // Fetch HTML content
    fetch(url).then(response => response.text()), // Fetch CSS content
    fetch(url).then(response => response.text())  // Fetch JavaScript content
  ])
    .then(data => {
      const htmlData = data[0];
      const cssData = data[1];
      const jsData = data[2];

      // Set the textContent of the code block to the HTML source code
      codeBlock.textContent = htmlData;

      // Inject custom CSS and JS into the preview
      const preview = document.querySelector("#preview");
      preview.innerHTML = htmlData;
      customCss.textContent = cssData;
      customJs.textContent = jsData;

      // Show the download and copy buttons
      downloadLink.innerHTML = `<a href="data:text/html;charset=utf-8,${encodeURIComponent(htmlData)}" download="converted_page.html">Download HTML</a>`;
      downloadLink.style.display = "inline-block";
      copyCodeBtn.style.display = "inline-block";
    })
    .catch(error => {
      console.error(error);
      alert("There was an error fetching the web page. Please check the URL and try again.");
    });
});

copyCodeBtn.addEventListener("click", () => {
  const code = codeBlock.textContent;
  navigator.clipboard.writeText(code)
    .then(() => {
      alert("Code copied to clipboard!");
    })
    .catch(error => {
      console.error(error);
      alert("Failed to copy code to clipboard.");
    });
});

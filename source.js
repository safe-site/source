<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Convert Web Page to <a href="https://9508914855.github.io/link-tree/" target="_blank" class="my-link">HTML file</a></title>
  <style>
    /* Your CSS styles here */

    #code-pad {
      display: none;
    }

    /* Rest of your CSS styles */
  </style>
</head>

  const passwordForm = document.querySelector("#password-form");
  const passwordInput = document.querySelector("#password-input");
  const convertForm = document.querySelector("#convert-form");
  const urlInput = document.querySelector("#url");
  const downloadLink = document.querySelector("#download");
  const codeBlock = document.querySelector("#code-pad");
  const copyCodeBtn = document.querySelector("#copy-code-btn");

  passwordForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const password = passwordInput.value;

    // Replace 'your-password' with your desired password
    if (password === "your-password") {
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
        // Set the textContent of the code pad to the HTML source code
        codeBlock.textContent = data;

        // Show the download and copy buttons
        downloadLink.innerHTML = `
          <button onclick="downloadHTML()">Download HTML</button>
          <button onclick="downloadCSS()">Download CSS</button>
          <button onclick="downloadJS()">Download JavaScript</button>
        `;
        copyCodeBtn.style.display = "inline-block";
        codeBlock.style.display = "block";
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

  function downloadCSS() {
    const data = getCSSFromCode();
    const blob = new Blob([data], { type: 'text/css' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'styles.css';
    link.click();
  }

    function downloadJS() {
    const data = getJSFromCode();
    const blob = new Blob([data], { type: 'text/javascript' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'script.js';
    link.click();
  }

  function getCSSFromCode() {
    const styleTags = document.getElementsByTagName('style');
    let cssCode = '';

    for (let i = 0; i < styleTags.length; i++) {
      cssCode += styleTags[i].innerText;
    }

    return cssCode;
  }

  function getJSFromCode() {
    const scriptTags = document.getElementsByTagName('script');
    let jsCode = '';

    for (let i = 0; i < scriptTags.length; i++) {
      jsCode += scriptTags[i].innerText;
    }

    return jsCode;
  }

  copyCodeBtn.addEventListener('click', () => {
    const range = document.createRange();
    range.selectNode(codeBlock);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    alert('Code copied to clipboard!');
  });


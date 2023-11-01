document.addEventListener("DOMContentLoaded", function () {
    const uploadForm = document.getElementById("upload-form");
    const fileInput = document.getElementById("file");
    const textSpan = document.querySelector(".text span");
    const uploadIcon = document.querySelector(".icon svg");
  
    uploadForm.addEventListener("submit", function (event) {
        event.preventDefault();
  
        // Show the loader
        window.location.href = "/show_loader";
  
        // Create a FormData object from the form
        let formData = new FormData(uploadForm);
  
        // Send the form data to the server
        fetch("/analyze", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                // Redirect to the results page
                window.location.href = "/show_results";
            })
            .catch(error => console.error(error));
    });
  
    fileInput.addEventListener("change", function () {
        if (fileInput.files.length > 0) {
            textSpan.textContent = "Uploaded!";
            textSpan.style.color = "green";
            uploadIcon.style.fill = "green"; // Change the fill color to green
        } else {
            textSpan.textContent = "Click to upload image";
            textSpan.style.color = ""; // Reset the color
            uploadIcon.style.fill = ""; // Reset the fill color
        }
    });
  });
  
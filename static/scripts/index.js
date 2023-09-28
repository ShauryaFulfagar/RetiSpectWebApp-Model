document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file");
    const textSpan = document.querySelector(".text span");
    const uploadIcon = document.querySelector(".icon svg");

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

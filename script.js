document.getElementById("myForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  // Retrieve form values
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;

  // Create JSON object with form data
  var formData = {
    "name": name,
    "email": email
  };

  // Retrieve existing JSON data from the GitHub repository
  fetch('https://api.github.com/repos/{username}/{repository}/contents/data.json')
    .then(response => response.json())
    .then(data => {
      // Decode the existing JSON data
      var existingData = JSON.parse(atob(data.content));

      // Merge the form data with existing JSON data
      Object.assign(existingData, formData);

      // Encode the updated data
      var updatedData = btoa(JSON.stringify(existingData));

      // Update the JSON file on the GitHub repository
      updateJsonFile(updatedData, data.sha);
    })
    .catch(error => console.error(error));

  // Clear the form fields
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";

  console.log("JSON file updated");
});

function updateJsonFile(data, sha) {
  var updateData = {
    "message": "Update JSON file",
    "content": data,
    "sha": sha
  };

  fetch('https://api.github.com/repos/suryavarma75/cv/contents/data.json', {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer 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',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

const urlParams = new URLSearchParams(window.location.search);
const successMessage = urlParams.get('success');
const errorMessage = urlParams.get('error');
if (successMessage) {
  document.getElementById('message').textContent = successMessage;
} else if (errorMessage) {
  document.getElementById('message').textContent = errorMessage;
}

window.addEventListener('load', () => {
  fetch('/getConfig')
    .then(response => response.json())
    .then(configData => {
      document.getElementById('tweet1').value = configData.tweets.tweet1 || '';
      document.getElementById('tweet2').value = configData.tweets.tweet2 || '';
      document.getElementById('tweet3').value = configData.tweets.tweet3 || '';
      document.getElementById('linkedin1').value = configData.linkedin.post1 || '';
      document.getElementById('linkedin2').value = configData.linkedin.post2 || '';
      document.getElementById('linkedin3').value = configData.linkedin.post3 || '';

      // // Populate and edit the Publications section based on configData.publications
      // populatePublications(configData.publications);
      // Populate Publication inputs
      configData.publications.forEach((publication, index) => {
        console.log('index: ', index);
        createPublicationInputs(publication, index);
      });
    });
});

// Add event listener to the "Save Changes" button
document.getElementById('save-changes-button').addEventListener('click', (event) => {
  event.preventDefault();
  if (confirm('Are you sure you want to save changes?')) {
    saveChanges();
  }
});


// Initialize Sortable for reordering publications
const publicationsContainer = document.getElementById('publications-container');
const sortable = new Sortable(publicationsContainer, {
  animation: 150,
  handle: '.sortable-handle', // Use a handle for dragging
});


// Function to create a new empty publication item
function addNewPublication() {
  const newIndex = publicationsContainer.getElementsByClassName('publication-item').length;

  // Create an empty publication object
  const newPublication = {
    "Title": "",
    "Link": "",
    "Anchor Text": "",
    "Year of Publication": null,
    "Tags": "",
    "Additional Comments": "",
  };

  // Create input fields for the new publication
  createPublicationInputs(newPublication, newIndex, true);
  updatePublicationIndexes();
}

// Add event listener to the "Add New Publication" button
document.getElementById('add-publication-button').addEventListener('click', (event) => {
  event.preventDefault();
  addNewPublication();
});


// Function to create input fields for a publication
function createPublicationInputs(publication, index, prependToTop=false) {
  const publicationDiv = document.createElement('div');
  publicationDiv.className = 'mb-4 publication-item relative p-4';
  publicationDiv.dataset.index = index; // Add a data-index attribute to track order
  const nameAttribute = `publications[${index}]`; // Define the name attribute

  publicationDiv.innerHTML = `
          <div class="flex items-center justify-between cursor-pointer" id="publication-header-${index}">
              <div class="sortable-handle flex items-center justify-between">
                <img src="assets/images/dots-6-vertical-svgrepo-com.svg" alt="Icon" class="h-5 w-5 text-gray-400 hover:text-gray-600">
                  <svg class="h-5 w-5">
                  </svg>
              </div>
              <div id="publication-title-display-${index}" class="p-5">${publication.Title || ''}</div>
              <div class="text-blue-600 hover:text-blue-800 flex items-center justify-between">
                  <img src="assets/images/expand-svgrepo-com.svg" alt="Icon" class="h-5 w-5">
                  <svg class="h-5 w-5">
                  </svg>
              </div>
              <button class="delete-button">
              <img src="assets/images/delete.svg" alt="Delete Icon" class="h-5 w-5">
              </button>
          </div>
          <div id="publication-content-${index}" class="hidden">
          <div class="flex justify-between items-center sortable-handle">
          <label for="publication-title-${index}" class="block text-sm font-medium text-gray-600">Title</label>
          </div>
              <input type="text" id="publication-title-${index}" name="${nameAttribute}.Title" class="mt-1 p-2 w-full rounded-md border border-gray-300" value="${publication.Title || ''}">
              
              <label for="publication-link-${index}" class="block text-sm font-medium text-gray-600">Link</label>
              <input type="text" id="publication-link-${index}" name="${nameAttribute}.Link" class="mt-1 p-2 w-full rounded-md border border-gray-300" value="${publication.Link || ''}">
              
              <label for="publication-anchor-${index}" class="block text-sm font-medium text-gray-600">Anchor Text</label>
              <input type="text" id="publication-anchor-${index}" name="${nameAttribute}.AnchorText" class="mt-1 p-2 w-full rounded-md border border-gray-300" value="${publication['Anchor Text'] || ''}">
              
              <label for="publication-year-${index}" class="block text-sm font-medium text-gray-600">Year of Publication</label>
              <input type="text" id="publication-year-${index}" name="${nameAttribute}.YearOfPublication" class="mt-1 p-2 w-full rounded-md border border-gray-300" value="${publication['Year of Publication'] || ''}">
              
              <label for="publication-tags-${index}" class="block text-sm font-medium text-gray-600">Tags</label>
              <input type="text" id="publication-tags-${index}" name="${nameAttribute}.Tags" class="mt-1 p-2 w-full rounded-md border border-gray-300" value="${publication.Tags || ''}">
              
              <label for="publication-comments-${index}" class="block text-sm font-medium text-gray-600">Additional Comments</label>
              <input type="text" id="publication-comments-${index}" name="${nameAttribute}.AdditionalComments" class="mt-1 p-2 w-full rounded-md border border-gray-300" value="${publication['Additional Comments'] || ''}">
          </div>
      `;

  // Create a remove button for each publication
  // const removeButton = document.createElement('button');
  // removeButton.className = 'absolute top-4 right-4 bg-transparent text-gray-400 hover:text-gray-600 rounded-full'; 
  // // removeButton.textContent = 'Remove';
  // removeButton.innerHTML = `<img src="assets/images/delete.svg" alt="Delete Icon" class="h-5 w-5">`;
  const removeButton = publicationDiv.querySelector('.delete-button');
  removeButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to remove this publication?')) {
      // Remove the publication card
      publicationDiv.remove();
      // Update publication indexes after removal
      updatePublicationIndexes();
      saveChanges();
    }
    else {
      console.log("remove button not confirmed!");
    }
  });


  // Append the remove button to the publicationDiv
  publicationDiv.querySelector('.sortable-handle').appendChild(removeButton);

  // Add click event to toggle visibility of publication content
  const header = publicationDiv.querySelector(`#publication-header-${index}`);
  const content = publicationDiv.querySelector(`#publication-content-${index}`);
  header.addEventListener('click', () => {
    content.classList.toggle('hidden');
  });

  // Add class for Sortable to recognize it as a draggable item
  publicationDiv.classList.add('list-group-item');

  // Add new publication input fields
  if (prependToTop) {
    // Prepend the publication input fields to the container
    publicationsContainer.prepend(publicationDiv);
  } else {
    // Append the publication input fields to the container
    publicationsContainer.appendChild(publicationDiv);
  }
}

// Initialize Sortable for reordering publications after adding items
sortable.option("filter", ".hidden");


// Function to update publication indexes after reordering or removal
function updatePublicationIndexes() {
  const publicationItems = publicationsContainer.getElementsByClassName('publication-item');
  for (let index = 0; index < publicationItems.length; index++) {
    const publicationDiv = publicationItems[index];
    const newIndex = index;
    const oldIndex = publicationDiv.dataset.index;
    if (newIndex !== oldIndex) {
      publicationDiv.dataset.index = newIndex; // Update the data-index attribute
      // Update IDs of elements inside the publicationDiv
      publicationDiv.querySelectorAll('[id^="publication-"]').forEach(element => {
        element.id = element.id.replace(oldIndex, newIndex);
      });
    }
  }
}


// Function and code to convert youtube URL to embed code

// function getId(url) {
//   const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
//   const match = url.match(regExp);

//   return (match && match[2].length === 11)
//     ? match[2]
//     : null;
// }
  
// const videoId = getId('http://www.youtube.com/watch?v=zbYf5_S7oJo');
// const iframeMarkup = '<iframe width="560" height="315" src="//www.youtube.com/embed/' 
//   + videoId + '" frameborder="0" allowfullscreen></iframe>';

// console.log('Video ID:', videoId);

// Using ombed API:
// https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=gBrmnB5aOSI&format=json
// The above API retursnns the following JSON output
// {
//   "type": "video",
//   "thumbnail_width": 480,
//   "provider_name": "YouTube",
//   "title": "Intro To Live Streaming on YouTube",
//   "thumbnail_height": 360,
//   "provider_url": "https://www.youtube.com/",
//   "version": "1.0",
//   "height": 270,
//   "author_name": "YouTube Creators",
//   "html": "<iframe width=\"480\" height=\"270\" src=\"https://www.youtube.com/embed/gBrmnB5aOSI?feature=oembed\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
//   "author_url": "https://www.youtube.com/user/creatoracademy",
//   "width": 480,
//   "thumbnail_url": "https://i.ytimg.com/vi/gBrmnB5aOSI/hqdefault.jpg"
// }

// the "html" property contains the embed code




// Function to save changes
function saveChanges() {
  console.log('calling function!');
  const publicationsData = [];
  const publicationItems = publicationsContainer.getElementsByClassName('publication-item');
  for (let index = 0; index < publicationItems.length; index++) {
    // dataset.index and publication-title-index are not consistent
    const publicationDiv = publicationItems[index];
    const titleInput = document.getElementById(`publication-title-${index}`);
    const linkInput = document.getElementById(`publication-link-${index}`);
    const anchorTextInput = document.getElementById(`publication-anchor-${index}`);
    const yearInput = document.getElementById(`publication-year-${index}`);
    const tagsInput = document.getElementById(`publication-tags-${index}`);
    const commentsInput = document.getElementById(`publication-comments-${index}`);

    if (titleInput) {
      const publication = {
        "Title": titleInput.value || "",
        "Link": linkInput.value || "",
        "Anchor Text": anchorTextInput.value || "",
        "Year of Publication": parseInt(yearInput.value) || null,
        "Tags": tagsInput.value || "",
        "Additional Comments": commentsInput.value || "",
      };
      publicationsData.push(publication);
    }
  }

  // Extract the ordered data and indexes
  const orderedPublications = Array.from(publicationItems).map((item) => {
    const index = item.dataset.index;
    return publicationsData[index];
  });

  const dataToSend = {
    "tweet1": document.getElementById('tweet1').value,
    "tweet2": document.getElementById('tweet2').value,
    "tweet3": document.getElementById('tweet3').value,
    "linkedin1": document.getElementById('linkedin1').value,
    "linkedin2": document.getElementById('linkedin2').value,
    "linkedin3": document.getElementById('linkedin3').value,
    "publications": orderedPublications,
  };

  console.log('sending: ', dataToSend);
  // Send the publicationsData to the server to save changes
  fetch('/saveChanges', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSend),
  })
    .then(response => {
      if (response.ok) {
        console.log('Changes saved successfully!');
        // Display success message in the <div id="message">
        document.getElementById('message').textContent = 'Saved changes successfully!';
        // Optionally, you can clear the message after a few seconds
        setTimeout(() => {
          document.getElementById('message').textContent = '';
        }, 3000); // Clear message after 3 seconds
      } else {
        console.log('Error saving changes.');
        // Display error message in the <div id="message">
        document.getElementById('message').textContent = 'Error saving changes.';
      }
    })
    .catch(error => {
      console.error(error);
      alert('An error occurred while saving changes.');
    });
}
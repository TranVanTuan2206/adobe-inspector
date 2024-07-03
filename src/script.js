const pasteButton = document.getElementById("paste_normal");
const link = document.getElementById("link");

const mediaType = document.getElementById("mediaType");
const category = document.getElementById("category");

const copyToClipBoard_title = document.getElementById("copyTitle");
const destination_title = document.getElementById("result_title");

const copyToClipBoard_keywords = document.getElementById("copyKeywords");
const destination_keywords = document.getElementById("result_keywords");

const img = document.getElementById("img");

const spinner = document.getElementById('spinner');
function extractId(url) {
    if(url.indexOf('asset_id') > -1) {
     return +url.split('asset_id=')[1];
    }
    url = url.split('/');
    return +url[url.length - 1];
}

async function getData(id) {
  const url = `https://stock.adobe.com/vn/Ajax/MediaData/${id}?full=1`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    const textStr = json.keywords.join(", "); // Display
    destination_keywords.value = textStr;
    destination_title.value = json.title;
    mediaType.innerText = json.media_type_label;
    category.innerText = json.category.name;
    img.src = json.content_thumb_large_url;
    console.log(json);
    spinnerToggle(false);
  } catch (error) {
    spinnerToggle(false);
    window.alert("Something Went Wrong");
    console.error(error.message);
  }
}

pasteButton.addEventListener("click", async () => {
    spinnerToggle(true);
  const url = await navigator.clipboard.readText();
  link.href = url;
  link.innerHTML = url;
  let id = extractId(url);
  if (!id || !Number.isInteger(id)) {
    window.alert("Link is not valid");
    return;
  }
  getData(id);
});

copyToClipBoard_keywords.addEventListener("click", () => {
  destination_keywords.select();
  destination_keywords.setSelectionRange(0, 99999); // For mobile devices
  // Copy the text inside the text field
  navigator.clipboard.writeText(destination_keywords.value);
});
copyToClipBoard_title.addEventListener("click", () => {
  destination_title.select();
  destination_title.setSelectionRange(0, 99999); // For mobile devices
  // Copy the text inside the text field
  navigator.clipboard.writeText(destination_title.value);
});


function spinnerToggle(isShow) {
    if(isShow) {
        spinner.style.display = "flex";
        return;
    }
    spinner.style.display = "none";
}
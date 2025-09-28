const accessToken = "MAPILLARY_API_KEY";
const imageId = "4165133420209326";

fetch(`https://graph.mapillary.com/${imageId}?access_token=${accessToken}&fields=thumb_1024_url`)
  .then(res => res.json())
  .then(data => {
    const img = document.createElement("img");
    img.src = data.thumb_1024_url;
    document.getElementById("images").appendChild(img);
  });

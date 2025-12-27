class Post {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    this.dates = [];
  }

  addDate(date) {
    this.dates.push(date);
  }
}

fetch("devlog.txt")
  .then((res) => res.text())
  .then((text) => {
    let postObjects = [];
    let posts = text.split("@@@").slice(1);
    for (let post of posts) {
      let contents = post.split("#").slice(1);
      let postObject = new Post(
        contents[0].replace("Title: ", ""),
        contents[2].replace("Body: ", ""),
      );
      postObject.addDate(contents[1].replace("Date: ", ""));
      postObjects.push(postObject);
    }

    const postsContainer = document.querySelector("#posts-container");
    for (let post of postObjects) {
      const node = document.createElement("div");
      node.textContent = post.title;
      postsContainer.appendChild(node);
    }
  })
  .catch((e) => console.error(e));

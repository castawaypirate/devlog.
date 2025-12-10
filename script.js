class Post {
  constructor(title, date, body) {
    this.title = title;
    this.date = date;
    this.body = body;
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
        contents[1].replace("Date: ", ""),
        contents[2].replace("Body: ", ""),
      );
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

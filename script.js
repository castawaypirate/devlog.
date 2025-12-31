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
      let title = contents[0].replace("Title: ", "").replace(/\n/g, "");
      let body = contents[2].replace("Body: ", "").replace(/\n/g, "<br>");
      let date = contents[1].replace("Date: ", "").replace(/\n/g, "");
      let exists = false;
      for (let postObject of postObjects) {
        if (postObject.title === title) {
          postObject.body += body;
          postObject.addDate(date);
          exists = true;
        }
      }

      if (!exists) {
        let postObject = new Post(title, body);
        postObject.addDate(date);
        postObjects.push(postObject);
      }
    }

    postObjects.sort((a, b) => a.dates[0] < b.dates[0]);
    console.log(postObjects);

    // for (let post of postObjects) {
    //   const node = document.createElement("div");
    //   node.textContent = post.title;
    //   postsContainer.appendChild(node);
    //   const para = document.createElement("p");
    //   para.innerHTML = `<div>${post.body}</div>`;
    //   postsContainer.appendChild(para);
    // }

    const formatDate = (date) => {
      return new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(date);
    };

    const postsContainer = document.querySelector("#posts-container");
    // clean dashboard from previous posts
    postsContainer.innerHTML = "";

    const table = document.createElement("table");
    table.className = "dashboard-table";
    const tbody = document.createElement("tbody");
    postObjects.forEach((post, index) => {
      const tr = document.createElement("tr");

      const trPostTitle = document.createElement("tr");

      const numberCell = document.createElement("td");
      const number = document.createElement("h3");
      number.className = "number";
      number.textContent = 1 + index + ". ";
      numberCell.appendChild(number);

      const postCell = document.createElement("td");

      const postContainer = document.createElement("div");
      postContainer.className = "post-container";

      const postTitle = document.createElement("h3");
      postTitle.className = "post-title";
      postTitle.textContent = post.title;
      postTitle.addEventListener("click", function () {
        showPost(this);
      });

      const postDetails = document.createElement("div");
      postDetails.className = "post-details";

      const trPostContent = document.createElement("tr");
      trPostContent.className = "tr-post-content-invisible";
      const emptyCell = document.createElement("td");
      const postContentCell = document.createElement("td");
      const postContent = document.createElement("p");
      postContent.innerHTML = `${post.body}`;
      postContentCell.appendChild(postContent);

      trPostContent.appendChild(emptyCell);
      trPostContent.appendChild(postContentCell);

      postContainer.appendChild(postTitle);
      postContainer.appendChild(postDetails);
      // postContainer.appendChild(postContent);
      postCell.appendChild(postContainer);

      trPostTitle.appendChild(numberCell);
      trPostTitle.appendChild(postCell);

      tr.appendChild(trPostTitle);
      tr.appendChild(trPostContent);

      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    postsContainer.appendChild(table);
  })
  .catch((e) => console.error(e));

function showPost(el) {
  let postContent = el.parentNode.parentNode.parentNode.nextSibling;
  if (postContent.className.includes("invisible")) {
    postContent.className = "tr-post-content-visible";
  } else {
    postContent.className = "tr-post-content-invisible";
  }
}

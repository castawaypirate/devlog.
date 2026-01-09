class Post {
  constructor(title) {
    this.title = title;
    this.body = [];
    this.dates = [];
  }

  addBody(body) {
    this.body.push(body);
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
      let body = contents[2].replace("Body: ", "").replace(/\n/g, "");
      let date = contents[1].replace("Date: ", "").replace(/\n/g, "");
      let exists = false;
      for (let postObject of postObjects) {
        if (postObject.title === title) {
          postObject.addBody(body);
          postObject.addDate(date);
          exists = true;
        }
      }

      if (!exists) {
        let postObject = new Post(title);
        postObject.addBody(body);
        postObject.addDate(date);
        postObjects.push(postObject);
      }
    }

    postObjects.sort((a, b) => a.dates[0] < b.dates[0]);

    const postsContainer = document.querySelector("#posts-container");
    postsContainer.innerHTML = "";

    const table = document.createElement("table");
    table.className = "dashboard-table";
    const tbody = document.createElement("tbody");
    postObjects.forEach((post, index) => {
      const tr = document.createElement("tr");
      tr.className = "outside";

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
      const divider = document.createElement("div");
      divider.className = "divider";
      divider.innerText = "|";
      const createdAt = document.createElement("div");
      createdAt.title = "created at";
      createdAt.className = "date";
      createdAt.innerText = `${formatDate(post.dates[0])}`;
      const updatedAt = document.createElement("div");
      updatedAt.title = "updated at";
      updatedAt.className = "date";
      updatedAt.innerText = `${formatDate(post.dates[post.dates.length - 1])}`;
      postDetails.className = "post-details";

      postDetails.appendChild(createdAt);
      postDetails.appendChild(divider);
      postDetails.appendChild(updatedAt);

      const trPostContent = document.createElement("tr");
      trPostContent.className = "tr-post-content-invisible";

      const emptyCell = document.createElement("td");
      const empty = document.createElement("h3");
      empty.className = "number";
      empty.innerHTML = "&nbsp;&nbsp;";
      emptyCell.appendChild(empty);

      const postContentCell = document.createElement("td");
      const postContent = document.createElement("div");
      postContent.innerHTML = "";
      for (let i = 0; i < post.dates.length; i++) {
        postContent.innerHTML += `
           <h4>${formatDate(post.dates[i])}</h4>
           <br>
           <div>${post.body[i]}</div>
           <br>`;
      }

      postContentCell.appendChild(postContent);

      trPostContent.appendChild(emptyCell);
      trPostContent.appendChild(postContentCell);

      postContainer.appendChild(postTitle);
      postContainer.appendChild(postDetails);

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

function formatDate(date) {
  const dateFormat = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const [day, month, year] = date.split("-");
  const convertedDate = new Date(+year, +month - 1, +day);
  return dateFormat(convertedDate);
}

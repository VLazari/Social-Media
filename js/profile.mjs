const queryUrl = location.search;
const urlParams = new URLSearchParams(queryUrl);
const userName = urlParams.get("name");
const baseURL = "https://nf-api.onrender.com/api/v1/social";

import { getData } from "/js/modules/API-access.mjs";

const data = await getData(baseURL + `/profiles/${userName}?_posts=true`);
console.log(data);

const mainPosts = document.querySelector(".posts");

data.posts.forEach((post) => {
	let media = "";
	if (post.media.trim() != "") {
		media = `<img src="${post.media}" alt="Post image" />`;
	}
	mainPosts.innerHTML += `<div id="${post.id}" class="card mx-0 my-3 bg-light border border-primary rounded border-opacity-25">
                            <div class="p-3 d-flex align-items-center">
                              <div class="mx-3 avatar-img" style="background-image: url('${data.avatar}');"></div>
                              <h6 class="m-0 user-name">${data.name}</h6>
                            </div>
                            ${media}
                            <div class="card-body">
                              <i class="fa-regular fa-heart fa-xl mx-2 text-danger"></i>
                              <i class="fa-regular fa-comment fa-xl mx-2 text-primary"></i>
                            </div>
                            <div class="card-body py-0">
                              <p class="card-text fw-semibold my-0 py-0">${post.title}</p>
                            </div>
                            <div class="card-body py-0">
                              <p class="card-text">${post.body}</p>
                            </div>
                            <p class="card-text m-2 mx-3">
                              <small class="text-muted"> ${post.updated.substr(11, 5)} </small>
                              <small class="text-muted mx-2"> ${post.updated.substr(0, 10)} </small>
                            </p>
                          </div>`;
});

// class posts {

//   data.posts.forEach((post) => {
//     let media = "";

//     showPost() ={ if (post.media.trim() != "") {
//       media = `<img src="${post.media}" alt="Post image" />`;
//     }
//       `<div id="${post.id}" class="card mx-0 my-3 bg-light border border-primary rounded border-opacity-25">
//                               <div class="p-3 d-flex align-items-center">
//                                 <div class="mx-3 avatar-img" style="background-image: url('${data.avatar}');"></div>
//                                 <h6 class="m-0 user-name">${data.name}</h6>
//                               </div>
//                               ${media}
//                               <div class="card-body">
//                                 <i class="fa-regular fa-heart fa-xl mx-2 text-danger"></i>
//                                 <i class="fa-regular fa-comment fa-xl mx-2 text-primary"></i>
//                               </div>
//                               <div class="card-body py-0">
//                                 <p class="card-text fw-semibold my-0 py-0">${post.title}</p>
//                               </div>
//                               <div class="card-body py-0">
//                                 <p class="card-text">${post.body}</p>
//                               </div>
//                               <p class="card-text m-2 mx-3">
//                                 <small class="text-muted"> ${post.updated.substr(11, 5)} </small>
//                                 <small class="text-muted mx-2"> ${post.updated.substr(0, 10)} </small>
//                               </p>
//                             </div>`;

//   }
//   });
// }

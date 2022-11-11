const searchModal = document.getElementById("searchUserModal");
searchModal.innerHTML = `<div class="modal-dialog modal-dialog-scrollable modal-fullscreen-sm-down">
												<div class="modal-content">
													<div class="modal-header">
														<input id="search" type="text" class="form-control me-3" placeholder="Search..." />
														<button type="button" class="btn-close mx-1" data-bs-dismiss="modal" aria-label="Close"></button>
													</div>
													<div class="modal-body">
														<div id="search-results" class="ms-2"></div>
													</div>
													<div class="modal-footer d-flex flex-nowrap justify-content-evenly mobile-nav">
														<h1>Moments</h1>
													</div>
												</div>
											</div>`;

const commentModal = document.getElementById("commentModal");
commentModal.innerHTML = `<div class="modal-dialog modal-dialog-scrollable modal-fullscreen-sm-down">
                            <div class="modal-content">
                              <div class="modal-header">
                                <div id="comment-header" class="d-flex flex-column align-items-start justify-content-start"></div>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body mb-5 mb-sm-0">
                                <div id="comment-body" class="mb-5 pb-5"></div>
                              </div>
                              <div class="modal-footer d-flex flex-nowrap justify-content-evenly mobile-nav">
                                <input id="comment-input" type="text" class="form-control" placeholder="Add comment" aria-label="comment" />
                                <i id="comment-btn" class="fa-solid fa-paper-plane fa-xl mx-2 text-primary"></i>
                              </div>
                            </div>
                          </div>`;

const addPostModal = document.getElementById("addPostModal");
addPostModal.innerHTML = `<div class="modal-dialog modal-fullscreen-sm-down">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title">
                                  Share your
                                  <h1 class="fs-4 mx-2">moments</h1>
                                </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <form id="add-post-form" class="modal-body">
                                <div class="d-flex flex-column">
                                  <div class="my-3">
                                    <label for="title" class="form-label"><span class="text-danger">*</span> Your moment</label>
                                    <input id="add-post-title" type="text" class="form-control" placeholder="Title" aria-label="title" required />
                                  </div>
                                  <div class="my-3">
                                    <label for="body" class="form-label">Description</label>
                                    <input id="add-post-body" type="text" class="form-control" placeholder="Body" aria-label="body" />
                                  </div>
                                  <div class="my-3">
                                    <label for="tags" class="form-label">Tag</label>
                                    <input id="add-post-tags" type="text" class="form-control" placeholder="tags" aria-label="tag" />
                                  </div>
                                  <div class="my-3">
                                    <label for="image" class="form-label"><span class="text-danger">*</span> Moment picture</label>
                                    <input id="add-post-image" type="text" class="form-control" placeholder="Image URL" aria-label="image" required />
                                  </div>
                                </div>
                                <div class="modal-footer d-flex justify-content-evenly">
                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                  <button id="post-btn" type="submit" value="submit" class="btn btn-primary"></button>
                                </div>
                              </form>
                            </div>
                          </div>`;

//load news with categories api
const loadCatagories = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`;
        const res = await fetch(url);
        const data = await res.json();
        displayCatagories(data.data.news_category);
    } catch (error) {
        alert("Categories in API Not Working");
    }
}
//display the categories
const displayCatagories = (categories) => {
    const listDiv = document.getElementById("list-div");
    categories.forEach((category) => {
        //console.log(category.category_name);
        const list = document.createElement('li');
        list.innerHTML = `<button id="${category.category_id}" onclick="loadNews('${category.category_id}', '${category.category_name}')" class="btn btn-light">${category.category_name}</button>`;
        listDiv.appendChild(list);
    })
}

loadCatagories()

//load the news for specific category
const loadNews = async (category_id, category_name) => {
    try {
        toggleSpinner(true);
        const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data, category_name);
        toggleSpinner(false);
    }
    catch (error) {
        alert("News in category ID not working.");
    }
}

//show number of news and name of the category
const summary = (newsNumber, categoryName) => {
    if (newsNumber === 0) {
        document.getElementById('number-of-news').innerText = 'No';
    }
    else { document.getElementById('number-of-news').innerText = newsNumber; }

    document.getElementById('category-name').innerText = categoryName;
}
//display the news for specific category
const displayNews = (news, category_name) => {
    const newsDiv = document.getElementById("news-div");
    const modalSection = document.getElementById("modal-section");
    newsDiv.innerHTML = ``;
    modalSection.innerHTML = ``;
    //console.log(news.length);
    summary(news.length, category_name);
    news.forEach((newsItem) => {
        const infoDiv = document.createElement("div");
        infoDiv.classList.add('d-flex', 'flex-column', 'flex-lg-row', 'shadow', 'rounded', 'p-3', 'my-2');
        infoDiv.innerHTML = `
                     <div class="w-100 w-lg-25">
                         <img class="img-fluid" src="${newsItem.thumbnail_url}" alt="">
                     </div>
                     <div class="d-flex flex-column w-100 w-lg-75">
                         <h3>${newsItem.title}</h3>
                         <p class="d-none d-lg-block">${newsItem.details.slice(0, 250) + ' ...'}</p>
                         <div class="d-none d-lg-block">
                             <div class="d-flex justify-content-between">
                                 <div class="d-flex justify-content-between">
                                     <img class="img-fluid d-block profile-image"
                                         src="${newsItem.author.img}"
                                         alt="">
                                     <div class="d-flex flex-column p-2">
                                         <p class="m-0">${newsItem.author.name ? newsItem.author.name : 'No Author'}</p>
                                         <p class="m-0">${newsItem.author.published_date}</p>
                                     </div>
                                 </div>
                                 <div class="p-2">
                                     <h6><i class="fa-regular fa-eye"></i>
                                     ${newsItem.total_view}</h6>
                                 </div>
                                 <div class="p-2">
                                     <h6><i class="fa-regular fa-star"></i> ${newsItem.rating.number}</h6>
                                 </div>
                                 <div class="p-2">
                                     <button type="button" class="border-0" data-bs-toggle="modal" data-bs-target="#staticBackdrop${newsItem._id}">
                                     <i class="fa-solid fa-arrow-right"></i>
                                     </button>
                                 </div>
                             </div>
                         </div>
                         <div class="d-block d-lg-none p-2">
                                     <button type="button" class="border-0" data-bs-toggle="modal" data-bs-target="#staticBackdrop${newsItem._id}">
                                     <i class="fa-solid fa-arrow-right"></i>
                                     </button>
                                 </div>
                     </div>`;
        newsDiv.appendChild(infoDiv);

        //adding modal news in modal section
        const detailsDiv = document.createElement("div");
        const detailsNews = `
        <div class="modal fade" id="staticBackdrop${newsItem._id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">${newsItem.title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        ${newsItem.details}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>`
        detailsDiv.innerHTML = detailsNews;
        modalSection.appendChild(detailsDiv);
    })
}
//spinner toggle function
const toggleSpinner = (isLoading) => {

    if (isLoading) {
        document.getElementById("spinner").classList.remove("d-none");
    }
    else {
        document.getElementById("spinner").classList.add("d-none");
    }
}
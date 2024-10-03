
// time function
function timeString(time) {
    const days = parseInt(time / 86400);
    const hour = parseInt((time % 86400) / 3600);
    let remainingSeconds = parseInt(time % 3600);
    const minutes = parseInt(remainingSeconds / 60);
    // remainingSeconds = remainingSeconds % 60;
    return `${days} days ${hour} hour ${minutes} minutes ago`
};

const removeBtnClass = () => {
    const btnClass = document.getElementsByClassName('btn-class');
    for(let btn of btnClass) {
        btn.classList.remove('active');
    }
};

// load Categories Videos
const loadCategoriesVideos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            removeBtnClass()
            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add('active');
            displayVideos(data.category)
        })
        .catch(error => console.error('Error Happened', error))
};

// Load all the Category Button From API
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.error('Error Happened', error))
};

const displayCategories = (categories) => {
    const buttonContainer = document.getElementById('button-container');
    categories.forEach((item) => {
        const buttonDiv = document.createElement('div');
        buttonDiv.innerHTML = `
            <button id="btn-${item.category_id}" onclick="loadCategoriesVideos(${item?.category_id})" class="btn bg-[#DEDEDE] text-base btn-class">${item.category}</button>
        `
        buttonContainer.appendChild(buttonDiv);
    });
};



const loadVideos = (searchInput = '') => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchInput}`)
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.error('Error happened', error))
};

const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos-container');
    videosContainer.innerHTML = '';

    if (videos.length == 0) {
        videosContainer.classList.remove("grid");
        videosContainer.innerHTML = `
            <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
                <img src="images/Icon.png" /> 
                <h2 class="text-center text-xl font-bold"> No Content Here in this Categery </h2> 
            </div>
        `;
    }
    else {
        videosContainer.classList.add("grid");
    }

    videos.forEach((video) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="relative">
                <img class="w-full h-[200px] rounded-lg object-cover" src='${video?.thumbnail}'>
                ${video?.others?.posted_date?.length === 0 ? '' : `<span class="absolute bottom-3 right-3 bg-[#171717] rounded-[4px] p-1 text-white text-[10px] font-normal">${timeString(video?.others?.posted_date)}</span>`}
                
            </div>
            <div class="flex gap-2 sm:gap-3 pt-5">
                <img class="w-10 h-10 rounded-full object-cover" src="${video?.authors[0]?.profile_picture}" alt="">
                <div>
                    <h3 class="text-base font-bold text-[171717]">${video?.title}</h3>
                    <div class="flex gap-2 items-center">
                        <p class="my-1 text-[14px] font-normal text-[#5D5D5D]">${video?.authors[0]?.profile_name}</p>
                        ${video?.authors[0]?.verified === true ? '<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png">' : ''}
                    </div>
                    <p class="text-[14px] font-normal text-[#5D5D5D]">${video?.others?.views} views</p>
                </div>
            </div>
        `;
        videosContainer.appendChild(div);
    });

};


// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": 
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }

document.getElementById('search-input').addEventListener('keyup', (event) => {
    loadVideos(event.target.value);
});
loadCategories();
loadVideos();
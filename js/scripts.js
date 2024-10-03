
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
        const button = document.createElement('button');
        button.classList = 'btn bg-[#DEDEDE] text-base'
        button.innerText = item.category;
        buttonContainer.appendChild(button)
    });
};

loadCategories();
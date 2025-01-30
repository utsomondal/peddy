const loadPetCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await res.json();
    const categories = data.categories;
    displayPetCategories(categories);
}
const displayPetCategories = (categories) => {
    const categoriesContainer = document.getElementById('categories');
    categoriesContainer.classList = `flex justify-evenly items-center my-10 gap-2 lg:gap-0`;
    categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.classList = `block md:flex lg:flex items-center gap-2 lg:gap-3 border-[1px] border-solid border-[#0E7A8126] px-3 lg:px-6 py-2 lg:py-3 rounded-full hover:bg-[#0E7A8126] cursor-pointer transition duration-200`;
        categoryCard.innerHTML = `
            <!-- card -->
              <figure>
                <img src="${category.category_icon}" alt="icon" class="hidden md:block lg:block">
              </figure>
              <h2 class="text-base lg:text-2xl font-bold text-center">${category.category}</h2>
        `;
        categoriesContainer.appendChild(categoryCard);
        console.log(category);
        
    });
}
loadPetCategories();
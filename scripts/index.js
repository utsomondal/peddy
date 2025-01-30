const loadPetCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await res.json();
    const categories = data.categories;
    displayPetCategories(categories);
}
const displayPetCategories = (categories) => {
    const categoriesContainer = document.getElementById('categories');
    categoriesContainer.classList = `flex justify-evenly items-center mt-10 gap-2 lg:gap-0`;
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
    });
}
// load all pets
const loadAllPets = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await res.json();
    const pets = data.pets;
    displayAllPets(pets);
}
const displayAllPets = (pets) => {
    const petsContainer = document.getElementById('pet-collections');
    pets.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.classList = `card card-compact bg-base-100 shadow-md`;
        petCard.innerHTML = `
            <figure>
                 <img
                    class="w-full"
                    src="${pet.image}"
                    alt="${pet.category}"
                />
            </figure>
            <div class="card-body">
                <h2 class="card-title text-[#131313] font-bold text-xl">${pet.pet_name}</h2>
                    <p class="text-[#131313B3] text-base"><span><i class="fa-solid fa-paw mr-1"></i></span>Breed: ${pet.breed ? pet.breed : "Not Available"}</p>
                    <p class="text-[#131313B3] text-base"><span><i class="fa-regular fa-calendar mr-1"></i></span>Date of Birth: ${pet.date_of_birth ? pet.date_of_birth : "Not Mentioned"}</p>
                    <p class="text-[#131313B3] text-base"><span><i class="fa-solid fa-mercury mr-1"></i></span>Gender: ${pet.gender ? pet.gender : "Not Mentioned"}</p>
                    <p class="text-[#131313B3] text-base"><span><i class="fa-solid fa-dollar-sign mr-1"></i></span>Price: ${pet.price ? pet.price + "$" : "N/A"} </p>
                    <div class="card-actions justify-start">
                        <button class="btn text-[#13131399] text-xl bg-base-100 hover:bg-base-200"><i class="fa-regular fa-thumbs-up"></i></button>
                        <button class="btn text-[#0E7A81] text-lg flex-grow bg-base-100 hover:bg-base-200">Adopt</button>
                        <button class="btn text-[#0E7A81] text-lg flex-grow bg-base-100 hover:bg-base-200">Details</button>
                    </div>
            </div>
        `;
        petsContainer.appendChild(petCard);
    });
}

loadPetCategories();
loadAllPets();
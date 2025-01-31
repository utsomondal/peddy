const loadPetCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await res.json();
    const categories = data.categories;
    displayPetCategories(categories);
}
const displayPetCategories = (categories) => {
    const categoriesContainer = document.getElementById('categories');
    categoriesContainer.textContent = '';
    categoriesContainer.classList = `flex justify-evenly items-center mt-10 gap-2 lg:gap-0`;
    categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.classList = `block md:flex lg:flex items-center gap-2 lg:gap-3 border-[1px] border-solid border-[#0E7A8126] px-3 lg:px-6 py-2 lg:py-3 rounded-full hover:bg-[#0E7A8126] cursor-pointer transition duration-200`;
        categoryCard.innerHTML = `
              <figure>
                <img src="${category.category_icon}" alt="icon" class="hidden md:block lg:block">
              </figure>
              <h2 class="text-base lg:text-2xl font-bold text-center">${category.category}</h2>
        `;
        categoryCard.addEventListener('click', () => loadPetsByCategory(category.category))
        categoriesContainer.appendChild(categoryCard);
    });
}
// load pets by category
const loadPetsByCategory = async (category) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
    const data = await res.json();
    const pets = data.data;
    displayAllPets(pets);
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
    petsContainer.innerHTML = ''; // Clear previous content

    if (pets.length === 0) {
        petsContainer.className = "flex items-center justify-center flex-grow";
        petsContainer.innerHTML = `
        <div class="flex flex-col justify-center items-center w-4/5 mx-auto">
            <span><i class="fa-regular fa-circle-xmark text-red-500 text-3xl"></i></span>
            <p class="text-center text-2xl text-gray-500 whitespace-nowrap">No Pets Available</p>
        </div>`;
        return;
    }

    // Set grid layout when pets are available
    petsContainer.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4";

    pets.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.classList.add('card', 'card-compact', 'bg-base-100', 'shadow-md');
        petCard.innerHTML = `
            <figure>
                <img class="w-full" src="${pet.image}" alt="${pet.category}" />
            </figure>
            <div class="card-body">
                <h2 class="card-title text-[#131313] font-bold text-xl">${pet.pet_name}</h2>
                <p class="text-[#131313B3] text-base">
                    <i class="fa-solid fa-paw mr-1"></i> Breed: ${pet.breed || "Not Available"}
                </p>
                <p class="text-[#131313B3] text-base">
                    <i class="fa-regular fa-calendar mr-1"></i> Birth: ${pet.date_of_birth ? pet.date_of_birth.slice(0, 4) : "Not Mentioned"}
                </p>
                <p class="text-[#131313B3] text-base">
                    <i class="fa-solid fa-mercury mr-1"></i> Gender: ${pet.gender || "Not Mentioned"}
                </p>
                <p class="text-[#131313B3] text-base">
                    <i class="fa-solid fa-dollar-sign mr-1"></i> Price: ${pet.price ? pet.price + "$" : "N/A"}
                </p>
                <div class="card-actions justify-start">
                    <button onclick="handleLike(${pet.petId})" class="btn like-btn text-[#13131399] text-xl bg-base-100 hover:bg-base-200"">
                        <i class="fa-regular fa-thumbs-up"></i>
                    </button>
                    <button class="btn adopt-btn text-[#0E7A81] text-lg flex-grow bg-base-100 hover:bg-base-200"">
                        Adopt
                    </button>
                    <button class="btn details-btn text-[#0E7A81] text-lg flex-grow bg-base-100 hover:bg-base-200">
                        Details
                    </button>
                </div>
            </div>
        `;

        petsContainer.appendChild(petCard);
    });
};
// Define event handlers
const handleLike = (petId) => {
    loadAllPetsById(petId);
};

const handleAdopt = (petId) => {
    // console.log(`Adopted pet with ID: ${petId}`);
    // will work later
};

const handleDetails = (petId) => {
    // console.log(`Viewing details of pet ID: ${petId}`);
    // will work later
};


const loadAllPetsById = async (petId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await res.json();
    const likedPet = data.petData;
    displayLikedPets(likedPet)
}
const displayLikedPets = (likedPet) => {
    const likedPetsContainer = document.getElementById('liked-pets-container');
    // Prevent duplicate likes
    const existingPet = document.querySelector(`#liked-pets-container img[src="${likedPet.image}"]`);
    if (existingPet) return;
    // Create image container
    const imgDiv = document.createElement('div');
    imgDiv.innerHTML = `
        <img class="w-80 rounded-md" src="${likedPet.image}" alt="${likedPet.category}"/>
    `;
    likedPetsContainer.appendChild(imgDiv);
};




loadPetCategories();
loadAllPets();
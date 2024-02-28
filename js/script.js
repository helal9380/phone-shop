/** @format */

const loadPhoneData = async (searchText = "13", isShowAll) => {
  const responsive = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await responsive.json();
  console.log(data.data);
  const phoneData = data.data;
  displayPhone(phoneData, isShowAll);
};

// display all phone

const displayPhone = (phones, isShowAll) => {
  const message = document.getElementById("massage");
  if (phones.length === 0) {
    message.classList.remove("hidden");
  } else {
    message.classList.add("hidden");
  }
  // only 10 phones show
  const showBtn = document.getElementById("show-all-btn");
  if (phones.length > 12 && !isShowAll) {
    showBtn.classList.remove("hidden");
  } else {
    showBtn.classList.add("hidden");
  }

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  // phone container
  const phoneContainer = document.getElementById("phones-container");

  // reset phone container
  phoneContainer.textContent = "";
  //   looping phone
  phones.forEach((phone) => {
    // create div
    const div = document.createElement("div");
    div.classList = `card bg-base-100 shadow-xl`;
    // inner html
    div.innerHTML = `
        <figure class="px-10 pt-10">
                  <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
                </figure>
                <div class="p-5 text-center">
                <h4 class= "text-xl font-semibold">${phone.brand}</h4>
                  <h2 class="text-2xl font-bold">${phone.phone_name}</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div class="w-full mt-5">
                    <button onclick="showPhoneDetails('${phone.slug}')" class="btn w-full bg-[#0D6EFD] text-white font-semibold hover:bg-[#2c80ff]">Show Details</button>
                  </div>
                </div>
        `;
    // append child
    phoneContainer.appendChild(div);
  });
  toggleLoading(false);
};
// show phone details
const showPhoneDetails = async (Id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${Id}`
  );
  const data = await res.json();
  const phoneDetails = data.data;
  console.log(phoneDetails);
  diaplayPhoneDetails(phoneDetails);
};

const diaplayPhoneDetails = (phone) => {
  console.log(phone);

  const showPhoneDetailsContainer =
    document.getElementById("show-details-phone");
  showPhoneDetailsContainer.innerHTML = `
    <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
      <div class = "text-center w-28 mx-auto">
        <img src="${phone.image}" alt="">
      </div>
      <h2 class= "font-semibold">${phone.brand}</h2>
          <h3 class="text-lg">${phone.name}</h3>
          
          <p class=""><span class="text-lg font-semibold">Storage :</span>${
            phone.mainFeatures.storage
          }</p>
          <p class="text-[14px]"><span class="text-lg font-semibold">Dispaly size : </span>${
            phone.mainFeatures.displaySize
          }</p>
          <p class="text-[14px]"><span class="text-lg font-semibold">Chipset : </span>${
            phone.mainFeatures.chipSet
          }</p>
          <p class="text-[14px]"><span class="text-lg font-semibold">Memory : </span>${
            phone.mainFeatures.memory
          }</p>
          <p class="text-[14px]"><span class="text-lg font-semibold">Release data : </span>${
            phone.releaseDate
          }</p>
          <p class="text-[14px]"><span class="text-lg font-semibold">GPA : </span>${
            phone.others?.GPS || "GPS no found in this phone"
          }</p>
          
          <div class="modal-action">
          <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn bg-[#0D6EFD] text-white font-semibold hover:bg-[#2c80ff]">close</button>
          </form>
          </div>
      </div>
    </dialog>
  `;
  my_modal_5.showModal();
};
// loading spenner

const toggleLoading = (isLoading) => {
  const loading = document.getElementById("loading-bars");
  if (isLoading) {
    loading.classList.remove("hidden");
  } else {
    loading.classList.add("hidden");
  }
};
// handle search phone
const handleSearchPhone = (isShowAll) => {
  toggleLoading(true);
  const inputFieldText = document.getElementById("inputField");
  const inputText = inputFieldText.value;
  loadPhoneData(inputText, isShowAll);
};

const handleShowAll = () => {
  console.log("clicked");
  handleSearchPhone(true);
};

loadPhoneData();


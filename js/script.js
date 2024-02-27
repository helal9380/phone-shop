/** @format */

const loadPhoneData = async () => {
  const responsive = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  );
  const data = await responsive.json();
  console.log(data.data);
  const phoneData = data.data;
  displayPhone(phoneData);
};

// display all phone

const displayPhone = (phones) => {
    // phone container
  const phoneContainer = document.getElementById("phones-container");
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
                    <button class="btn w-full bg-[#0D6EFD] text-white font-semibold hover:bg-[#2c80ff]">Show Details</button>
                  </div>
                </div>
        `;
        // append child
    phoneContainer.appendChild(div);
  });
};

loadPhoneData();

const titleInput = document.getElementById("titleInput");
const priceInput = document.getElementById("priceInput");
const taxesInput = document.getElementById("taxesInput");
const adsInput = document.getElementById("adsInput");
const descountInput = document.getElementById("descountInput");
const countInput = document.getElementById("countInput");
const categoryInput = document.getElementById("categoryInput");
const addInput = document.getElementById("addInput");
const updateInput = document.getElementById("updateInput");
const totalbBtn = document.getElementById("totalbBtn");
const searchInput = document.getElementById("searchInput");
const searchTitleInput = document.getElementById("searchTitle");
const searchCategoryInput = document.getElementById("searchCategory");
const deleteAllBtn = document.getElementById("deleteAll");

const titleMessage = document.querySelector(".titleMessage");
const priceMessage = document.querySelector(".priceMessage");
const taxesMessage = document.querySelector(".taxesMessage");
const adsMessage = document.querySelector(".adsMessage");
const descountMessage = document.querySelector(".descountMessage");
const countMessage = document.querySelector(".countMessage");
const categoryMessage = document.querySelector(".categoryMessage");

let allProduct = [];

// (== null) ==> Mafesh Feha Montagat.
// (!= null) ==> Feha Montagat.
if (localStorage.getItem("allProduct") != null ){
    allProduct = JSON.parse(localStorage.getItem("allProduct"));
    displayProduct();
}




// get total
function getTotal(){

    if(priceInput.value != ""){
        let result = (+priceInput.value + +taxesInput.value + +adsInput.value) - +descountInput.value;
        totalbBtn.innerHTML = result;
        totalbBtn.classList.add("bg-success");
        totalbBtn.classList.remove("bg-danger");
    }
    else {
        totalbBtn.innerHTML ="Total";
        totalbBtn.classList.add("bg-danger");
        totalbBtn.classList.remove("bg-success");
    }
}
priceInput.addEventListener('input', getTotal)
taxesInput.addEventListener('input', getTotal)
adsInput.addEventListener('input', getTotal)
descountInput.addEventListener('input', getTotal)

function addProduct(){

    if(validateTitle() && validatePrice() && validateCategory()){
        const product = {
            title: titleInput.value,
            price: +priceInput.value,
            taxes: +taxesInput.value,
            ads: +adsInput.value,
            descount: +descountInput.value,
            count: countInput.value,
            category: categoryInput.value,
            total: totalbBtn.innerHTML
        }

        if(product.count > 1){
            for (let i = 0; i < product.count; i++) {
                allProduct.push(product);
            }
        }
        else {
            allProduct.push(product);
        }

        localStorage.setItem('allProduct' , JSON.stringify(allProduct));
        displayProduct();
        clearForm();
        totalbBtn.innerHTML = "Total";
        totalbBtn.classList.add("bg-danger");
        titleInput.classList.remove('is-valid');
        priceInput.classList.remove('is-valid');
        taxesInput.classList.remove('is-valid');
        adsInput.classList.remove('is-valid');
        descountInput.classList.remove('is-valid');
        countInput.classList.remove('is-valid');
        categoryInput.classList.remove('is-valid');
    }
}
addInput.addEventListener("click" , addProduct);

function clearForm(){
    titleInput.value = "";
    priceInput.value = "";
    taxesInput.value = "";
    adsInput.value = "";
    descountInput.value = "";
    countInput.value = "";
    categoryInput.value = "";
    totalbBtn.innerHTML = "";
}

function displayProduct(){

    let cartona = "";

    for (let i = 0; i < allProduct.length; i++) {
        cartona += `
            <tr>
                <td> ${i + 1} </td>
                <td>${allProduct[i].title}</td>
                <td>${allProduct[i].price}</td>
                <td>${allProduct[i].taxes}</td>
                <td>${allProduct[i].ads}</td>
                <td>${allProduct[i].descount}</td>
                <td>${allProduct[i].total}</td>
                <td>${allProduct[i].category}</td>
                <td><i onClick="setProduct(${i})" class="fa-solid fa-pen-to-square cursor"></i></td>
                <td><i onClick="deleteProduct(${i})" class="fa-solid fa-trash cursor"></i></td>
            </tr>
    `
}
    document.getElementById("rowBody").innerHTML = cartona;

    if(allProduct.length > 0){
        deleteAllBtn.classList.remove("d-none");
    }
    else {
        deleteAllBtn.classList.add("d-none");
    }
}

let searchMood = "title";

function getSearchMood(id){
    if(id === "searchTitle"){
        searchMood = "title";
        searchInput.placeholder = "Search By Title";
    }
    else {
        searchMood = "category";
        searchInput.placeholder = "Search By Category";
    }
    searchInput.focus();
}

function searchProduct(term){
    let cartona = "";
    // const searchValue = searchInput.value;

    if(searchMood === "title"){
        for (let i = 0; i < allProduct.length; i++) {

            if(allProduct[i].title.toLowerCase().includes(term.toLowerCase())){
            cartona += `
            <tr>
                <td>${i + 1}</td>
                <td>${allProduct[i].title}</td>
                <td>${allProduct[i].price}</td>
                <td>${allProduct[i].taxes}</td>
                <td>${allProduct[i].ads}</td>
                <td>${allProduct[i].descount}</td>
                <td>${allProduct[i].total}</td>
                <td>${allProduct[i].category}</td>
                <td><i onClick="setProduct(${i})" class="fa-solid fa-pen-to-square cursor"></i></td>
                <td><i onClick="deleteProduct(${i})" class="fa-solid fa-trash cursor"></i></td>
            </tr>
            `}
        }
        document.getElementById("rowBody").innerHTML = cartona;
    }
    else {
        for (let i = 0; i < allProduct.length; i++) {

            if(allProduct[i].category.toLowerCase().includes(term.toLowerCase())){
            cartona += `
            <tr>
                <td>${i + 1}</td>
                <td>${allProduct[i].title}</td>
                <td>${allProduct[i].price}</td>
                <td>${allProduct[i].taxes}</td>
                <td>${allProduct[i].ads}</td>
                <td>${allProduct[i].descount}</td>
                <td>${allProduct[i].total}</td>
                <td>${allProduct[i].category}</td>
                <td><i onClick="setProduct(${i})" class="fa-solid fa-pen-to-square cursor"></i></td>
                <td><i onClick="deleteProduct(${i})" class="fa-solid fa-trash cursor"></i></td>
            </tr>
            `}
        }
        document.getElementById("rowBody").innerHTML = cartona;
    }

}

function deleteProduct(index){
    allProduct.splice(index , 1);
    localStorage.setItem('allProduct' , JSON.stringify(allProduct));
    displayProduct();
}

deleteAllBtn.addEventListener("click" , function(){
    allProduct.splice(0);
    localStorage.setItem('allProduct' , JSON.stringify(allProduct));
    displayProduct();
})

let indexUpdate = 0;
function setProduct(index){

    indexUpdate = index ;
    const curentProduct = allProduct[index];

    titleInput.value = curentProduct.title;
    priceInput.value = curentProduct.price;
    taxesInput.value = curentProduct.taxes;
    adsInput.value = curentProduct.ads;
    descountInput.value = curentProduct.descount;
    countInput.value = curentProduct.count;
    categoryInput.value = curentProduct.category;
    totalbBtn.value = curentProduct.total;

    addInput.classList.add("d-none");
    updateInput.classList.remove("d-none");
}

function updateProduct(index){
    const product = {
        title: titleInput.value,
        price: priceInput.value,
        taxes: taxesInput.value,
        ads: adsInput.value,
        descount: descountInput.value,
        count: countInput.value,
        category: categoryInput.value,
        total: totalbBtn.innerHTML
    }
    allProduct.splice(indexUpdate , 1 , product);
    displayProduct();
    localStorage.setItem('allProduct' , JSON.stringify(allProduct));
    addInput.classList.remove("d-none");
    updateInput.classList.add("d-none");
}
updateInput.addEventListener("click" , updateProduct);




// !Validation Inputs

function validateTitle(){
    const regexTitle = /^[A-z]{4,15}$/;
    const text = titleInput.value;

    if(regexTitle.test(text.trim()) == true){
        titleInput.classList.add('is-valid');
        titleInput.classList.remove('is-invalid');
        titleMessage.classList.add("d-none");
        return true;
    }
    else {
        titleInput.classList.remove('is-valid');
        titleInput.classList.add('is-invalid');
        titleMessage.classList.remove("d-none");
        return false;
    }
}
titleInput.addEventListener("change", validateTitle);


function validatePrice(){
    const regexPrice = /^[0-9]{2,7}$/;
    const text = priceInput.value;

    if(regexPrice.test(text) == true){
        priceInput.classList.add('is-valid');
        priceInput.classList.remove('is-invalid');
        priceMessage.classList.add("d-none");
        return true;
    }
    else {
        priceInput.classList.remove('is-valid');
        priceInput.classList.add('is-invalid');
        priceMessage.classList.remove("d-none");
        return false;
    }
}
priceInput.addEventListener("change", validatePrice);


function validateTaxes(){
    const regexTaxes = /^[0-9]{2,7}$/;
    const text = taxesInput.value;

    if(regexTaxes.test(text) == true){
        taxesInput.classList.add('is-valid');
        taxesInput.classList.remove('is-invalid');
        taxesMessage.classList.add("d-none");
        return true;
    }
    else {
        taxesInput.classList.remove('is-valid');
        taxesInput.classList.add('is-invalid');
        taxesMessage.classList.remove("d-none");
        return false;
    }
}
taxesInput.addEventListener("change", validateTaxes);


function validateAds(){
    const regexAds = /^[0-9]{2,7}$/;
    const text = adsInput.value;

    if(regexAds.test(text) == true){
        adsInput.classList.add('is-valid');
        adsInput.classList.remove('is-invalid');
        adsMessage.classList.add("d-none");
        return true;
    }
    else {
        adsInput.classList.remove('is-valid');
        adsInput.classList.add('is-invalid');
        adsMessage.classList.remove("d-none");
        return false;
    }
}
adsInput.addEventListener("change", validateAds);


function validateDiscount(){
    const regexDiscount = /^[0-9]{2,7}$/;
    const text = descountInput.value;

    if(regexDiscount.test(text) == true){
        descountInput.classList.add('is-valid');
        descountInput.classList.remove('is-invalid');
        descountMessage.classList.add("d-none");
        return true;
    }
    else {
        descountInput.classList.remove('is-valid');
        descountInput.classList.add('is-invalid');
        descountMessage.classList.remove("d-none");
        return false;
    }
}
descountInput.addEventListener("change", validateDiscount);


function validateCount(){
    const regexCount = /^[0-9]{1,3}$/;
    const text = countInput.value;

    if(regexCount.test(text) == true){
        countInput.classList.add('is-valid');
        countInput.classList.remove('is-invalid');
        countMessage.classList.add("d-none");
        return true;
    }
    else {
        countInput.classList.remove('is-valid');
        countInput.classList.add('is-invalid');
        countMessage.classList.remove("d-none");
        return false;
    }
}
countInput.addEventListener("change", validateCount);


function validateCategory(){
    const regexCategory = /^[A-z]{2,15}$/;
    const text = categoryInput.value.trim();

    if(regexCategory.test(text) == true){
        categoryInput.classList.add('is-valid');
        categoryInput.classList.remove('is-invalid');
        categoryMessage.classList.add("d-none");
        return true;
    }
    else {
        categoryInput.classList.remove('is-valid');
        categoryInput.classList.add('is-invalid');
        categoryMessage.classList.remove("d-none");
        return false;
    }
}
categoryInput.addEventListener("change", validateCategory);

const burgerBtn = document.querySelector(".burgerBtn");
const navbar = document.querySelector(".navbar");
burgerBtn.addEventListener("click", () => {
    navbar.classList.toggle("show");
    if (navbar.classList.contains("show")) {
        burgerBtn.textContent = "✖";
    } else {
        burgerBtn.textContent = "☰";
    }
});
const sections = document.querySelectorAll(".section");
const nav_links = document.querySelectorAll(".nav-links a");
const options = {
    threshold: 0.1
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("display");
            nav_links.forEach(link => { link.classList.remove("design"); });
            const id = entry.target.getAttribute("id");
            if (id) {
                const active_link = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (active_link) {
                    active_link.classList.add("design");
                }
            }
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});
const backBtn = document.querySelector(".backBtn");
window.addEventListener("scroll", () => {
    if (window.scrollY < 300) {
        backBtn.classList.add("hide");
    } else {
        backBtn.classList.remove("hide");
    }
});
backBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
const inputEmail = document.querySelector(".inputEmail");
const emailMessage = document.querySelector(".emailMessage");
const message = document.querySelector(".message");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
inputEmail.addEventListener("input", () => {
    validateEmail();
});
function validateEmail() {
    const email = inputEmail.value.trim();
    const isEmailValid = email !== "" && emailRegex.test(email);
    if (isEmailValid) {
        emailMessage.textContent = "";
        emailMessage.classList.remove("error");
        return true;
    } else {
        emailMessage.textContent = "Please enter a valid email address";
        emailMessage.classList.add("error");
        return false;
    }
}
const form = document.querySelector(".form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailOk = validateEmail();
    if (emailOk) {
        message.textContent = "Thank you for subscribing! Check your inbox soon.";
        message.classList.add("success");
        message.classList.remove("error");
    } else {
        message.textContent = "Please enter a valid email address";
        message.classList.add("error");
        message.classList.remove("success");
    }
});
const filterBtns = document.querySelectorAll(".filter-btn");
const allCards = document.querySelectorAll(".latest-card");
const inputSearch = document.querySelector(".inputSearch");
const searchBtn = document.querySelector(".searchBtn");
const noResultsMsg = document.querySelector(".no-results");
const heroSection = document.querySelector(".hero-section"); 
const trendingSection = document.querySelector("#trending");
const aboutSection = document.querySelector("#about");
const subscription_section = document.querySelector(".subscription-section"); 
inputSearch.classList.add("hide");
searchBtn.addEventListener("click", () => {
    inputSearch.classList.toggle("hide");
    if (!inputSearch.classList.contains("hide")) {
        inputSearch.focus();
    }
});
function filterAndSearch() {
    const activeBtn = document.querySelector(".filter-btn.active");
    const rawCategory = activeBtn ? activeBtn.getAttribute("data-category") : "all";
    const selectedCategory = rawCategory ? rawCategory.toLowerCase().trim() : "all";
    const searchValue = inputSearch ? inputSearch.value.toLowerCase().trim() : "";
    if (searchValue.length > 0) {
        if (heroSection) heroSection.style.display = "none";
        if (trendingSection) trendingSection.style.display = "none";
        if (aboutSection) aboutSection.style.display = "none";
        if (subscription_section) subscription_section.style.display = "none";
    } else {
        if (heroSection) heroSection.style.display = "";
        if (trendingSection) trendingSection.style.display = "";
        if (aboutSection) aboutSection.style.display = "";
        if (subscription_section) subscription_section.style.display = "";
    }
    let matchesCount = 0;
    allCards.forEach(card => {
        const rawCardCategory = card.getAttribute("data-category");
        const cardCategory = rawCardCategory ? rawCardCategory.toLowerCase().trim() : "";
        const matchesCategory = (selectedCategory === "all" || cardCategory === selectedCategory);
        const titleText = card.querySelector("h3") ? card.querySelector("h3").innerText.toLowerCase() : "";
        const descText = card.querySelector(".dis") ? card.querySelector(".dis").innerText.toLowerCase() : "";
        const tagText = card.querySelector(".tag") ? card.querySelector(".tag").innerText.toLowerCase() : "";
        const matchesSearch = (searchValue === "") || 
            titleText.includes(searchValue) || 
            descText.includes(searchValue) || 
            tagText.includes(searchValue);
        if (matchesCategory && matchesSearch) {
            card.classList.remove("hide");
            matchesCount++;
        } else {
            card.classList.add("hide");
        }
    });
    if (matchesCount === 0) {
        if (noResultsMsg) noResultsMsg.classList.remove("hide"); 
    } else {
        if (noResultsMsg) noResultsMsg.classList.add("hide");    
    }
}
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filterBtns.forEach(button => button.classList.remove("active"));
        btn.classList.add("active");
        filterAndSearch();
    });
});
if (inputSearch) {
    inputSearch.addEventListener("input", filterAndSearch);
}
const subBtn = document.querySelector(".subBtn");
subBtn.addEventListener("click", () => {
    subscription_section.scrollIntoView({
        behavior: "smooth"
    });
});
const readMoreBtns = document.querySelectorAll(".read");
readMoreBtns.forEach(readBtn => {
    readBtn.addEventListener("click", () => {
        trendingSection.scrollIntoView({
            behavior: "smooth"
        });
    });
});
const readHeroBtn = document.querySelector(".hero-btn");
const latest_section = document.querySelector(".latest-section");
readHeroBtn.addEventListener("click", () => {
    latest_section.scrollIntoView({
        behavior: "smooth"
    });
});
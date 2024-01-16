async function getTestimonialData() {
    const response = await fetch('https://api.npoint.io/5d13ac3b5faee9b78fe0');
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error loading data');
    }
}

async function displayTestimonials(testimonials) {
    const testimonialHTML = testimonials.map((element) => {
        return `<div class="card m-3" style="width: 20rem;">
        <img class="card-img-top" src="${element.image}" alt="Card image cap">
        <div class="card-body">
            <p class="card-text">${element.content}</p>
            <h5 class="card-title text-right">- ${element.author}</h5>
        </div>
    </div>`;
    });

    document.getElementById("testimonials").innerHTML = testimonialHTML.join(" ");
}

async function allTestimonial() {
    const testimonialsContainer = document.getElementById("testimonials");
    testimonialsContainer.innerHTML = "Loading...";

    try {
        const testimonials = await getTestimonialData();
        await displayTestimonials(testimonials);
    } catch (error) {
        console.error(error);
    }
}

allTestimonial();

async function filteredTestimonial(rating) {
    const testimonialsContainer = document.getElementById("testimonials");
    testimonialsContainer.innerHTML = "Loading...";

    try {
        const testimonials = await getTestimonialData();
        const filteredTestimonial = testimonials.filter((element) => element.rating === rating);
        await displayTestimonials(filteredTestimonial);
    } catch (error) {
        console.error(error);
    }
}
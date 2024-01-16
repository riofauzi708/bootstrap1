const testimonials = [
    {
        author: "Maximus",
        content: "this is amazing",
        image: "asset/img/testimonial1.jpg",
        rating: 5
    },
    {
        author: "Bobi",
        content: "Boleh juga keahlianmu",
        image: "asset/img/testimonial2.jpg",
        rating: 1
    },
    {
        author: "Sutejo",
        content: "Kamu hebat sekali",
        image: "asset/img/testimonial3.jpg",
        rating: 2
    },
    {
        author: "Hanah",
        content: "Saya tertarik untuk bergabung",
        image: "asset/img/testimonial4.jpg",
        rating: 3
    },
    {
        author: "Fanny",
        content: "Saya setuju denganmu",
        image: "asset/img/testimonial5.jpg",
        rating: 4
    }
];

function allTestimonial() {
    const testimonialHTML = testimonials.map((element) => {
        return `<div class="list-testi">
        <img class="img-testi" src="${element.image}" alt=""/>
        <p class="p1">${element.content}</p>
        <p class="p2">- ${element.author}</p>
    </div>`;
    });

    document.getElementById("testimonials").innerHTML = testimonialHTML.join(" ");
}

allTestimonial();

function filteredTestimonial(rating) {
    const filteredTestimonial = testimonials.filter((element) => element.rating === rating);

    const filteredTestimonialHTML = filteredTestimonial.map((element) => {
        return `<div class="list-testi">
            <img class="img-testi" src="${element.image}" alt=""/>
            <p class="p1">${element.content}</p>
            <p class="p2">- ${element.author}</p>
        </div>`;
    });

    document.getElementById("testimonials").innerHTML = filteredTestimonialHTML.join(" ");
}
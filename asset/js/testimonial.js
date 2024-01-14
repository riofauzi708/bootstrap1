class Testimonial {
    #author = ""
    #image = ""
    #content = ""

    constructor(author, image, content) {
        this.#author = author
        this.#image = image
        this.#content = content
    }

    set author(val) {
        this.#author = val
    }
    set image(val) {
        this.#image = val
    }
    set content(val) {
        this.#content = val
    }

    get author() {
        return this.#author
    }
    get image() {
        return this.#image
    }
    get content() {
        return this.#content
    }

    html() {
        return  `
        <div class="card m-3" style="width: 20rem;">
        <img class="card-img-top" src="${this.#image}" alt="Card image cap">
        <div class="card-body">
          <p class="card-text">${this.#content}</p>
          <h5 class="card-title text-right">- ${this.#author}</h5>
        </div>
      </div>
      `
    }
}

const testimonial1 = new Testimonial("Rio Fauzi", "asset/img/testimonial1.jpg", "Ini sangat bagus sekali")
const testimonial2 = new Testimonial("Jodi", "asset/img/testimonial2.jpg", "Boleh juga keahlianmu")
const testimonial3 = new Testimonial("Suparman", "asset/img/testimonial3.jpg", "Penampilan yang sempurna")
const testimonial4 = new Testimonial("Marsha", "asset/img/testimonial4.jpg", "Saya tertarik untuk bergabung")
const testimonial5 = new Testimonial("Dima Ikmila", "asset/img/testimonial5.jpg", "Saya setuju denganmu")

const testimonials = {testimonial1, testimonial2, testimonial3, testimonial4, testimonial5}
let testimonialsHTML = ""

for (let index in testimonials) {
    testimonialsHTML += testimonials[index].html()
}

document.getElementById("testimonials").innerHTML = testimonialsHTML
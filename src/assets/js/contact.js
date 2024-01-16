function submitData() {
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const phoneNumber = document.getElementById("phoneNumber").value
    const subject = document.getElementById("subject").value
    const message = document.getElementById("message").value


    alert(`${name}\n${email}\n${phoneNumber}\n${subject}\n${message}`)

    if(name == "") {
        return alert("name must be filled in")
    } else if (email =="") {
        return alert("email must be filled in")
    } else if (phoneNumber =="") {
        return alert("phoneNumber must be filled in")
    } else if (subject == "") {
        return alert("subject must be filled in")
    } else if (message =="") {
        return alert("message must be filled in")
    }

    console.log(name)
    console.log(email)
    console.log(phoneNumber)
    console.log(subject)
    console.log(message)


    let a = document.createElement('a')
    a.href = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(message)}, 
    nama saya ${name}, kontak saya di ${phoneNumber}`
    a.click()
}
export default function upButton() {

    let btnOpn = document.querySelector(".button-up");

    window.onscroll = () => {
        if (window.scrollY > 400) {
            btnOpn.classList.remove("button-up-hidden");
        } else if (window.scrollY < 400) {
            btnOpn.classList.add("button-up-hidden");
        }
    };

    btnOpn.addEventListener('click', () => { window.scrollTo(0, 0); })

    return
}
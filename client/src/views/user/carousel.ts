let imgs = document.querySelectorAll(
  ".carousel-img"
) as NodeListOf<HTMLElement>;

let totalImgs = imgs.length;
let imgPosition = 0;
let slideInterval: number;

function update() {
  for (let img of imgs) {
    img.classList.remove("visible");
    img.classList.add("hidden");
  }

  imgs[imgPosition].classList.remove("hidden");
  imgs[imgPosition].classList.add("visible");

  titles[imgPosition].classList.remove("hidden");
  titles[imgPosition].classList.add("visible");
}

function startSlideShow() {
  slideInterval = setInterval(nextImg, 4000);
}

function stopSlideShow() {
  clearInterval(slideInterval);
}

function nextImg() {
  if (imgPosition === totalImgs - 1) {
    imgPosition = 0;
  } else {
    imgPosition++;
  }
  update();
}

startSlideShow();

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;

  if (target.classList.contains("prev") || target.classList.contains("next")) {
    stopSlideShow();
    setTimeout(startSlideShow, 500);
  }
});

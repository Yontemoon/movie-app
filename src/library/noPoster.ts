const noPoster = (image) => {
    image.onerror = ""
    image.src = "../images/default-poster.png"
}
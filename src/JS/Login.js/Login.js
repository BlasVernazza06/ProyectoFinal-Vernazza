
const avatarPicker = document.getElementById('section-Avatar')

const elegirAvatar = () => {
    fetch('https://rickandmortyapi.com/api/character/1')
        .then((resp) => resp.json())
        .then((avatars) => {

            avatarPicker.innerHTML = `<div class="avatar-imagesSec">
                        <img src= ${avatars.image} alt=${data.name}>
                        <img src="./src/images/products/Misiones.jpeg" alt="">
                      </div>`;
    })
}
    
elegirAvatar()
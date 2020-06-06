const starship = document.createElement('div')
starship.setAttribute('id', 'starship')
document.body.appendChild(starship)

const poteau = document.createElement('div')
poteau.setAttribute('id', 'poteau')
document.body.appendChild(poteau)


const player = document.createElement('div')
player.setAttribute('id', 'player')
document.body.appendChild(player)


function sizeInit() {
    poteau.style.left = `${document.documentElement.clientWidth / 2 - poteau.offsetWidth / 2}px`
    poteau.style.top = `${document.documentElement.clientHeight / 2 - poteau.offsetHeight / 2}px`

    starship.style.left = `${document.documentElement.clientWidth / 2 - starship.offsetWidth / 2}px`
    starship.style.top = `${document.documentElement.clientHeight / 2 - starship.offsetHeight / 2}px`

    player.style.left = `${document.documentElement.clientWidth / 2 - player.offsetWidth / 2 + poteau.offsetWidth}px`
    player.style.top = `${document.documentElement.clientHeight / 2 - player.offsetHeight / 2 + poteau.offsetWidth}px`
}

sizeInit()
window.addEventListener('resize', sizeInit)



let coords
updateDisplayedCoords()


document.addEventListener('keydown', ({ key }) => {

    switch (key) {
        case 'ArrowLeft':
            checkIfCoordsAreAvaiable('ArrowLeft')
                ? (
                    player.style.left = `${parseFloat(player.style.left) - 1 * 10}px`,
                    updateDisplayedCoords
                )
                : false
            break;
        case 'ArrowRight':
            checkIfCoordsAreAvaiable('ArrowRight')
                ? (
                    player.style.left = `${parseFloat(player.style.left) + 1 * 10}px`,
                    updateDisplayedCoords
                )
                : false
            break;
        case 'ArrowUp':
            checkIfCoordsAreAvaiable('ArrowUp')
                ? (
                    player.style.top = `${parseFloat(player.style.top) - 1 * 10}px`,
                    updateDisplayedCoords
                )
                : false
            break;
        case 'ArrowDown':
            checkIfCoordsAreAvaiable('ArrowDown')
                ? (
                    player.style.top = `${parseFloat(player.style.top) + 1 * 10}px`,
                    updateDisplayedCoords
                )
                : false
            break;
    }
})


function updateDisplayedCoords() {
    coords = {
        starship: {
            topLeft: starship.offsetLeft,
            topRight: starship.offsetLeft + starship.offsetWidth,
            bottomLeft: starship.offsetTop,
            bottomRight: starship.offsetTop + starship.offsetHeight
        },
        poteau: {
            topLeft: poteau.offsetLeft,
            topRight: poteau.offsetLeft + poteau.offsetWidth,
            bottomLeft: poteau.offsetTop,
            bottomRight: poteau.offsetTop + poteau.offsetHeight
        },
        player: {
            topLeft: player.offsetLeft,
            topRight: player.offsetLeft + player.offsetWidth,
            bottomLeft: player.offsetTop,
            bottomRight: player.offsetTop + player.offsetHeight
        }
    }
}


function checkIfCoordsAreAvaiable(key) {

    let nextPlayerPosition


    switch (key) {
        case 'ArrowLeft':
            nextPlayerPosition = {
                topLeft: player.offsetLeft - 10,
                topRight: player.offsetLeft - 10 + player.offsetWidth,
                bottomLeft: player.offsetTop,
                bottomRight: player.offsetTop + player.offsetHeight
            }
            break;
        case 'ArrowRight':
            nextPlayerPosition = {
                topLeft: player.offsetLeft + 10,
                topRight: player.offsetLeft + 10 + player.offsetWidth,
                bottomLeft: player.offsetTop,
                bottomRight: player.offsetTop + player.offsetHeight
            }
            break;
        case 'ArrowUp':
            nextPlayerPosition = {
                topLeft: player.offsetLeft,
                topRight: player.offsetLeft + player.offsetWidth,
                bottomLeft: player.offsetTop - 10,
                bottomRight: player.offsetTop - 10 + player.offsetHeight
            }
            break;
        case 'ArrowDown':
            nextPlayerPosition = {
                topLeft: player.offsetLeft,
                topRight: player.offsetLeft + player.offsetWidth,
                bottomLeft: player.offsetTop + 10,
                bottomRight: player.offsetTop + 10 + player.offsetHeight
            }
            break;
    }


    const starship_a = coords.starship.topLeft < nextPlayerPosition.topLeft
    const starship_b = coords.starship.topRight > nextPlayerPosition.topRight
    const starship_c = coords.starship.bottomLeft < nextPlayerPosition.bottomLeft
    const starship_d = coords.starship.bottomRight > nextPlayerPosition.bottomRight


    const poteau_a = coords.poteau.topLeft < nextPlayerPosition.topRight
    const poteau_b = coords.poteau.topRight < nextPlayerPosition.topLeft
    const poteau_c = coords.poteau.bottomLeft < nextPlayerPosition.bottomRight
    const poteau_d = coords.poteau.bottomRight < nextPlayerPosition.bottomLeft

    let granted = true

    if (
        (poteau_a && poteau_c && !poteau_d && !poteau_b)
        || (poteau_b && poteau_d && !poteau_a)
        || !starship_a
        || !starship_b
        || !starship_c
        || !starship_d
    ) {
        granted = false
    }

    return granted
}

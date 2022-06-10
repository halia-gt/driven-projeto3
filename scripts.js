let plateSelected = false;
let drinkSelected = false;
let dessertSelected = false;
let plateIndex = -1;
let drinkIndex = -1;
let dessertIndex = -1;
let plateProduct = [];
let drinkProduct = [];
let dessertProduct = [];


const optionBox = document.querySelectorAll('.option-box');
for (let i = 0; i < optionBox.length; i++) {
    optionBox[i].addEventListener('click', function() {
        selectOption(i);
      });
}

function selectOption(i) {
    if (i <= 3) {
        if (plateSelected === true) {
            removeOption(plateIndex);
        }
        plateIndex = i;
        plateSelected = true;

    } else if (i >= 4 && i <= 7) {
        if (drinkSelected === true) {
            removeOption(drinkIndex);
        }
        drinkIndex = i;
        drinkSelected = true;

    } else if (i >= 8) {
        if (dessertSelected === true) {
            removeOption(dessertIndex);
        }
        dessertIndex = i;
        dessertSelected = true;
    }


    optionBox[i].classList.add('green-select');
    createProduct(i);
}

// Remove seleção
function removeOption(i) {
    optionBox[i].classList.remove('green-select');
}

// Adiciona o produto
function createProduct(i) {
    const productName = document.querySelectorAll('.option-box h3')[i].innerHTML;
    const productPrice = Number(document.querySelectorAll('.option-box span')[i].innerHTML.replace(",", "."));
    
    if (i <= 3) {
        plateProduct[0] = productName;
        plateProduct[1] = productPrice;

    } else if (i >= 4 && i <= 7) {
        drinkProduct[0] = productName;
        drinkProduct[1] = productPrice;
        
    } else if (i >= 8) {
        dessertProduct[0] = productName;
        dessertProduct[1] = productPrice;
    }
}


// Função pra editar o botão de finalizar pedido

function selectCheckout() {
    const buttonCheckout = document.querySelector('.checkout-button')

    //Aqui vou ter que fazer algum tipo de condição acho pra garantir que os três produtos estão selecionados.
    buttonCheckout.classList.add('green-button');
    buttonCheckout.innerHTML = "Fechar pedido";
}



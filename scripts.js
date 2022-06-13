// Condição pra dizer se cada uma das opções está selecionada:
let plateSelected = false;
let drinkSelected = false;
let dessertSelected = false;

// Index da caixa que eu selecionei:
let plateIndex;
let drinkIndex;
let dessertIndex;

// Array com produto, [0] é nome, [1] é preço
let plateProduct = [];
let drinkProduct = [];
let dessertProduct = [];

// Preço total pra ser usado em mais de uma função
let totalPrice = 0;

// Adiciona evento listener nos botões e me dá o índice do botão, porque não queria usar onclick pra tantas opções no html
const optionBox = document.querySelectorAll('.option-box');
for (let i = 0; i < optionBox.length; i++) {
    optionBox[i].addEventListener('click', function() {
        selectOption(i);
      });
}

// Minha versão de 'onclick' dos botões de finalizar pedido
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.addEventListener('click', openModal);

const confirmButton = document.querySelector('.confirm-button');
confirmButton.addEventListener('click', confirmCheckout);

const cancelButton = document.querySelector('.cancel-button');
cancelButton.addEventListener('click', cancelCheckout);

// Seleciona e de-seleciona as comidas baseado no index fornecido
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
    selectCheckout();
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

// Libera botão de finalizar pedido
function selectCheckout() {
    const buttonCheckout = document.querySelector('.checkout-button');

    if (plateSelected && drinkSelected && dessertSelected) {
        buttonCheckout.classList.add('green-button');
        buttonCheckout.innerHTML = "Fechar pedido";
    }
}

// Abre o modal
function openModal() {
    if (checkoutButton.classList.contains('green-button')) {
        editModal();

        const modal = document.querySelector('.modal');
        modal.classList.remove('hidden');
    }
}

// Edita o modal antes de aparecer
function editModal() {
    const productList = document.querySelectorAll('td');
    totalPrice = (plateProduct[1] + drinkProduct[1] + dessertProduct[1]);
    const strTotalPrice = totalPrice.toFixed(2);
    
    productList[0].innerHTML = plateProduct[0];
    productList[1].innerHTML = plateProduct[1].toFixed(2).replace(".", ",");
    productList[2].innerHTML = drinkProduct[0];
    productList[3].innerHTML = drinkProduct[1].toFixed(2).replace(".", ",");
    productList[4].innerHTML = dessertProduct[0];
    productList[5].innerHTML = dessertProduct[1].toFixed(2).replace(".", ",");
    productList[7].innerHTML = `R$ ${strTotalPrice.replace(".", ",")}`;

}
// Confirmação de checkout
function confirmCheckout() {
    const name = prompt('Digite o seu nome:');
    const endereco = prompt('Digite o seu endereço:');
    const message = `Olá, gostaria de fazer o pedido:\n- Prato: ${plateProduct[0]}\n- Bebida: ${drinkProduct[0]}\n- Sobremesa: ${dessertProduct[0]}\nTotal: R$ ${totalPrice.toFixed(2).replace(".",",")}\n\nNome: ${name}\nEndereço: ${endereco}`;
    const encodeText = encodeURIComponent(message);
    location.href = `https://wa.me/?text=${encodeText}`;
}

// Cancelar checkout
function cancelCheckout() {
    const modal = document.querySelector('.modal');
    modal.classList.add('hidden');
}
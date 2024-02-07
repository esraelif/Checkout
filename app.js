function updateTotal(element) {
    let price = parseFloat(element.querySelector('.price').textContent.trim().substring(1));
    let quantity = parseInt(element.querySelector('input[type="number"]').value);
    let total = price * quantity;
    element.querySelector('.total').textContent = '$' + total.toFixed(2);
    updateSubtotal();
}
function setupButtons() {
    document.querySelectorAll('.button1').forEach(function (button) {
        button.addEventListener('click', function () {
            let input = this.parentNode.querySelector('input[type="number"]');
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
                updateTotal(this.closest('.watch'));
            }
        });
    });

    document.querySelectorAll('.button2').forEach(function (button) {
        button.addEventListener('click', function () {
            let input = this.parentNode.querySelector('input[type="number"]');
            input.value = parseInt(input.value) + 1;
            updateTotal(this.closest('.watch'));
        });
    });

    document.querySelectorAll('.remove').forEach(function (button) {
        button.addEventListener('click', function () {
            this.closest('.watch').remove();
            updateSubtotal();
        });
    });

    document.querySelectorAll('input[type="number"]').forEach(function (input) {
        input.addEventListener('input', function () {
            updateTotal(this.closest('.watch'));
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    setupButtons();
});



document.addEventListener('DOMContentLoaded', function () {
    updateSubtotal();

    var quantityInputs = document.querySelectorAll('.item input[type="number"]');
    quantityInputs.forEach(function (input) {
        input.addEventListener('change', updateSubtotal);
    });
});

function updateSubtotal() {
    var totalPrices = document.querySelectorAll('.total');
    var subtotal = 0;

    totalPrices.forEach(function (element) {
        var cleanedText = element.textContent.trim();
        var price = parseFloat(cleanedText.replace('$', ''));
        if (!isNaN(price)) {
            subtotal += price;
        }
    });

    var tax = subtotal * 0.18;
    var shipping = 17;
    var total = subtotal + tax + shipping;

    document.querySelector('.subprice').textContent = '$' + subtotal.toFixed(2);
    document.querySelector('.taxprice').textContent = '$' + tax.toFixed(2);
    document.querySelector('.shippingprice').textContent = '$' + shipping.toFixed(2);
    document.querySelector('.totalprice').textContent = '$' + total.toFixed(2);
}
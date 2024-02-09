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

    function updateCardPositions() {
        var container = document.querySelector('.container');
        var watches = container.querySelectorAll('.watch');

        watches.forEach(function (watch, index) {
            watch.style.transition = 'transform 0.3s ease-in-out';
            watch.style.transform = 'translateX(-' + (index * 350) + 'px)';
        });
    }

    document.querySelectorAll('.remove').forEach(function (button) {
        button.addEventListener('click', function () {
            var removedWatch = this.closest('.watch');
            removedWatch.style.transition = 'transform 0.3s ease-in-out';
            removedWatch.style.transform = 'translateX(-100%)';
            setTimeout(function () {
                removedWatch.remove();
                updateSubtotal();
                updateCardPositions(); // Kartların sırasını güncelle
            }, 300);
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

    let quantityInputs = document.querySelectorAll('.item input[type="number"]');
    quantityInputs.forEach(function (input) {
        input.addEventListener('change', updateSubtotal);
    });
});

function updateSubtotal() {
    let totalPrices = document.querySelectorAll('.total');
    let subtotal = 0;

    totalPrices.forEach(function (element) {
        let cleanedText = element.textContent.trim();
        let price = parseFloat(cleanedText.replace('$', ''));
        if (!isNaN(price)) {
            subtotal += price;
        }
    });

    let tax = subtotal * 0.18;
    let shipping = subtotal >= 120 ? 0 : 17; // Eğer subtotal $120'den büyükse, shipping ücretsiz olacak
    let total = subtotal + tax + shipping;

    document.querySelector('.subprice').textContent = '$' + subtotal.toFixed(2);
    document.querySelector('.taxprice').textContent = '$' + tax.toFixed(2);
    document.querySelector('.shippingprice').textContent = '$' + shipping.toFixed(2);
    document.querySelector('.totalprice').textContent = '$' + total.toFixed(2);
}
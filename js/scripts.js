$(document).ready(function() {
    // Load data on page load
    loadData();

    // Handle form submission
    $('#productForm').on('submit', function(e) {
        e.preventDefault();

        const productName = $('#productName').val();
        const quantity = $('#quantity').val();
        const price = $('#price').val();
        const dateTime = new Date().toISOString();

        const data = {
            productName,
            quantity,
            price,
            dateTime
        };

        $.ajax({
            url: 'save_data.php',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(response) {
                loadData();
                $('#productForm')[0].reset();
            }
        });
    });
});

function loadData() {
    $.ajax({
        url: 'load_data.php',
        header: {
            ''
        },
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            const tbody = $('#productTable tbody');
            tbody.empty();
            let sumTotal = 0;

            data.forEach(item => {
                const totalValue = item.quantity * item.price;
                sumTotal += totalValue;

                const row = `<tr>
                    <td>${item.productName}</td>
                    <td>${item.quantity}</td>
                    <td>${item.price}</td>
                    <td>${item.dateTime}</td>
                    <td>${totalValue.toFixed(2)}</td>
                    <td><button class="btn btn-sm btn-warning edit-button" data-id="${item.id}">Edit</button></td>
                </tr>`;

                tbody.append(row);
            });

            $('#sumTotal').text(sumTotal.toFixed(2));
        }
    });
}

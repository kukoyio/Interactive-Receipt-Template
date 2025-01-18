// Function to format the date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

// Set the current date in the receipt
document.getElementById('currentDate').textContent = formatDate(new Date());

// Add a new row to the receipt table
document.getElementById('addRow').addEventListener('click', () => {
    const tableBody = document.querySelector('#receiptTable tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="text" placeholder="Item Name"></td>
        <td><input type="number" class="quantity" value="0" min="0"></td>
        <td><input type="number" class="price" value="0" min="0" step="0.01"></td>
        <td class="itemTotal">0.00</td>
        <td><button class="remove-btn">-</button></td>
    `;
    tableBody.appendChild(newRow);
    updateListeners();
});

// Export the receipt
document.getElementById('export').addEventListener('click', () => {
    // Hide all elements with the "hide-on-export" class
    const exportElements = document.querySelectorAll('.hide-on-export');
    exportElements.forEach(el => el.style.display = 'none');

    // Print or export the receipt
    window.print();

    // Restore visibility of hidden elements after exporting
    setTimeout(() => {
        exportElements.forEach(el => el.style.display = '');
    }, 1000);
});

// Function to update the totals based on the input values
function updateListeners() {
    const quantities = document.querySelectorAll('.quantity');
    const prices = document.querySelectorAll('.price');
    const removeButtons = document.querySelectorAll('.remove-btn');

    const updateTotals = () => {
        let grandTotal = 0;
        document.querySelectorAll('#receiptTable tbody tr').forEach(row => {
            const quantity = parseFloat(row.querySelector('.quantity').value) || 0;
            const price = parseFloat(row.querySelector('.price').value) || 0;
            const total = quantity * price;
            row.querySelector('.itemTotal').textContent = total.toFixed(2);
            grandTotal += total;
        });
        document.getElementById('grandTotal').textContent = grandTotal.toFixed(2);
    };

    quantities.forEach(input => input.addEventListener('input', updateTotals));
    prices.forEach(input => input.addEventListener('input', updateTotals));

    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const row = event.target.closest('tr');
            row.remove();
            updateTotals(); // Recalculate after removing a row
        });
    });
}

updateListeners();

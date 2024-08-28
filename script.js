document.addEventListener('DOMContentLoaded', () => {
    fetchEntries();

    document.getElementById('add-entry-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        // Convert dollars and cents into a single amount
        // const amountDollars = parseFloat(data['amount-dollars']) || 0;
        // const amountCents = parseFloat(data['amount-cents']) || 0;
        // const totalAmount = (amountDollars + amountCents / 100).toFixed(2);
        //
        // // Add totalAmount to data
        // data.amount = totalAmount;

        // Remove the separate dollar and cent fields from the data object
        // delete data['amount-dollars'];
        // delete data['amount-cents'];

        // console.log(data.toString());
        try {
            await fetch('add_entry.php', {
                method: 'POST',
                body: new URLSearchParams(data)
            });
            fetchEntries();  // Refresh entries after adding
        } catch (error) {
            console.error('Error adding entry:', error);
        }
    });
});

async function fetchEntries() {
    try {
        const response = await fetch('get_entries.php');
        const entries = await response.json();
        displayEntries(entries);
        calculateTotals(entries);
    } catch (error) {
        console.error('Error fetching entries:', error);
    }
}

function displayEntries(entries) {
    const entriesContainer = document.getElementById('entries');
    entriesContainer.innerHTML = '';  // Clear existing entries

    if (entries.length === 0) {
        entriesContainer.innerHTML = '<p>No entries found.</p>';
        return;
    }

    // Create the table
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Payer</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;

    const tbody = table.querySelector('tbody');

    let lastDate = '';

    entries.forEach(entry => {
        const currentDate = new Date(entry.date).toLocaleDateString();

        if (currentDate !== lastDate) {
            // Create a new row for the date
            const dateRow = document.createElement('tr');
            dateRow.innerHTML = `
                <td colspan="3" style="font-weight: bold; padding-top: 10px;">${currentDate}</td>
            `;
            tbody.appendChild(dateRow);
            lastDate = currentDate; // Update lastDate to current date
        }

        // Create a row for the entry
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.description}</td>
            <td>$${parseFloat(entry.amount).toFixed(2)}</td>
            <td>${entry.payer.charAt(0).toUpperCase() + entry.payer.slice(1)}</td>
        `;
        tbody.appendChild(row);
    });

    entriesContainer.appendChild(table);
}

function calculateTotals(entries) {
    const dailyTotals = {};
    const monthlyTotals = {};

    entries.forEach(entry => {
        const date = new Date(entry.date);
        const day = date.toISOString().split('T')[0];
        const month = date.toISOString().slice(0, 7); // YYYY-MM

        if (!dailyTotals[day]) {
            dailyTotals[day] = 0;
        }
        dailyTotals[day] += parseFloat(entry.amount);

        if (!monthlyTotals[month]) {
            monthlyTotals[month] = 0;
        }
        monthlyTotals[month] += parseFloat(entry.amount);
    });

    displayTotals(dailyTotals, monthlyTotals);
}

function displayTotals(dailyTotals, monthlyTotals) {
    const dailyTotalsContainer = document.getElementById('daily-totals');
    const monthlyTotalsContainer = document.getElementById('monthly-totals');

    dailyTotalsContainer.innerHTML = '<h3>Daily Totals</h3>';
    for (const [day, total] of Object.entries(dailyTotals)) {
        dailyTotalsContainer.innerHTML += `Day: ${day} - Total: $${total.toFixed(2)}<br>`;
    }

    monthlyTotalsContainer.innerHTML = '<h3>Monthly Totals</h3>';
    for (const [month, total] of Object.entries(monthlyTotals)) {
        monthlyTotalsContainer.innerHTML += `Month: ${month} - Total: $${total.toFixed(2)}<br>`;
    }
}

function showPage(pageName)
{
  if(pageName == "home")
  {
    document.querySelector('#addScreen').style.display = 'none';
    document.querySelector('#viewScreen').style.display = 'block';
  }
  else if(pageName == "add")
  {
    document.querySelector('#viewScreen').style.display = 'none';
    document.querySelector('#addScreen').style.display = 'block';

  }

}

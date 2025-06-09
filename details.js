document.addEventListener('DOMContentLoaded', () => {
    const details = JSON.parse(localStorage.getItem('bookingDetails'));

    if (details) {
        const detailsDiv = document.getElementById('details');
        detailsDiv.innerHTML = `
            <p><strong>Name:</strong> ${details.name}</p>
            <p><strong>Email:</strong> ${details.email}</p>
            <p><strong>Doctor:</strong> ${details.doctor}</p>
            <p><strong>Date:</strong> ${details.date}</p>
        `;
    } else {
        alert('No booking details found!');
        window.location.href = 'index.html';
    }
});

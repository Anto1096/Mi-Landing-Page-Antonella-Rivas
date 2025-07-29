document.addEventListener('DOMContentLoaded', () => {
    // Animación de conteo para las tarjetas de estadísticas
    const counters = document.querySelectorAll('.card-info p');
    const speed = 200; // Velocidad de la animación

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace('$', '');

            const inc = target / speed;

            if (count < target) {
                const newCount = Math.ceil(count + inc);
                counter.innerText = counter.innerText.includes('$') ? '$' + newCount : newCount;
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = counter.innerText.includes('$') ? '$' + target : target;
                
                // Iniciar el incremento infinito según el ID del contador
                if (counter.id === 'total-sales') {
                    setInterval(() => {
                        let currentVal = +counter.innerText.replace('$', '');
                        currentVal += 747;
                        counter.innerText = '$' + currentVal;
                    }, 1500); // Cada 1.5 segundos
                } else if (counter.id === 'new-users') {
                    setInterval(() => {
                        let currentVal = +counter.innerText;
                        currentVal += 1;
                        counter.innerText = currentVal;
                    }, 3000); // Cada 3 segundos
                } else if (counter.id === 'today-orders') {
                    setInterval(() => {
                        let currentVal = +counter.innerText;
                        currentVal += 1;
                        counter.innerText = currentVal;
                    }, 5000); // Cada 5 segundos
                }
            }
        };
        updateCount();
    });

    // Configuración del gráfico de ventas
    const ctx = document.getElementById('salesChart').getContext('2d');
    const salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{
                label: 'Ventas 2025',
                data: [1200, 1900, 3000, 5000, 2300, 3200],
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
});

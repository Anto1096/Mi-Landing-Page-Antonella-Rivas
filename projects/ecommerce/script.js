document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const modal = document.getElementById('quick-view-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const cartCount = document.getElementById('cart-count');
    let cartItems = 0;

    const products = [
        { id: 1, name: 'Camisa Casual', price: 29.99, category: 'camisas', img: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=987&auto=format&fit=crop', desc: 'Camisa de algodón perfecta para cualquier ocasión.' },
        { id: 2, name: 'Pantalón Jean', price: 49.99, category: 'pantalones', img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=987&auto=format&fit=crop', desc: 'Jean clásico de corte recto, duradero y cómodo.' },
        { id: 3, name: 'Zapatillas Urbanas', price: 79.99, category: 'zapatillas', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170&auto=format&fit=crop', desc: 'Zapatillas modernas para un look urbano y fresco.' },
        { id: 4, name: 'Camisa de Lino', price: 34.99, category: 'camisas', img: 'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?q=80&w=987&auto=format&fit=crop', desc: 'Camisa de lino ideal para climas cálidos.' },
        { id: 5, name: 'Zapatillas Deportivas', price: 89.99, category: 'zapatillas', img: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1064&auto=format&fit=crop', desc: 'Zapatillas optimizadas para el rendimiento deportivo.' },
        { id: 6, name: 'Pantalón Chino', price: 54.99, category: 'pantalones', img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=987&auto=format&fit=crop', desc: 'Pantalón de gabardina versátil y elegante.' },
        { id: 7, name: 'Camisa a Cuadros', price: 44.99, category: 'camisas', img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=987&auto=format&fit=crop', desc: 'Clásica camisa a cuadros, un básico en tu armario.' },
        { id: 8, name: 'Zapatillas de Cuero', price: 119.99, category: 'zapatillas', img: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1065&auto=format&fit=crop', desc: 'Zapatillas de cuero premium para un estilo sofisticado.' }
    ];

    const renderProducts = (filter = 'all') => {
        productGrid.innerHTML = '';
        const filteredProducts = products.filter(p => filter === 'all' || p.category === filter);
        filteredProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                </div>
                <div class="product-overlay">
                    <button class="btn-primary quick-view-btn" data-id="${product.id}">Vista Rápida</button>
                </div>
            `;
            productGrid.appendChild(card);
        });
    };

    // Filter logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts(btn.dataset.filter);
        });
    });

    // Modal logic
    productGrid.addEventListener('click', e => {
        if (e.target.classList.contains('quick-view-btn')) {
            const product = products.find(p => p.id == e.target.dataset.id);
            modalBody.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <div>
                    <h2>${product.name}</h2>
                    <p>${product.desc}</p>
                    <h3>$${product.price}</h3>
                    <button class="btn-primary add-to-cart-btn">Añadir al Carrito</button>
                </div>
            `;
            modal.classList.add('visible');
        }
    });

    closeModalBtn.addEventListener('click', () => modal.classList.remove('visible'));
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('visible'); });

    // Add to cart logic
    modalBody.addEventListener('click', e => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            cartItems++;
            cartCount.textContent = cartItems;
            showToast('¡Producto añadido al carrito!');
            modal.classList.remove('visible');
        }
    });

    // Toast notification
    const showToast = (message) => {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.getElementById('toast-container').appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    };

    // Hero Slider
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const slideInterval = setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);

    // Initial render
    renderProducts();
});

document.addEventListener('DOMContentLoaded', function() {
    const brandContainer = document.querySelector('.brand-container');
    const brands = [
        { name: 'Zara', image: 'img/logos/zara.jpg', link: 'https://www.zara.com' },
        { name: 'Silbon', image: 'img/logos/silbon.jpg', link: 'https://www.silbonshop.com/?utm_source=google&utm_medium=cpc&utm_campaign=JAK_SIL_BRA_PSE_GAD_SEA_ALL_CON_ALL_AON_ALL_NA_ESP&utm_content=BRA_ALL_NA_esp_ALL_ALL&gad_source=1&gad_campaignid=1869204460' },
        { name: 'Tommy Hilfiger', image: 'img/logos/tomy.jpg', link: 'https://www.tommy.com' },
        { name: 'Jack & Jones', image: 'img/logos/jackjones.png', link: 'https://www.jackjones.com' },
        { name: 'Vinted', image: 'img/logos/vinted.png', link: 'https://www.vinted.com' }
    ];

    brands.forEach(brand => {
        const brandItem = document.createElement('div');
        brandItem.classList.add('brand-item');
        brandItem.innerHTML = `
            <img src="${brand.image}" alt="${brand.name} Logo">
            <div class="brand-name">${brand.name}</div>
        `;

        brandItem.addEventListener('click', function() {
            window.location.href = brand.link;
        });

        brandContainer.appendChild(brandItem);
    });
});
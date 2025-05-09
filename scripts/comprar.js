document.addEventListener('DOMContentLoaded', function() {
    const brandContainer = document.querySelector('.brand-container');
    const brands = [
        { name: 'Zara', image: 'img/logos/zara.jpg', link: 'https://www.zara.com' },
        { name: 'Silbon', image: 'img/logos/silbon.jpg', link: 'https://www.silbonshop.com/?utm_source=google&utm_medium=cpc&utm_campaign=JAK_SIL_BRA_PSE_GAD_SEA_ALL_CON_ALL_AON_ALL_NA_ESP&utm_content=BRA_ALL_NA_esp_ALL_ALL&gad_source=1&gad_campaignid=1869204460' },
        { name: 'Tommy Hilfiger', image: 'img/logos/tomy.jpg', link: 'https://www.tommy.com' },
        { name: 'Jack & Jones', image: 'img/logos/jackjones.png', link: 'https://www.jackjones.com' },
        { name: 'Vinted', image: 'img/logos/vinted.png', link: 'https://www.vinted.com' }
    ];

    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    function createBrandItem(brand) {
        if (!isValidUrl(brand.link)) {
            console.warn(`Invalid URL for ${brand.name}: ${brand.link}`);
            return null;
        }

        const brandItem = document.createElement('div');
        brandItem.classList.add('brand-item');
        brandItem.setAttribute('role', 'link');
        brandItem.setAttribute('aria-label', `Visitar ${brand.name}`);

        const img = document.createElement('img');
        img.src = brand.image;
        img.alt = `${brand.name} Logo`;
        img.loading = 'lazy';
        img.onerror = () => { img.src = 'img/placeholder.jpg'; };
        brandItem.appendChild(img);

        const brandName = document.createElement('div');
        brandName.classList.add('brand-name');
        brandName.textContent = brand.name;
        brandItem.appendChild(brandName);

        const link = document.createElement('a');
        link.href = brand.link;
        link.target = '_blank';
        link.rel = 'noopener';
        link.style.display = 'none'; // Hidden link for accessibility
        brandItem.appendChild(link);

        brandItem.addEventListener('click', function() {
            link.click();
        });

        return brandItem;
    }

    brands.forEach(brand => {
        const brandItem = createBrandItem(brand);
        if (brandItem) {
            brandContainer.appendChild(brandItem);
        }
    });
});
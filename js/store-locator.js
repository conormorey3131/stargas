// Store Locator Functionality
class StoreLocator {
    constructor() {
        this.map = null;
        this.markers = [];
        this.userLocation = null;
        this.selectedStore = null;
        this.currentFilters = {
            services: ['fuel'], // Default to fuel stations
            maxDistance: 10,
            searchTerm: ''
        };
        
        this.init();
    }
    
    init() {
        this.initMap();
        this.initEventListeners();
        this.renderStores();
    }
    
    initMap() {
        // Initialize Leaflet map centered on Dublin
        this.map = L.map('map').setView([53.3498, -6.2603], 7);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
        
        // Add custom controls
        this.initMapControls();
    }
    
    initMapControls() {
        const zoomInBtn = document.getElementById('zoomInBtn');
        const zoomOutBtn = document.getElementById('zoomOutBtn');
        const centerMapBtn = document.getElementById('centerMapBtn');
        
        zoomInBtn.addEventListener('click', () => {
            this.map.zoomIn();
        });
        
        zoomOutBtn.addEventListener('click', () => {
            this.map.zoomOut();
        });
        
        centerMapBtn.addEventListener('click', () => {
            if (this.userLocation) {
                this.map.setView([this.userLocation.lat, this.userLocation.lng], 12);
            }
        });
    }
    
    initEventListeners() {
        // Search input
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.currentFilters.searchTerm = e.target.value;
            this.renderStores();
        });
        
        // Use location button
        const useLocationBtn = document.getElementById('useLocationBtn');
        useLocationBtn.addEventListener('click', () => {
            this.getUserLocation();
        });
        
        // Service filter checkboxes
        const filterCheckboxes = document.querySelectorAll('.filter-checkbox input[type="checkbox"]');
        filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateServiceFilters();
                this.renderStores();
            });
        });
        
        // Distance filter
        const distanceSelect = document.getElementById('distanceSelect');
        distanceSelect.addEventListener('change', (e) => {
            this.currentFilters.maxDistance = parseInt(e.target.value);
            this.renderStores();
        });
        
        // Popup close
        const popupClose = document.getElementById('popupClose');
        popupClose.addEventListener('click', () => {
            this.hideStoreDetails();
        });
    }
    
    updateServiceFilters() {
        const checkedServices = [];
        const filterCheckboxes = document.querySelectorAll('.filter-checkbox input[type="checkbox"]:checked');
        filterCheckboxes.forEach(checkbox => {
            checkedServices.push(checkbox.value);
        });
        this.currentFilters.services = checkedServices;
    }
    
    getUserLocation() {
        const btn = document.getElementById('useLocationBtn');
        const originalHTML = btn.innerHTML;
        
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }
        
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Getting location...';
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                btn.innerHTML = '<i class="fas fa-check"></i> Location found';
                
                // Center map on user location
                this.map.setView([this.userLocation.lat, this.userLocation.lng], 12);
                
                // Add user location marker
                if (this.userMarker) {
                    this.map.removeLayer(this.userMarker);
                }
                
                this.userMarker = L.marker([this.userLocation.lat, this.userLocation.lng], {
                    icon: L.icon({
                        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41]
                    })
                }).addTo(this.map);
                
                this.userMarker.bindPopup('Your Location').openPopup();
                
                // Re-render stores with distance calculations
                this.renderStores();
                
                setTimeout(() => {
                    btn.disabled = false;
                    btn.innerHTML = originalHTML;
                }, 2000);
            },
            (error) => {
                console.error('Error getting location:', error);
                btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Location access denied';
                
                setTimeout(() => {
                    btn.disabled = false;
                    btn.innerHTML = originalHTML;
                }, 2000);
            }
        );
    }
    
    renderStores() {
        const filteredStores = getFilteredStores(
            this.userLocation,
            this.currentFilters.maxDistance,
            this.currentFilters.services,
            this.currentFilters.searchTerm
        );
        
        this.renderStoreList(filteredStores);
        this.renderStoreMarkers(filteredStores);
        this.updateResultsCount(filteredStores.length);
    }
    
    renderStoreList(stores) {
        const storeList = document.getElementById('storeList');
        
        if (stores.length === 0) {
            storeList.innerHTML = `
                <div class="loading">
                    <div>
                        <i class="fas fa-search"></i>
                        <p>No stores found matching your criteria</p>
                    </div>
                </div>
            `;
            return;
        }
        
        storeList.innerHTML = stores.map(store => this.createStoreHTML(store)).join('');
        
        // Add click event listeners
        const storeItems = storeList.querySelectorAll('.store-item');
        storeItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.selectStore(stores[index]);
            });
        });
    }
    
    createStoreHTML(store) {
        const servicesHTML = store.services.map(service => {
            const config = serviceConfig[service];
            return `<div class="service-badge ${service}" title="${config.label}">
                        <i class="${config.icon}"></i>
                    </div>`;
        }).join('');
        
        const distanceHTML = store.distance !== null ? 
            `<span class="store-distance">${store.distance.toFixed(1)} km</span>` : '';
        
        const stockistTypeHTML = store.stockistType ? 
            `<div class="stockist-type">${store.stockistType}</div>` : '';
        
        return `
            <div class="store-item" data-store-id="${store.id}">
                <h4>${store.name}</h4>
                ${stockistTypeHTML}
                <div class="store-address">${store.address}, ${store.city}${store.county ? ', Co. ' + store.county : ''}</div>
                <div class="store-info-row">
                    <div class="store-hours">
                        <i class="fas fa-clock"></i>
                        ${store.hours}
                    </div>
                    ${distanceHTML}
                </div>
                <div class="store-services">
                    ${servicesHTML}
                </div>
            </div>
        `;
    }
    
    renderStoreMarkers(stores) {
        // Clear existing markers
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];
        
        // Add new markers
        stores.forEach(store => {
            const marker = L.marker([store.coordinates.lat, store.coordinates.lng], {
                icon: L.icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                })
            }).addTo(this.map);
            
            marker.bindPopup(`
                <div style="text-align: center; min-width: 200px;">
                    <h4 style="margin-bottom: 8px;">${store.name}</h4>
                    <p style="margin-bottom: 8px; color: #666;">${store.address}<br>${store.city}</p>
                    <button onclick="storeLocator.selectStore(storeData.find(s => s.id === ${store.id}))" 
                            style="background: #DC2626; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">
                        View Details
                    </button>
                </div>
            `);
            
            marker.on('click', () => {
                this.selectStore(store);
            });
            
            this.markers.push(marker);
        });
        
        // Fit map to show all markers if there are any
        if (this.markers.length > 0) {
            const group = new L.featureGroup(this.markers);
            this.map.fitBounds(group.getBounds().pad(0.1));
        }
    }
    
    selectStore(store) {
        this.selectedStore = store;
        
        // Update active state in list
        document.querySelectorAll('.store-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const storeItem = document.querySelector(`[data-store-id="${store.id}"]`);
        if (storeItem) {
            storeItem.classList.add('active');
        }
        
        // Center map on selected store
        this.map.setView([store.coordinates.lat, store.coordinates.lng], 15);
        
        // Show store details popup
        this.showStoreDetails(store);
    }
    
    showStoreDetails(store) {
        const popup = document.getElementById('storeDetailPopup');
        const title = document.getElementById('popupTitle');
        const address = document.getElementById('popupAddress');
        const hours = document.getElementById('popupHours');
        const phone = document.getElementById('popupPhone');
        const services = document.getElementById('popupServices');
        const getDirectionsBtn = document.getElementById('getDirectionsBtn');
        const callStoreBtn = document.getElementById('callStoreBtn');
        
        title.textContent = store.name;
        address.textContent = `${store.address}, ${store.city}${store.county ? ', Co. ' + store.county : ''}`;
        hours.textContent = store.hours;
        phone.textContent = store.phone;
        
        // Clear any existing gas stock section
        const existingGasStock = popup.querySelector('.gas-stock-section');
        if (existingGasStock) {
            existingGasStock.remove();
        }
        
        // Render services
        services.innerHTML = store.services.map(service => {
            const config = serviceConfig[service];
            return `<div class="service-badge ${service}" title="${config.label}">
                        <i class="${config.icon}"></i>
                    </div>`;
        }).join('');
        
        // Add gas stock information
        const gasStockHTML = this.createGasStockHTML(store.gasStock);
        if (gasStockHTML) {
            services.insertAdjacentHTML('afterend', gasStockHTML);
        }
        
        // Update action buttons
        getDirectionsBtn.onclick = () => this.getDirections(store);
        callStoreBtn.onclick = () => window.open(`tel:${store.phone}`);
        
        // Show popup
        popup.style.display = 'block';
        setTimeout(() => {
            popup.classList.add('visible');
        }, 10);
    }
    
    createGasStockHTML(gasStock) {
        if (!gasStock || Object.keys(gasStock).length === 0) return '';
        
        const gasStockItems = Object.entries(gasStock).map(([gasType, data]) => {
            if (!data.available || !data.sizes || !data.stock) return '';
            
            const gasInfo = gasTypes[gasType];
            if (!gasInfo) return '';
            
            const stockItems = data.sizes.map((size, index) => {
                const stock = data.stock[index] || 0;
                const stockStatus = stock > 5 ? 'in-stock' : stock > 0 ? 'low-stock' : 'out-of-stock';
                return `<div class="stock-item ${stockStatus}">
                    <span class="stock-size">${size}</span>
                    <span class="stock-count">${stock}</span>
                </div>`;
            }).join('');
            
            return `<div class="gas-stock-item">
                <div class="gas-header">
                    <div class="gas-color" style="background-color: ${gasInfo.color}"></div>
                    <span class="gas-name">${gasInfo.name}</span>
                </div>
                <div class="stock-sizes">
                    ${stockItems}
                </div>
            </div>`;
        }).filter(item => item).join('');
        
        return gasStockItems ? `
            <div class="gas-stock-section">
                <h4>Gas Stock Available</h4>
                <div class="gas-stock-grid">
                    ${gasStockItems}
                </div>
            </div>
        ` : '';
    }
    
    hideStoreDetails() {
        const popup = document.getElementById('storeDetailPopup');
        popup.classList.remove('visible');
        setTimeout(() => {
            popup.style.display = 'none';
        }, 300);
    }
    
    getDirections(store) {
        const destination = `${store.coordinates.lat},${store.coordinates.lng}`;
        const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
        window.open(url, '_blank');
    }
    
    updateResultsCount(count) {
        const resultsCount = document.getElementById('resultsCount');
        resultsCount.textContent = `${count} station${count !== 1 ? 's' : ''} found`;
    }
}

// Initialize store locator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.storeLocator = new StoreLocator();
});
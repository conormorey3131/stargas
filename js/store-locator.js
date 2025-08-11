// Store Locator Functionality
class StoreLocator {
    constructor() {
        this.map = null;
        this.markers = [];
        this.filteredStores = [...storeData];
        this.currentPosition = null;
        this.selectedStore = null;
        
        this.init();
    }
    
    init() {
        this.initializeMap();
        this.bindEvents();
        this.renderStores();
        this.addAllMarkers();
        this.requestLocation();
    }
    
    initializeMap() {
        // Initialize the map centered on Ireland
        this.map = L.map('map').setView([53.1424, -7.6921], 7);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(this.map);
        
        // Custom control for fullscreen
        this.addCustomControls();
    }
    
    addCustomControls() {
        // Zoom controls
        document.getElementById('zoomInBtn').addEventListener('click', () => {
            this.map.zoomIn();
        });
        
        document.getElementById('zoomOutBtn').addEventListener('click', () => {
            this.map.zoomOut();
        });
        
        // Fullscreen toggle
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        let isFullscreen = false;
        
        fullscreenBtn.addEventListener('click', () => {
            const mapContainer = document.querySelector('.map-container');
            
            if (!isFullscreen) {
                mapContainer.classList.add('fullscreen');
                fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
                isFullscreen = true;
            } else {
                mapContainer.classList.remove('fullscreen');
                fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
                isFullscreen = false;
            }
            
            // Trigger map resize after fullscreen toggle
            setTimeout(() => {
                this.map.invalidateSize();
            }, 100);
        });
    }
    
    bindEvents() {
        // Search functionality
        const searchInput = document.getElementById('locationSearch');
        const searchBtn = document.getElementById('searchBtn');
        const locateBtn = document.getElementById('locateBtn');
        
        searchBtn.addEventListener('click', () => this.performSearch());
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });
        
        locateBtn.addEventListener('click', () => this.requestLocation());
        
        // Filter checkboxes
        const filterCheckboxes = document.querySelectorAll('input[name="service"]');
        filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.applyFilters());
        });
        
        // View toggle
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                viewBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.toggleView(e.target.dataset.view);
            });
        });
    }
    
    performSearch() {
        const query = document.getElementById('locationSearch').value.trim().toLowerCase();
        if (!query) return;
        
        const filtered = storeData.filter(store => 
            store.city.toLowerCase().includes(query) ||
            store.county.toLowerCase().includes(query) ||
            store.address.toLowerCase().includes(query) ||
            store.eircode.toLowerCase().includes(query) ||
            store.name.toLowerCase().includes(query)
        );
        
        this.filteredStores = filtered;
        this.renderStores();
        this.updateMapMarkers();
        
        if (filtered.length > 0) {
            // Zoom to show all filtered results
            const group = new L.featureGroup(this.markers);
            this.map.fitBounds(group.getBounds().pad(0.1));
        }
        
        // Show no results message if needed
        if (filtered.length === 0) {
            this.showNoResults('No stores found matching your search.');
        }
    }
    
    applyFilters() {
        const activeFilters = [];
        const filterCheckboxes = document.querySelectorAll('input[name="service"]:checked');
        
        filterCheckboxes.forEach(checkbox => {
            activeFilters.push(checkbox.value);
        });
        
        if (activeFilters.length === 0) {
            this.filteredStores = [...storeData];
        } else {
            this.filteredStores = storeData.filter(store => {
                return activeFilters.every(filter => {
                    switch (filter) {
                        case '24hours':
                            return store.is24Hours;
                        case 'car-wash':
                            return store.hasCarWash;
                        case 'cafe':
                            return store.hasCafe;
                        case 'atm':
                            return store.hasATM;
                        default:
                            return false;
                    }
                });
            });
        }
        
        this.renderStores();
        this.updateMapMarkers();
        
        if (this.filteredStores.length === 0) {
            this.showNoResults('No stores found matching your filters.');
        }
    }
    
    requestLocation() {
        const locateBtn = document.getElementById('locateBtn');
        const originalHTML = locateBtn.innerHTML;
        locateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.currentPosition = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    
                    this.calculateDistances();
                    this.renderStores();
                    
                    // Add user location marker
                    L.marker([this.currentPosition.lat, this.currentPosition.lng], {
                        icon: L.divIcon({
                            className: 'user-location-marker',
                            html: '<div class="user-location-dot"></div>',
                            iconSize: [20, 20],
                            iconAnchor: [10, 10]
                        })
                    }).addTo(this.map).bindPopup('Your location');
                    
                    // Center map on user location
                    this.map.setView([this.currentPosition.lat, this.currentPosition.lng], 10);
                    
                    locateBtn.innerHTML = originalHTML;
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    locateBtn.innerHTML = originalHTML;
                    this.showError('Unable to access your location. Please search manually.');
                }
            );
        } else {
            locateBtn.innerHTML = originalHTML;
            this.showError('Geolocation is not supported by your browser.');
        }
    }
    
    calculateDistances() {
        if (!this.currentPosition) return;
        
        this.filteredStores.forEach(store => {
            store.distance = this.calculateDistance(
                this.currentPosition.lat,
                this.currentPosition.lng,
                store.coordinates.lat,
                store.coordinates.lng
            );
        });
        
        // Sort by distance
        this.filteredStores.sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
    }
    
    calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // Radius of the Earth in km
        const dLat = this.degreeToRadians(lat2 - lat1);
        const dLng = this.degreeToRadians(lng2 - lng1);
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.degreeToRadians(lat1)) * Math.cos(this.degreeToRadians(lat2)) * 
            Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }
    
    degreeToRadians(deg) {
        return deg * (Math.PI/180);
    }
    
    renderStores() {
        const resultsContainer = document.getElementById('storeResults');
        const resultsCount = document.getElementById('resultsCount');
        
        resultsCount.textContent = `(${this.filteredStores.length} locations)`;
        
        if (this.filteredStores.length === 0) {
            resultsContainer.innerHTML = '';
            return;
        }
        
        resultsContainer.innerHTML = this.filteredStores.map(store => this.createStoreCard(store)).join('');
        
        // Bind click events to store cards
        const storeCards = resultsContainer.querySelectorAll('.store-card');
        storeCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                this.selectStore(this.filteredStores[index]);
            });
        });
    }
    
    createStoreCard(store) {
        const todayHours = this.getTodayHours(store);
        const servicesHTML = '';
        
        const distanceHTML = store.distance ? 
            `<div class="store-distance">${store.distance.toFixed(1)} km away</div>` : '';
        
        return `
            <div class="store-card" data-store-id="${store.id}">
                <div class="store-header">
                    <div>
                        <h3 class="store-name">${store.name}</h3>
                        <p class="store-address">${store.address}, ${store.city}, ${store.county} ${store.eircode}</p>
                    </div>
                    ${distanceHTML}
                </div>
                
                <div class="store-info">
                    <div class="info-section">
                        <h4>Contact</h4>
                        <div class="contact-info">
                            <a href="tel:${store.phone}">${store.phone}</a><br>
                            ${store.email ? `<a href="mailto:${store.email}">${store.email}</a>` : ''}
                        </div>
                    </div>
                    <div class="info-section">
                        <h4>Hours Today</h4>
                        <div class="hours-today ${todayHours.isOpen ? '' : 'closed'}">
                            ${todayHours.hours}
                        </div>
                    </div>
                </div>
                
                
                <div class="store-actions">
                    <a href="tel:${store.phone}" class="action-btn primary">
                        <i class="fas fa-phone"></i>
                        Call
                    </a>
                    <a href="https://maps.google.com/?q=${store.coordinates.lat},${store.coordinates.lng}" 
                       target="_blank" rel="noopener" class="action-btn">
                        <i class="fas fa-directions"></i>
                        Directions
                    </a>
                </div>
            </div>
        `;
    }
    
    getTodayHours(store) {
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const today = days[new Date().getDay()];
        const hours = store.openingHours[today];
        
        if (hours === '24 Hours') {
            return { hours: '24 Hours', isOpen: true };
        }
        
        if (hours === 'Closed') {
            return { hours: 'Closed', isOpen: false };
        }
        
        // Check if currently open
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        
        // Simple check - you might want to make this more sophisticated
        return { hours: hours, isOpen: true };
    }
    
    addAllMarkers() {
        this.clearMarkers();
        
        this.filteredStores.forEach(store => {
            const marker = L.marker([store.coordinates.lat, store.coordinates.lng], {
                icon: this.createCustomIcon(store)
            }).addTo(this.map);
            
            marker.bindPopup(this.createPopupContent(store));
            marker.on('click', () => this.selectStore(store));
            
            this.markers.push(marker);
        });
    }
    
    updateMapMarkers() {
        this.clearMarkers();
        this.addAllMarkers();
    }
    
    clearMarkers() {
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];
    }
    
    createCustomIcon(store) {
        const isSelected = this.selectedStore && this.selectedStore.id === store.id;
        const iconClass = isSelected ? 'selected-marker' : 'store-marker';
        
        return L.divIcon({
            className: iconClass,
            html: `
                <div class="marker-pin ${store.is24Hours ? 'always-open' : ''}">
                    <i class="fas fa-gas-pump"></i>
                </div>
            `,
            iconSize: [30, 40],
            iconAnchor: [15, 40],
            popupAnchor: [0, -40]
        });
    }
    
    createPopupContent(store) {
        const servicesHTML = '';
        
        return `
            <div class="popup-content">
                <h3 class="popup-store-name">${store.name}</h3>
                <p class="popup-address">${store.address}, ${store.city}</p>
                <div class="popup-actions">
                    <a href="tel:${store.phone}" class="popup-btn primary">Call</a>
                    <a href="https://maps.google.com/?q=${store.coordinates.lat},${store.coordinates.lng}" 
                       target="_blank" rel="noopener" class="popup-btn">Directions</a>
                </div>
            </div>
        `;
    }
    
    selectStore(store) {
        // Update selected store
        this.selectedStore = store;
        
        // Update UI
        document.querySelectorAll('.store-card').forEach(card => {
            card.classList.remove('active');
        });
        
        const selectedCard = document.querySelector(`[data-store-id="${store.id}"]`);
        if (selectedCard) {
            selectedCard.classList.add('active');
            selectedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        
        // Center map on selected store
        this.map.setView([store.coordinates.lat, store.coordinates.lng], 15);
        
        // Update markers
        this.updateMapMarkers();
        
        // Open popup
        const marker = this.markers.find(m => 
            m.getLatLng().lat === store.coordinates.lat && 
            m.getLatLng().lng === store.coordinates.lng
        );
        if (marker) {
            marker.openPopup();
        }
    }
    
    toggleView(view) {
        const resultsList = document.getElementById('storeResults');
        
        if (view === 'grid') {
            resultsList.classList.add('grid-view');
        } else {
            resultsList.classList.remove('grid-view');
        }
    }
    
    showNoResults(message) {
        const resultsContainer = document.getElementById('storeResults');
        resultsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No Results Found</h3>
                <p>${message}</p>
            </div>
        `;
    }
    
    showError(message) {
        const resultsContainer = document.getElementById('storeResults');
        resultsContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                ${message}
            </div>
        `;
    }
}

// Additional CSS for custom markers (to be added to store-locator.css)
const markerStyles = `
    .store-marker, .selected-marker, .user-location-marker {
        border: none !important;
        background: transparent !important;
    }
    
    .marker-pin {
        width: 30px;
        height: 40px;
        background: #dc2626;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        transition: all 0.2s ease;
    }
    
    .marker-pin i {
        color: white;
        font-size: 14px;
        transform: rotate(45deg);
    }
    
    .marker-pin.always-open {
        background: #059669;
    }
    
    .selected-marker .marker-pin {
        background: #1e40af;
        transform: rotate(-45deg) scale(1.2);
        z-index: 1000;
    }
    
    .user-location-dot {
        width: 20px;
        height: 20px;
        background: #3b82f6;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
        70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
        100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
    }
    
    .map-container.fullscreen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw !important;
        height: 100vh !important;
        z-index: 9999;
        border: none;
    }
    
    .map-container.fullscreen .map {
        height: 100vh !important;
    }
`;

// Inject marker styles
const styleSheet = document.createElement('style');
styleSheet.textContent = markerStyles;
document.head.appendChild(styleSheet);

// Initialize store locator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('map')) {
        new StoreLocator();
    }
});
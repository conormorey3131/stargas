// Gas stock data
const gasTypes = {
    propane: { name: 'Propane', sizes: ['9kg', '13kg', '19kg', '47kg'], color: '#FF6B35' },
    butane: { name: 'Butane', sizes: ['7kg', '15kg'], color: '#4ECDC4' },
    calor: { name: 'Calor Gas', sizes: ['6kg', '13kg', '19kg'], color: '#45B7D1' },
    flogas: { name: 'Flogas', sizes: ['11kg', '21kg', '47kg'], color: '#96CEB4' },
    acetylene: { name: 'Acetylene', sizes: ['1.8kg', '8kg'], color: '#FFEAA7' },
    oxygen: { name: 'Oxygen', sizes: ['1.4m³', '2.3m³', '10m³'], color: '#DDA0DD' },
    argon: { name: 'Argon', sizes: ['2.2m³', '5.7m³'], color: '#74B9FF' },
    co2: { name: 'CO₂', sizes: ['3.7kg', '6.35kg'], color: '#FD79A8' },
    helium: { name: 'Helium', sizes: ['0.25m³', '1.8m³'], color: '#FDCB6E' },
    nitrogen: { name: 'Nitrogen', sizes: ['2.2m³', '10.9m³'], color: '#6C5CE7' }
};

// Store locations data - Stargas Stockists
const storeData = [
    {
        id: 1,
        name: "Paddys Tool Store",
        address: "Main Street",
        city: "Ennis",
        county: "Clare",
        postal: "V95",
        phone: "+353 65 682 8464",
        coordinates: { lat: 52.8463, lng: -8.9817 },
        hours: "Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 5:00 PM",
        services: ["shop"],
        stockistType: "Hardware & Tools",
        gasStock: {
            propane: { available: true, sizes: ['9kg', '13kg', '19kg', '47kg'], stock: [12, 10, 8, 4] },
            butane: { available: true, sizes: ['7kg', '15kg'], stock: [8, 5] },
            calor: { available: true, sizes: ['6kg', '13kg', '19kg'], stock: [10, 12, 7] },
            flogas: { available: true, sizes: ['11kg', '21kg'], stock: [9, 6] }
        },
        distance: null
    },
    {
        id: 2,
        name: "Top Part",
        address: "Shannon Industrial Estate",
        city: "Shannon",
        county: "Clare",
        postal: "V14",
        phone: "+353 61 471 632",
        coordinates: { lat: 52.7036, lng: -8.8647 },
        hours: "Mon-Fri: 8:00 AM - 5:30 PM, Sat: 9:00 AM - 1:00 PM",
        services: ["shop"],
        stockistType: "Auto Parts & Accessories",
        gasStock: {
            propane: { available: true, sizes: ['9kg', '13kg', '19kg'], stock: [15, 11, 9] },
            butane: { available: true, sizes: ['7kg', '15kg'], stock: [10, 6] },
            calor: { available: true, sizes: ['13kg'], stock: [14] },
            acetylene: { available: true, sizes: ['1.8kg', '8kg'], stock: [6, 3] },
            oxygen: { available: true, sizes: ['1.4m³', '2.3m³'], stock: [8, 5] }
        },
        distance: null
    },
    {
        id: 3,
        name: "SWP",
        address: "Dock Road",
        city: "Limerick",
        county: "Limerick",
        postal: "V94",
        phone: "+353 61 315 799",
        coordinates: { lat: 52.6477, lng: -8.6234 },
        hours: "Mon-Fri: 8:00 AM - 5:00 PM",
        services: ["shop"],
        stockistType: "Welding & Industrial Supplies",
        gasStock: {
            propane: { available: true, sizes: ['13kg', '19kg', '47kg'], stock: [20, 15, 8] },
            butane: { available: true, sizes: ['7kg', '15kg'], stock: [12, 8] },
            acetylene: { available: true, sizes: ['1.8kg', '8kg'], stock: [10, 6] },
            oxygen: { available: true, sizes: ['1.4m³', '2.3m³', '10m³'], stock: [15, 10, 5] },
            argon: { available: true, sizes: ['2.2m³', '5.7m³'], stock: [8, 4] },
            co2: { available: true, sizes: ['3.7kg', '6.35kg'], stock: [12, 8] },
            nitrogen: { available: true, sizes: ['2.2m³', '10.9m³'], stock: [6, 3] }
        },
        distance: null
    },
    {
        id: 4,
        name: "Top Part",
        address: "Ballysimon Road",
        city: "Limerick",
        county: "Limerick",
        postal: "V94",
        phone: "+353 61 422 300",
        coordinates: { lat: 52.6555, lng: -8.5784 },
        hours: "Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 2:00 PM",
        services: ["shop"],
        stockistType: "Auto Parts & Accessories",
        gasStock: {
            propane: { available: true, sizes: ['9kg', '13kg', '19kg'], stock: [18, 14, 10] },
            butane: { available: true, sizes: ['7kg', '15kg'], stock: [11, 7] },
            calor: { available: true, sizes: ['6kg', '13kg'], stock: [9, 16] },
            flogas: { available: true, sizes: ['11kg', '21kg'], stock: [10, 8] }
        },
        distance: null
    },
    {
        id: 5,
        name: "Faha Fuels",
        address: "Faha",
        city: "Kilmallock",
        county: "Limerick",
        postal: "V35",
        phone: "+353 63 98 108",
        coordinates: { lat: 52.4022, lng: -8.5772 },
        hours: "Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 5:00 PM",
        services: ["fuel", "shop"],
        stockistType: "Fuel & Energy Supplier",
        gasStock: {
            propane: { available: true, sizes: ['9kg', '13kg', '19kg', '47kg'], stock: [25, 20, 15, 10] },
            butane: { available: true, sizes: ['7kg', '15kg'], stock: [18, 12] },
            calor: { available: true, sizes: ['6kg', '13kg', '19kg'], stock: [15, 22, 12] },
            flogas: { available: true, sizes: ['11kg', '21kg', '47kg'], stock: [16, 12, 8] },
            co2: { available: true, sizes: ['3.7kg', '6.35kg'], stock: [10, 6] }
        },
        distance: null
    },
];

// Service configurations
const serviceConfig = {
    fuel: {
        icon: 'fas fa-gas-pump',
        label: 'Fuel Station',
        color: '#DC2626'
    },
    'ev-charging': {
        icon: 'fas fa-charging-station',
        label: 'EV Charging',
        color: '#D97706'
    },
    'car-wash': {
        icon: 'fas fa-car',
        label: 'Car Wash',
        color: '#2563EB'
    },
    shop: {
        icon: 'fas fa-shopping-bag',
        label: 'Convenience Store',
        color: '#059669'
    },
    coffee: {
        icon: 'fas fa-coffee',
        label: 'Coffee Shop',
        color: '#EA580C'
    }
};

// Utility function to calculate distance between two coordinates
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

// Function to get stores within a certain distance and matching criteria
function getFilteredStores(userCoords = null, maxDistance = 100, serviceFilters = [], searchTerm = '') {
    let filteredStores = [...storeData];
    
    // Calculate distances if user coordinates are provided
    if (userCoords) {
        filteredStores = filteredStores.map(store => ({
            ...store,
            distance: calculateDistance(
                userCoords.lat,
                userCoords.lng,
                store.coordinates.lat,
                store.coordinates.lng
            )
        }));
        
        // Filter by distance
        filteredStores = filteredStores.filter(store => store.distance <= maxDistance);
        
        // Sort by distance
        filteredStores.sort((a, b) => a.distance - b.distance);
    }
    
    // Filter by services
    if (serviceFilters.length > 0) {
        filteredStores = filteredStores.filter(store =>
            serviceFilters.every(service => store.services.includes(service))
        );
    }
    
    // Filter by search term
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredStores = filteredStores.filter(store =>
            store.name.toLowerCase().includes(term) ||
            store.address.toLowerCase().includes(term) ||
            store.city.toLowerCase().includes(term) ||
            store.postal.toLowerCase().includes(term)
        );
    }
    
    return filteredStores;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { storeData, serviceConfig, getFilteredStores, calculateDistance };
}
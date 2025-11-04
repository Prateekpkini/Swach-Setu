import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function MapView({ households }) {
  // Helper function to get field value from either format
  const getFieldValue = (household, field) => {
    return household[field] || household[field.toLowerCase()] || 
           household[field.charAt(0).toUpperCase() + field.slice(1)] ||
           household[field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')];
  };

  const center = households.length > 0 
    ? [
        getFieldValue(households[0], 'latitude') || getFieldValue(households[0], 'Latitude'), 
        getFieldValue(households[0], 'longitude') || getFieldValue(households[0], 'Longitude')
      ]
    : [12.7000, 75.5000];

    const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});


  return (
    <div className="map-view">
      <h2 style={{
        color: 'var(--ice-dark)',
        textAlign: 'center',
        marginBottom: '30px',
        fontSize: '2rem',
        fontWeight: '300',
        letterSpacing: '1px'
      }}>Household Locations</h2>
      
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.25)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}>
        <div className="map-container">
          <MapContainer center={center} zoom={13} style={{ height: '500px', width: '100%', borderRadius: '12px' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {households.map((household, index) => {
              const householdId = getFieldValue(household, 'household_id') || getFieldValue(household, 'HouseholdID');
              const headOfHousehold = getFieldValue(household, 'head_of_household') || getFieldValue(household, 'HeadOfHousehold');
              const wasteType = getFieldValue(household, 'waste_type_preference') || getFieldValue(household, 'WasteTypePreference');
              const feeStatus = getFieldValue(household, 'fee_status') || getFieldValue(household, 'FeeStatus');
              const collectionFreq = getFieldValue(household, 'collection_frequency') || getFieldValue(household, 'CollectionFrequency');
              const latitude = getFieldValue(household, 'latitude') || getFieldValue(household, 'Latitude');
              const longitude = getFieldValue(household, 'longitude') || getFieldValue(household, 'Longitude');
              
              return (
                <Marker 
                  key={householdId || index} 
                  position={[latitude, longitude]}
                  icon={feeStatus === "paid" ? greenIcon : redIcon}
                >
                  <Popup>
                    <div>
                      <h3 style={{ margin: '0 0 10px 0', color: 'var(--ice-dark)' }}>{headOfHousehold}</h3>
                      <p style={{ margin: '5px 0' }}><strong>ID:</strong> {householdId}</p>
                      <p style={{ margin: '5px 0' }}><strong>Waste:</strong> {wasteType}</p>
                      <p style={{ margin: '5px 0' }}><strong>Status:</strong> 
                        <span style={{
                          marginLeft: '5px',
                          padding: '2px 6px',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          background: feeStatus === 'paid' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
                          color: feeStatus === 'paid' ? '#4CAF50' : '#F44336'
                        }}>
                          {feeStatus}
                        </span>
                      </p>
                      <p style={{ margin: '5px 0' }}><strong>Collection:</strong> {collectionFreq}</p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
        
        <div style={{
          marginTop: '15px',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          fontSize: '0.9rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '12px', height: '12px', background: '#4CAF50', borderRadius: '50%' }}></div>
            <span>Paid</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '12px', height: '12px', background: '#F44336', borderRadius: '50%' }}></div>
            <span>Unpaid</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapView;
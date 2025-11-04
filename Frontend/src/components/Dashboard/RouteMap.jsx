import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import IcePanel from '../IcePanel';
import { FaMapMarkerAlt, FaTrashAlt } from 'react-icons/fa';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const RouteMap = ({ households }) => {
  const center = households.length > 0 
    ? [households[0].latitude, households[0].longitude]
    : [12.7000, 75.5000];

  // Custom icons
  const paidIcon = new L.Icon({
    ...L.Icon.Default.prototype.options,
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png'
  });

  const unpaidIcon = new L.Icon({
    ...L.Icon.Default.prototype.options,
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png'
  });

  return (
    <IcePanel title="Collection Route Map" glowColor="#4fc3f7" style={{ marginTop: '20px' }}>
      <div style={{ height: '500px', borderRadius: '8px', overflow: 'hidden' }}>
        <MapContainer 
          center={center} 
          zoom={13} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {households.map(household => (
            <Marker 
              key={household.household_id} 
              position={[household.latitude, household.longitude]}
              icon={household.fee_status === 'paid' ? paidIcon : unpaidIcon}
            >
              <Popup>
                <div style={{ minWidth: '200px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <FaMapMarkerAlt color="#4fc3f7" />
                    <h3 style={{ margin: 0 }}>{household.head_of_household}</h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                    <FaTrashAlt color="#FF9100" />
                    <span>{household.waste_type_preference} waste</span>
                  </div>
                  <p style={{ margin: '5px 0' }}>
                    <strong>Status:</strong> 
                    <span style={{ 
                      color: household.fee_status === 'paid' ? '#00C853' : '#FF5252',
                      fontWeight: '500',
                      marginLeft: '5px'
                    }}>
                      {household.fee_status}
                    </span>
                  </p>
                  <p style={{ margin: '5px 0' }}>
                    <strong>Collection:</strong> {household.collection_frequency}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </IcePanel>
  );
};

export default RouteMap;
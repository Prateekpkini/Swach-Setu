import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import IcePanel from '../IcePanel';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const RouteViewer = ({ households }) => {
  const center = households.length > 0 
    ? [households[0].latitude, households[0].longitude]
    : [12.7000, 75.5000];

  return (
    <IcePanel title="Household Locations" glowColor="#4fc3f7">
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
              icon={new L.Icon({
                ...L.Icon.Default.prototype.options,
                iconUrl: household.fee_status === 'paid' 
                  ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png'
                  : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png'
              })}
            >
              <Popup>
                <div style={{ minWidth: '200px' }}>
                  <h3 style={{ margin: '0 0 5px 0', color: 'var(--ice-dark)' }}>
                    {household.head_of_household}
                  </h3>
                  <p style={{ margin: '4px 0', fontSize: '14px' }}>
                    <strong>ID:</strong> {household.household_id}
                  </p>
                  <p style={{ margin: '4px 0', fontSize: '14px' }}>
                    <strong>Waste:</strong> {household.waste_type_preference}
                  </p>
                  <p style={{ margin: '4px 0', fontSize: '14px' }}>
                    <strong>Status:</strong> 
                    <span style={{ 
                      color: household.fee_status === 'paid' ? '#00C853' : '#FF5252',
                      fontWeight: '500',
                      marginLeft: '5px'
                    }}>
                      {household.fee_status}
                    </span>
                  </p>
                  <p style={{ margin: '4px 0', fontSize: '14px' }}>
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

export default RouteViewer;
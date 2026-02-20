import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Circle, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix Leaflet's default icon path issue with bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const LOST_ICON = new L.DivIcon({
  className: '',
  html: '<div style="font-size:22px;line-height:1;filter:drop-shadow(0 1px 2px rgba(0,0,0,.4))">📍</div>',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

const FOUND_ICON = new L.DivIcon({
  className: '',
  html: '<div style="font-size:22px;line-height:1;filter:drop-shadow(0 1px 2px rgba(0,0,0,.4))">✅</div>',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

const SIGHTED_ICON = new L.DivIcon({
  className: '',
  html: '<div style="font-size:22px;line-height:1;filter:drop-shadow(0 1px 2px rgba(0,0,0,.4))">👁️</div>',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

const SAFE_ICON = new L.DivIcon({
  className: '',
  html: '<div style="font-size:22px;line-height:1;filter:drop-shadow(0 1px 2px rgba(0,0,0,.4))">🏥</div>',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

function iconFor(type: string) {
  if (type === 'lost') return LOST_ICON;
  if (type === 'found') return FOUND_ICON;
  if (type === 'sighted') return SIGHTED_ICON;
  return SAFE_ICON;
}

export interface PettodoPin {
  id: string;
  lat: number;
  lng: number;
  type: 'lost' | 'found' | 'sighted' | 'safe';
  label: string;
  time?: string;
  privacyRadius?: number;
}

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  React.useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
}

export interface PettodoMapProps {
  height?: number;
  centerLat?: number;
  centerLng?: number;
  zoom?: number;
  pins?: PettodoPin[];
  showPrivacyCircle?: boolean;
  privacyRadius?: number;
}

export function PettodoMap({
  height = 220,
  centerLat = 40.7741,
  centerLng = -73.9715,
  zoom = 14,
  pins = [],
  showPrivacyCircle = false,
  privacyRadius = 300,
}: PettodoMapProps) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ height, border: '1px solid var(--gray-200)', position: 'relative', zIndex: 0 }}
    >
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <RecenterMap lat={centerLat} lng={centerLng} />
        {pins.map(pin => (
          <React.Fragment key={pin.id}>
            <Marker position={[pin.lat, pin.lng]} icon={iconFor(pin.type)}>
              <Popup>
                <strong>{pin.label}</strong>
                {pin.time && <><br />{pin.time}</>}
                {pin.type === 'found' && (
                  <><br /><span style={{ fontSize: 11, color: '#888' }}>Approximate area only</span></>
                )}
              </Popup>
            </Marker>
            {pin.type === 'found' && pin.privacyRadius && (
              <Circle
                center={[pin.lat, pin.lng]}
                radius={pin.privacyRadius}
                pathOptions={{ color: '#16a34a', fillColor: '#16a34a', fillOpacity: 0.08, dashArray: '6 4' }}
              />
            )}
          </React.Fragment>
        ))}
        {showPrivacyCircle && (
          <Circle
            center={[centerLat, centerLng]}
            radius={privacyRadius}
            pathOptions={{ color: '#dc2626', fillColor: '#dc2626', fillOpacity: 0.08, dashArray: '6 4' }}
          />
        )}
      </MapContainer>
    </div>
  );
}

const DEMO_PINS: PettodoPin[] = [
  { id: 'lost-luna', lat: 40.7741, lng: -73.9715, type: 'lost', label: 'Luna — Lost', time: 'Today 6:30 PM' },
  { id: 'found-1', lat: 40.7751, lng: -73.9705, type: 'found', label: 'Dog Found', time: '2 hours ago', privacyRadius: 300 },
  { id: 'sighted-1', lat: 40.7820, lng: -73.9715, type: 'sighted', label: 'Dog Sighted', time: '5 hours ago' },
  { id: 'safe-1', lat: 40.7730, lng: -73.9650, type: 'safe', label: 'San Martín Vet (Safe Point)' },
];

export function MapPlaceholder({ children, height = 220, pins, centerLat, centerLng, zoom, showPrivacyCircle, privacyRadius }: {
  children?: React.ReactNode;
  height?: number;
  pins?: PettodoPin[];
  centerLat?: number;
  centerLng?: number;
  zoom?: number;
  showPrivacyCircle?: boolean;
  privacyRadius?: number;
}) {
  return (
    <div style={{ position: 'relative' }}>
      <PettodoMap
        height={height}
        centerLat={centerLat ?? 40.7741}
        centerLng={centerLng ?? -73.9715}
        zoom={zoom ?? 14}
        pins={pins ?? DEMO_PINS}
        showPrivacyCircle={showPrivacyCircle}
        privacyRadius={privacyRadius}
      />
      {children}
    </div>
  );
}

const PIN_TYPES = [
  { icon: '📍', color: 'var(--red-primary)', label: 'Lost', desc: 'Dog reported lost' },
  { icon: '✅', color: 'var(--green-primary)', label: 'Found', desc: 'Dog found by someone' },
  { icon: '👁️', color: 'var(--warning)', label: 'Sighted', desc: 'Dog spotted in area' },
  { icon: '🐕', color: 'var(--warning)', label: 'Community Dog', desc: 'Known street/community dog (lower priority)' },
  { icon: '🏥', color: 'var(--info)', label: 'Safe Point', desc: 'Trusted handoff location' },
];

export function MapLegend() {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: 'var(--white)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--gray-200)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-3 py-2"
        style={{ minHeight: 44 }}
      >
        <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Map Legend</span>
        {open ? <ChevronUp size={16} style={{ color: 'var(--gray-400)' }} /> : <ChevronDown size={16} style={{ color: 'var(--gray-400)' }} />}
      </button>
      {open && (
        <div className="px-3 pb-3 flex flex-col gap-2">
          {PIN_TYPES.map((p) => (
            <div key={p.label} className="flex items-center gap-2">
              <span className="text-[14px]">{p.icon}</span>
              <span className="text-[12px]" style={{ fontWeight: 600, color: p.color }}>{p.label}</span>
              <span className="text-[11px]" style={{ color: 'var(--gray-400)' }}>— {p.desc}</span>
            </div>
          ))}
          <div className="mt-1 px-2 py-1.5 rounded-lg" style={{ background: 'var(--gray-100)' }}>
            <span className="text-[11px]" style={{ color: 'var(--gray-500)' }}>
              Approximate area only — exact address is hidden.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export function RadiusSelector({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const options = [300, 500, 1000, 2000];
  const labels = ['300m', '500m', '1 km', '2 km'];
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Privacy radius</span>
      <div className="flex gap-2">
        {options.map((o, i) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className="flex-1 py-2 rounded-xl text-[13px] transition-all"
            style={{
              background: value === o ? 'var(--info)' : 'var(--gray-100)',
              color: value === o ? 'var(--white)' : 'var(--gray-700)',
              fontWeight: value === o ? 600 : 400,
              minHeight: 44,
            }}
          >
            {labels[i]}
          </button>
        ))}
      </div>
    </div>
  );
}

export function DirectionCompass({ selected, onSelect }: { selected: string; onSelect: (d: string) => void }) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Direction last seen heading</span>
      <div className="grid grid-cols-4 gap-2">
        {dirs.map((d) => (
          <button
            key={d}
            onClick={() => onSelect(d)}
            className="w-12 h-12 rounded-xl text-[13px] flex items-center justify-center transition-all"
            style={{
              background: selected === d ? 'var(--red-primary)' : 'var(--gray-100)',
              color: selected === d ? 'var(--white)' : 'var(--gray-700)',
              fontWeight: 600,
              minHeight: 44,
              minWidth: 44,
            }}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}

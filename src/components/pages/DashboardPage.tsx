import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  Tooltip,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useAuth } from "../../contexts/AuthContext";
import { getDashboardStats } from "../../services/api";
import { DashboardStats, ShopLocationStat } from "../../types";

// Leaflet default icon fix
import L from "leaflet";
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const DashboardPage: React.FC = () => {
  const { customer } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err: any) {
        console.error("Failed to fetch dashboard stats:", err);
        setError(err.message || "Could not load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [customer]);

  // Determine map center - use first location or a default
  const mapCenter: LatLngExpression = stats?.shopLocations?.[0]
    ? [stats.shopLocations[0].lat, stats.shopLocations[0].lng]
    : [51.505, -0.09]; // Default center (London) if no locations
  const mapZoom = stats?.shopLocations?.length ? 6 : 2; // Zoom out if no data

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading Dashboard...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">Error loading dashboard: {error}</Alert>;
  }

  return (
    <Container fluid>
      <h2 className="mb-4">Dashboard {customer ? `- ${customer.name}` : ""}</h2>
      <Row className="mb-4">
        <Col md={6} lg={4} className="mb-3">
          <Card className="text-center shadow-sm h-100">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text className="fs-2 fw-bold">
                {stats?.user_count ?? "N/A"}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4} className="mb-3">
          <Card className="text-center shadow-sm h-100">
            <Card.Body>
              <Card.Title>Total Shops</Card.Title>
              <Card.Text className="fs-2 fw-bold">
                {stats?.shop_count ?? "N/A"}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Header>Shops by Location</Card.Header>
            <Card.Body style={{ height: "500px", padding: 0 }}>
              <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {stats?.shopLocations?.map((loc, index) => (
                  <CircleMarker
                    key={index}
                    center={[loc.lat, loc.lng]}
                    radius={5 + loc.count * 1.5}
                    pathOptions={{
                      color: "blue",
                      fillColor: "blue",
                      fillOpacity: 0.5,
                    }}
                  >
                    <Tooltip>
                      {loc.location_name}: {loc.count} shops
                    </Tooltip>
                  </CircleMarker>
                ))}
              </MapContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;

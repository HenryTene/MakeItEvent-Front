import { Row, Col, Image } from "react-bootstrap";
import PhotoAbout from "../assets/prueba.jpg";

export default function About() {
  return (
    <Row className="container mx-auto py-5">
      <Col>
        <h2 id="about">Sobre MakeItEvent</h2>
        <Row xs={10} sm={8}>
          <Row className="fs-5">
            <Col>
              Somos una plataforma para brindar experiencias que te permitiran,
              crear, compartir, encontrar y asistir a eventos que siguen tus
              intereses. Desde festivales musicales, conferencias, hasta
              encuentros de fotografia y mucho mas.
            </Col>
          </Row>
          <Image className="mt-4" src={PhotoAbout} alt="Find your pet" />
        </Row>
      </Col>
    </Row>
  );
}

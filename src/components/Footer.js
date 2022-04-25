import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Footer() {
  const links = [
    { showName: "Inicio", link: "/" },
    { showName: "Acerca de", link: "/#about" },
    /* { showName: "Proveedores", link: "/categories" }, */
    { showName: "Iniciar Sesion", link: "/login" },
  ];
  return (
    <Row className="mt-auto bg-dark text-center text-light py-4 mx-0">
      <Container>
        <Row>
          {links.map((navLink) => {
            return (
              <Col key={navLink.showName} xs={12} sm={3}>
                <Button
                  variant="link"
                  className="text-light text-decoration-none"
                  as={Link}
                  to={`${navLink.link}`}
                >
                  {navLink.showName}
                </Button>
              </Col>
            );
          })}
        </Row>
        <Row className="pt-5">
          <Col xs={12}>© 2022 MakeItevent</Col>
        </Row>
      </Container>
    </Row>
  );
}

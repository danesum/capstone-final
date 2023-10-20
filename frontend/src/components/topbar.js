import { React } from "react";
import { Navbar, Container, Col, Button } from "react-bootstrap";

function TopBar({ user, setUser }) {
  //simple function for logging out which deletes stored
  //data and sets auth to false
  function handleLogout() {
    setUser({ jwt: "", auth: false, admin: false });
  }

  // Top navigation bar (there are no separate pages so it's there
  // mainly for aesthetics and to house the log out button)
  return (
    <Navbar className="bg-body-tertiary">
      <Container fluid="md">
        <Navbar.Brand>ExpoJunction</Navbar.Brand>
        {/* Display Log Out button if user is logged in */}
        {user.auth && (
          <Col xs="auto">
            <Button
              variant="secondary"
              type="button"
              onClick={(e) => handleLogout(e)}
            >
              Log Out
            </Button>
          </Col>
        )}
      </Container>
    </Navbar>
  );
}

export default TopBar;

//import needed elements
import { React, useState, useEffect } from "react";
import { Container, Button, Row, Col, Card, Alert } from "react-bootstrap";

function Admin({ user, setUser }) {
  //define local state
  const [eventData, setEventData] = useState([]);
  const [messages, setMessages] = useState(
    `How to Use: Browse our list of available events below and click "Get Tickets" to be redirected to that event's ticket purchase page.`
  );

  //function to get all data from the event storage
  //database
  async function getData() {
    let key = user.jwt;
    setMessages("");
    try {
      let res = await fetch("/events/get", {
        method: "GET",
        headers: {
          Authorization: `Bearer: ${key}`,
        },
      });
      let obj = await res.json();
      setEventData(obj);
    } catch (err) {
      setMessages(err.message);
      console.log(err.message);
    }
  }

  // useeffect to populate data on initial load
  useEffect(() => {
    getData();
  }, []);

  // front end code for logged in section for end users. Displays all events
  // with nonfunctional button that would forward to where they can buy
  // tickets
  return (
    <Container>
      {/* hidden container for messages */}
      {messages.length > 0 && (
        <Row className="mt-3">
          <Alert key="primary" variant="primary" dismissible>
            {messages}
          </Alert>
        </Row>
      )}

      {/* Main body display showing all upcoming events and their details */}
      <Col>
        <Row className="py-3">
          <h1>Upcoming Events</h1>
        </Row>
        <Row>
          {eventData.map((event, i) => (
            <Card
              key={i}
              className="my-2 mx-auto p-0"
              style={{ width: "18rem" }}
            >
              <Card.Img
                variant="top"
                style={{ height: "100%" }}
                src={event.eventImg}
              />
              <Card.Body>
                <Card.Title>{event.eventName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  R {event.price}
                </Card.Subtitle>
                <Card.Text>
                  <strong> Date:</strong> {event.date} <br></br>
                  <strong>Time:</strong> {event.time}
                </Card.Text>
                <Row>
                  <a
                    href={event.ticketURL}
                    target="_blank"
                    class="btn btn-primary"
                    role="button"
                  >
                    Get Tickets
                  </a>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Col>
    </Container>
  );
}

export default Admin;

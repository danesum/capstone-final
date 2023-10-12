//import needed dependencies
import { React, useState, useEffect } from "react";
import { Container, Button, Row, Alert, Card, Form } from "react-bootstrap";

function App({ user, setUser }) {
  //set needed state variables
  const [eventData, setEventData] = useState([]);
  const [messages, setMessages] = useState("");
  const [eventName, setEventName] = useState([]);
  const [imgURL, setImgUrl] = useState([]);
  const [eventDate, setEventDate] = useState([]);
  const [eventTime, setEventTime] = useState([]);
  const [eventPrice, setEventPrice] = useState([]);

  //function for getting and storying all current event data
  //from the database
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
      setMessages(err);
      console.log(err);
    }
  }

  //function for adding new events to the database
  async function handleNewEvent(e) {
    e.preventDefault();
    setMessages("");
    let key = user.jwt;
    try {
      let data = {
        eventName: eventName,
        eventImg: imgURL,
        date: eventDate,
        time: eventTime,
        price: eventPrice,
      };
      let res = await fetch("/admin/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer: ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let info = await res.json();
      setMessages(info.message);
      //clear state to empty controlled form fields
      setEventName("");
      setImgUrl("");
      setEventDate("");
      setEventTime("");
      setEventPrice("");
      //refresh page content
      getData();
    } catch (err) {
      setMessages(err);
      console.log(err);
    }
  }

  //function for editing the fields of an existing events. It prompts users to
  //enter their desired edits one at a time, with prompt menus that default to
  //the current values
  async function handleEdit(e) {
    e.preventDefault();
    let key = user.jwt;
    let eventId = e.target.id;
    let currentData = eventData.find((element) => element._id === eventId);
    try {
      // Get new data from user
      // prompts default to current values
      let editedName = prompt("Please enter new name:", currentData.eventName);
      let editedImg = prompt(
        "Please enter new image URL:",
        currentData.eventImg
      );
      let editedDate = prompt(
        "Please enter date for the event:",
        currentData.date
      );
      let editedTime = prompt(
        "Please enter new start and end times for the event:",
        currentData.time
      );
      let editedPrice = prompt(
        "Please enter new price for event tickets:",
        currentData.price
      );
      //form JSON data to send
      let data = {
        id: eventId,
        eventName: editedName,
        eventImg: editedImg,
        date: editedDate,
        time: editedTime,
        price: editedPrice,
      };
      // call Express server to do update
      let res = await fetch("/admin/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${key}`,
        },
        body: JSON.stringify(data),
      });
      let info = await res.json();
      setMessages(info.message);
      //refresh page content
      getData();
    } catch (err) {
      setMessages(err);
      console.log(err);
    }
  }

  //function for deleting an existing event from the database
  async function handleDelete(e) {
    e.preventDefault();
    let key = user.jwt;
    let taskId = e.target.id;
    try {
      //looks for an event with the same _id field and deletes
      //on the backend
      let data = { id: taskId };
      let res = await fetch("/admin/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${key}`,
        },
        body: JSON.stringify(data),
      });
      let info = await res.json();
      setMessages(info.message);
      //refresh content
      getData();
    } catch (err) {
      setMessages(err);
      console.log(err);
    }
  }

  //useeffect for populating the page on load
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      {/* Hidden section for displaying messages */}
      {messages.length > 0 && (
        <Row className="mt-3">
          <Alert key="primary" variant="primary">
            {messages}
          </Alert>
        </Row>
      )}
      {/* Form for adding new events */}
      <Row className="py-3">
        <h1>Add New Event:</h1>
      </Row>
      <Row>
        <Form>
          <Form.Group className="mb-2" controlId="eventName">
            <Form.Label>Event Name:</Form.Label>
            <Form.Control
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="imgUrl">
            <Form.Label>Image URL:</Form.Label>
            <Form.Control
              type="text"
              value={imgURL}
              onChange={(e) => setImgUrl(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="eventDate">
            <Form.Label>Date of Event:</Form.Label>
            <Form.Control
              type="text"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="eventTime">
            <Form.Label>Start and End Time of Event:</Form.Label>
            <Form.Control
              type="text"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="eventPrice">
            <Form.Label>Ticket Price (ZAR):</Form.Label>
            <Form.Control
              type="text"
              value={eventPrice}
              onChange={(e) => setEventPrice(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => handleNewEvent(e)}
          >
            Add Event
          </Button>
        </Form>
      </Row>

      {/* display of all current events with admin controls for editing
      and deleting events */}
      <Row className="py-3">
        <h1>Existing Events:</h1>
      </Row>
      <Row>
        {eventData.map((event) => (
          <Card className="my-2 mx-auto p-0" style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              style={{ height: "100%", width: "100%" }}
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
                <Button className="my-1" variant="primary">
                  Get Tickets
                </Button>
                <Button
                  className="my-1"
                  variant="secondary"
                  onClick={(e) => handleEdit(e)}
                  id={event._id}
                >
                  Edit Event
                </Button>
                <Button
                  className="my-1"
                  variant="danger"
                  onClick={(e) => handleDelete(e)}
                  id={event._id}
                >
                  Delete Event
                </Button>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
}

export default App;

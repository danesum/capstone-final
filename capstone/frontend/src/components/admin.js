//import needed dependencies
import { React, useState, useEffect } from "react";
import {
  Container,
  Button,
  Row,
  Alert,
  Card,
  Form,
  Modal,
} from "react-bootstrap";

function App({ user, setUser }) {
  //set needed state variables
  const [eventData, setEventData] = useState([]);
  const [messages, setMessages] = useState(
    "How to Use: Use the form below to add new events, or click the relevant button on the event cards below to edit or delete events. Only admins can see form, edit and add buttons."
  );
  const [eventName, setEventName] = useState("");
  const [imgURL, setImgUrl] = useState("");
  const [ticketURL, setTicketURL] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventPrice, setEventPrice] = useState(0);
  const [show, setShow] = useState(false);
  const [modalID, setModalID] = useState("");

  //function for clearing state data
  function clearState() {
    setModalID("");
    setEventName("");
    setImgUrl("");
    setTicketURL("");
    setEventDate("");
    setEventTime("");
    setEventPrice("");
  }

  //function for validating if an input is a valid number
  function isNumber(num) {
    let str = num.toString();
    if (str.trim() === "") {
      return false;
    }
    return !isNaN(str);
  }
  //function for getting and storing all current event data
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
      setMessages(err.message);
      console.log(err.message);
    }
  }

  //function for adding new events to the database
  async function handleNewEvent(e) {
    e.preventDefault();
    setMessages("");
    if (isNumber(eventPrice)) {
      try {
        let key = user.jwt;
        let data = {
          eventName: eventName,
          eventImg: imgURL,
          ticketURL: ticketURL,
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
        clearState();
        //refresh page content
        getData();
      } catch (err) {
        setMessages(err.message);
        console.log(err.message);
      }
    } else {
      setMessages("The given price is not a valid number, please try again.");
    }
  }

  // functions for closing and showing the modal with prefilled data.
  // reusing current state vars to avoid duplication
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
    let eventId = e.target.id;
    let currentData = eventData.find((element) => element._id === eventId);
    setModalID(eventId);
    setEventName(currentData.eventName);
    setImgUrl(currentData.eventImg);
    setTicketURL(currentData.ticketURL);
    setEventDate(currentData.date);
    setEventTime(currentData.time);
    setEventPrice(currentData.price);
  };

  //function for editing the fields of an existing events. It prompts users to
  //enter their desired edits one at a time, with prompt menus that default to
  //the current values
  async function handleEdit(e) {
    if (isNumber(eventPrice)) {
      e.preventDefault();
      let key = user.jwt;
      try {
        //get data from state and attempt to update
        let data = {
          id: modalID,
          eventName: eventName,
          eventImg: imgURL,
          ticketURL: ticketURL,
          date: eventDate,
          time: eventTime,
          price: eventPrice,
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
        //refresh page content and close modal
        clearState();
        getData();
        handleClose();
      } catch (err) {
        setMessages(err.message);
        console.log(err.message);
      }
    } else {
      alert("The given price is not a valid number, please try again.");
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
      setMessages(err.message);
      console.log(err.message);
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
          <Alert key="primary" variant="primary" dismissible>
            {messages}
          </Alert>
        </Row>
      )}

      {/* Modal for updating tasks */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            <Form.Group className="mb-2" controlId="ticketUrl">
              <Form.Label>Ticket Purchase URL:</Form.Label>
              <Form.Control
                type="text"
                value={ticketURL}
                onChange={(e) => setTicketURL(e.target.value)}
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => handleEdit(e)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

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
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="imgUrl">
            <Form.Label>Image URL:</Form.Label>
            <Form.Control
              type="text"
              value={imgURL}
              onChange={(e) => setImgUrl(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="ticketUrl">
            <Form.Label>Ticket Purchase URL:</Form.Label>
            <Form.Control
              type="text"
              value={ticketURL}
              onChange={(e) => setTicketURL(e.target.value)}
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
        {eventData.map((event, i) => (
          <Card key={i} className="my-2 mx-auto p-0" style={{ width: "18rem" }}>
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
                <a
                  href={event.ticketURL}
                  target="_blank"
                  class="btn btn-primary"
                  role="button"
                >
                  Get Tickets
                </a>
                <Button
                  className="my-1"
                  variant="secondary"
                  onClick={(e) => handleShow(e)}
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

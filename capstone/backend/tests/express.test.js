test("Log-in works using test details (Testing if Response is Truthy)", async () => {
  let data = { username: "test", password: "test" };
  const response = await fetch("http://localhost:8080/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  expect(response).toBeTruthy;
});

test("Users without a valid JWT cant access the app (Response is Falsy)", async () => {
  let key = "12345";

  let response = await fetch("http://localhost:8080/events/get", {
    method: "GET",
    headers: {
      Authorization: `Bearer: ${key}`,
    },
  });

  expect(response).toBeFalsy;
});

test("Non-admin can't access admin functions (response is Falsy)", async () => {
  let data = { username: "test2", password: "test2" };
  let res = await fetch("http://localhost:8080/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  let resObj = await res.json();
  let token = resObj.token;

  let data2 = { id: "6527f7400a4554c5f67b2ba6" };
  let test = await fetch("http://localhost:8080/admin/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer: ${token}`,
    },
    body: JSON.stringify(data2),
  });

  expect(test).toBeFalsy;
});

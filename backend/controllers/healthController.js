export function getHealth(_req, res) {
  res.type("text/plain").send("Server is running");
}

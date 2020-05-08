import generateFunctions from "../utils/generate";

const base = "/notifications";
const Notifications = generateFunctions(base);

function getResponse(data) {
  const url = `${base}/response`;
  return this.http.post(url, { params: data });
}
function send(id,data) {
  const url = `${base}/${id}`;
  return this.http.post(url, { params: data });
}


Notifications.Response = getResponse;
Notifications.Send = send;
export default Notifications;

import generateFunctions from "../utils/generate";

const base = "/concierge";

function getTickets(body) {
  const url = `${base}/tickets`;
  return this.get(url, body);
}
function createTicket(body) {
    const url = `${base}/tickets`;
    return this.post(url, body);
  }
function getPendingTickets(body) {
    const url = `${base}/tickets/pending`;
    return this.post(url, body);
  }

  function closeTickets(body) {
    const url = `${base}/tickets/close`;
    return this.post(url, body);
  }

  function updateTicket(ticketId,body) {
    const url = `${base}/tickets/${ticketId}`;
    return this.put(url, body);
  }

  function markAsRead(ticketId,body) {
    const url = `${base}/tickets/${ticketId}/read`;
    return this.post(url, body);
  }

  function postMessage(ticketId,body) {
    const url = `${base}/tickets/${ticketId}/message`;
    return this.post(url, body);
  }
  

const Concierge = generateFunctions(base);


Concierge.getTickets = getTickets;
Concierge.createTicket = createTicket;
Concierge.getPendingTickets = getPendingTickets;
Concierge.closeTickets = closeTickets;
Concierge.updateTicket = updateTicket;
Concierge.markAsRead = markAsRead;
Concierge.postMessage = postMessage;

export default Concierge;

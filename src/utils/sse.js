const clients = new Set()
function sendEventToClients(eventData) {
  for (const client of clients) {
    client.write(`data: ${JSON.stringify(eventData)}\n\n`)
  }
}

module.exports = { clients, sendEventToClients }

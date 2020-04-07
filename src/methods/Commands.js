let base = "/commands";

function post(body) {
  const url = base;
  return this.post(url, body);
}

const command = {
  post,
};

export default command;

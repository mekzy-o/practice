const createParty = async () => {
  const baseUrl = 'http://localhost:3000/api/v1/parties';
  const name = document.querySelector('#party-name').value;
  const hqAddress = document.querySelector('#hqaddress').value;
  const logoUrl = document.querySelector('#logourl').value;

  const data = { name, hqAddress, logoUrl };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    referrer: 'no-referrer',
    body: JSON.stringify(data),
  };

  const request = async () => {
    const response = await fetch(baseUrl, options);
    const json = await response.json();
    const display = document.getElementById('content');
    if (json.status !== 200) {
      display.innerHTML = `<p> ${json.error} </p>`;
    }

    if (json.status === 201) {
      console.log('done!');
      //   createParty();
      display.innerHTML = '<p>DONE</p>';
    }
  };

  request();
};

const partyForm = document.querySelector('#party-form');
partyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  createParty();
});

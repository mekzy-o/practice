const baseUrl = 'http://localhost:3000/api/v1';
const partyForm = document.querySelector('#party-form');

const createParty = () => {
  window.localStorage.replace('admin.dashboard');
};

if (partyForm) {
  partyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#party-name').value;
    const hqAddress = document.querySelector('#hqaddress').value;
    const logoUrl = document.querySelector('#logourl').value;
    fetch(`${baseUrl}/parties`, {
      method: 'POST',
      // mode:'cors',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ name, hqAddress, logoUrl }),
    }).then(res => res.json())
      .then((data) => {
        if (data.status === 201) {
          console.log('done!');
        //   createParty();
        } else {
          console.log('Not done!');
        }
      }).catch((error) => {
        console.log(error);
      });

  });
}

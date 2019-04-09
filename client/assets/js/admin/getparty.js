/* eslint-disable brace-style */
const baseUrl = 'http://localhost:3000/api/v1';

const partyTable = document.querySelector('#party-table');

if (window.localStorage = 'admin.html') {
//   console.log('You are here!');
  fetch('http://localhost:3000/api/v1/parties', {
    method: 'GET',
    mode: 'cors',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
    },
    // body: JSON.parse({ name, hqAddress, logoUrl }),
  }).then(res => res.json())
    .then((data) => {
      if (data.status === 200) {
          console.log(data.data);
        // for (i = 1; i <= data.data.length; i++) {
        //   partyTable.innerHTML = `<tr>
        // <td>${i}</td>
        // <td>${data.data[i].name}</td>
        // <td>${data.data[i].hqaddress}</td>
        // </tr>`; }
      } else {
        console.log('Not done!');
      }
    }).catch((error) => {
      console.log(error);
    });

}

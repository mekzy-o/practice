// const getParty = async () => {
//   const partyTable = document.getElementById('party-table');
//   const url = 'http://localhost:3000/api/v1/parties';
//   const token = window.localStorage.getItem('token');
//   const options = {
//     method: 'GET',
//     headers: { 'x-auth-token': token },
//   };
//   // spinner.removeAttribute('hidden');
//   const response = await fetch(url, options);
//   const json = await response.json();
//   if (json.status === 401) {
//     window.localStorage.removeItem('token');
//     window.location.href = '../login.html';
//   }
//   if (json.status === 404) {
//     partyTable.innerHTML = `${json.error}`;
//     // setTimeout(() => spinner.setAttribute('hidden', ''), 1000);
//   }

//   json.data.forEach((info) => {
//     const tr = document.createElement('tr');
//     // const logoUrl = document.createElement('td');
//     const name = document.createElement('td');
//     const hqAddress = document.createElement('td');
//     const number = document.createElement('td');
//     const tdButtons = document.createElement('td');
//     const deleteBtn = document.createElement('button');
//     const editBtn = document.createElement('button');
//     // number = info.id;
//     name.textContent = info.name;
//     hqAddress.textContent = info.hqaddress;
//     number.innerHTML = `<span>${info.id}</span>`;
//     deleteBtn.classList.add('delete');
//     deleteBtn.innerHTML = `<span>Delete</span>`;
//     editBtn.innerHTML = `<span>Edit</span>`;
//     editBtn.classList.add('edit');
//     tdButtons.appendChild(deleteBtn);
//     tdButtons.appendChild(editBtn);
//     // logoUrl.innerHTML = `<img src="${info.logourl}" alt="party logo">`;
//     tr.appendChild(number);
//     // tr.appendChild(logoUrl);
//     tr.appendChild(name);
//     tr.appendChild(hqAddress);
//     tr.appendChild(tdButtons);
//     partyTable.appendChild(tr);
//     // setTimeout(() => spinner.setAttribute('hidden', ''), 1000);
//   });
// };
// window.onload = getParty();

const baseUrl = 'http://localhost:3000/api/v1';
/**
 * @description Admin Get all political parties
 */
const token = localStorage.getItem('token');
fetch(`${baseUrl}/parties`, {
  method: 'GET',
  mode: 'cors',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-type': 'application/json',
    authorization: token,
  },
})
  .then(res => res.json())
  .then((response) => {
    const { data } = response;
    let parties = '';
    parties += `<table class="stats-table" id='party-table'>
                  <tbody>
                     <tr>
                      <th>S/N</th>
                      <th>Name of Political Party</th>
                      <th>Hq Address</th>
                      <th>Action</th>
                    </tr>
                  </tbody>
            </table>`
    data.forEach((party) => {
      parties += `
            
            <tr>
              <td>${party.id}</td>
              <td>${party.name}</td>
              <td>${party.hqaddress}</td>
              <td>
                  <button type='submit' class='delete' id='${party.id}'>Delete</button>
                  <button type='submit' class='edit' id='${party.id}'>Edit</button>
              </td>
            </tr>`
      document.getElementById('party-table').innerHTML = parties;
    });
  })
  .catch((error) => {
    document.querySelector('#party-table')
      .innerHTML = `<h2>Sorry, Something went wrong with the server<h2/>
        <h3>${error}<h3/>`;
  });
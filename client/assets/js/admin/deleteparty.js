const table = document.querySelector('#party-table');
console.log(table);
table.addEventListener('click', (e) => {

  if (e.target.className == 'delete') {
    const partyid = e.target.id;
    if (confirm('Are You sure You want to delete?')) {
      const url = `http://localhost:3000/api/v1/parties/${partyid}`;
      const token = window.localStorage.getItem('token');
      fetch(url, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-type': 'application/json',
          'x-auth-token': token,
        },
      }).then(res => res.json())
        .then((response) => {
          const { data } = response;
          if (data) {
            console.log(data);
          }
        //  else {
        // //     document.getElementById('party-table').innerHTML = `<h3>${error}</h3>`;
        //   }
        });
    }
    window.location.reload();
  }
});

// const deleteParty = async () => {
//   const url = `http://localhost:3000/api/v1/parties/${data - id}`;
//   const token = window.localStorage.getItem('token');
//   const options = {
//     method: 'DELETE',
//     headers: { 'x-auth-token': token },
//   };
//     // spinner.removeAttribute('hidden');
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

//   console.log(json.data.id);

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
//     deleteBtn.textContent = 'Delete';
//     editBtn.textContent = 'Edit';
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
//     // setTimeout(() => spinner.setAttribute('hidden', ''), 1000
// }

const baseUrl = 'http://localhost:3000/api/v1';

const loginForm = document.querySelector('#login-form');
const signupForm = document.querySelector('#signup-form');

const authLogin = () => {
  if (window.localStorage.admin === 'true') {
    window.location.replace('admin.html');
  } else {
    window.location.replace('user-profile.html');
  }

};

const authSignup = () => {
  if (window.localStorage.admin === 'true') {
    window.location.replace('admin-profile.html');
  } else {
    window.location.replace('login.html');
  }
};


/**
 * Assigns an event-listener to signupForm if it exists in the window
 *
 * @param {object} e - The event parameter
 */
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstName = document.querySelector('#first-name').value;
    const lastName = document.querySelector('#last-name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const otherName = document.querySelector('#other-name').value;
    const phoneNumber = document.querySelector('#phonenumber').value;

    fetch('http://localhost:3000/api/v1/auth/signup', {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        firstName, lastName, email, password, otherName, phoneNumber,
      }),
    }).then(res => res.json())
      .then((data) => {
        if (data.status === 201) {
          console.log('done!');
          window.localStorage.token = data.data.token;
          window.localStorage.admin = data.data.user.isadmin;
          window.localStorage.user = data.data.user.id;
          const { user } = data.data;
          document.querySelector('#signup-form').innerHTML = `<h2>Signup Successful!</h2>
                  <h3>Welcome</h3> <p>${user.firstName}</p> ${user.lastName}`;
          setTimeout(() => {
            authSignup();
          }, 10000);
        } else {
          console.log("can't go");
          let output = '<h3>Error<h3/>';
          Object.keys(data).forEach((key) => {
            output += `<p>${data[key]}<p/>`;
          });
          document.querySelector('#signup-form').innerHTML = output;
          setTimeout(() => {
            window.location.replace('signup.html');
          }, 5000);
        }
      }).catch((error) => {
        //  console.log(data)
        document.querySelector('#error').innerHTML = `<h2>server error</h2>
              <h3>${error}</h3>`;
        setTimeout(() => {
          window.location.replace('signup.html');
        }, 5000);
      });

  });
}


/**
 * Assigns an event-listener to loginForm if it exists in the window
 *
 * @param {object} e - The event parameter
 */
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    fetch(`${baseUrl}/auth/signin`, {
      method: 'POST',
      //   mode: 'cors',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then(res => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          window.localStorage.clear();
          window.localStorage.token = data.data.token;
          window.localStorage.admin = data.data.user.isAdmin;
          window.localStorage.user = data.data.user.id;

          document.querySelector('#login-form').innerHTML = `
                  <h2>Login Successful!!</h2>
                  <h3 class=''>Welcome ${data.data.user.firstName}!</h3>`;
          authLogin();

        } else {
          document.querySelector('#login-form').innerHTML = `<h2>${data.error}</h2>
                <h3>Please check your login details</h3>`;
          setTimeout(() => {
            window.location.replace('login.html');
          }, 100000);
        }
      }).catch((error) => {
        document.querySelector('#error').innerHTML = `<h2>Sorry, something went wrong with the server error</h2>
              <h3  class='welcome-success'>${error}</h3>`;
        setTimeout(() => {
          window.location.replace('login.html');
        }, 100000);
      });
  });
}



require('whatwg-fetch'); 
 
 export function sendEmail(data) {
    return fetch('/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/JSON'
        },
        body: JSON.stringify(data)
      }).then(resp => resp.json())
        .then(resp => {
          return resp;
      });
  }
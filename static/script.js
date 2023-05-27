function test() {
    fetch('/generateImage', {
      headers : {
          'Content-Type' : 'application/json'
      },
      method : 'POST', 
      body : JSON.stringify( {  
          'prompt' : 'a photograph of an astronaut riding a horse'
      })
  })
  .then(function (response){ 
  
      if(response.ok) {  
        // window.href = "/generateImage"
          response.json() 
          .then(function(response) {
              console.log(response)
          });
      }
      else {
          throw Error('Something went wrong');
      }
  })
  .catch(function(error) {
      console.log(error);
  });
  }
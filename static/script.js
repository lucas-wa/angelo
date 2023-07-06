document.querySelector("form")
    .addEventListener("submit", async e => {
        e.preventDefault()

        document.querySelector("button").innerHTML = "<div class='lds-ring'><div></div><div></div><div></div><div></div></div>"

        try {

            // const prompt = document.querySelector("input").value

            // const response = await fetch('/', {
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     method: 'POST',
            //     body: JSON.stringify({
            //         'prompt': prompt
            //     })
            // })

            const input = document.querySelector("#inputFile");

            const formData = new FormData()
            formData.append('file', input.files[0])


            const response = await fetch('/uploadFile', {
    
                method: 'POST',
                body: formData
            })
            console.log(response)
            // const data = await response.json();

            // document.querySelector("img").src = data.image_raw;
            document.querySelector("button").innerHTML = "Request"
        } catch (error) {
            console.log(error)
        }


    })

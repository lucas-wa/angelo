document.querySelector("form")
    .addEventListener("submit", async e => {
        e.preventDefault()

        document.querySelector("button").innerHTML = "<div class='lds-ring'><div></div><div></div><div></div><div></div></div>"

        try {

            const prompt = document.querySlector("input").value

            const response = await fetch('/', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    'prompt': prompt
                })
            })


            const data = await response.json();

            document.querySelector("img").src = data.image_raw;
            document.querySelector("button").innerHTML = "Request"
        } catch (error) {
            console.log(error)
        }


    })

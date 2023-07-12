let formState = "generatorLink";

document.querySelector("form")
  .addEventListener("submit", async e => {
    e.preventDefault()

    console.log(formState)

    document.querySelector("button").innerHTML = "<div class='lds-ring'><div></div><div></div><div></div><div></div></div>"

    if (formState == "generatorLink") {

      try {

        const prompt = document.querySelector("#inputPrompt").value

        const response = await fetch('/generator', {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            'prompt': prompt,
            "service": "generator"
          })
        })

        if (response.ok) {
          const data = await response.json();
          document.querySelector("img").src = data.image_raw;
        }

        document.querySelector("button").innerHTML = "Enviar"
      } catch (error) {
        console.log(error)
      }

    }

    else if (formState == "upscaleLink") {

      try {

        const input = document.querySelector("#inputFile");
        const file = input['files'][0]
        let reader = new FileReader();
        let base64Image = "";

        reader.readAsDataURL(file);

        reader.onload = async function () {
          base64Image = reader.result.split(',')[1];

          const response = await fetch('/upscale', {
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
              "file": base64Image,
              "service": "upscale"
            })
          })

          if (response.ok) {
            const data = await response.json();

            const img = document.querySelector("main figure img");
            img.src = ""

            const figure = document.querySelector("main figure")
            figure.classList.remove("sr-only");
            img.src = data.image_raw;
          }
          document.querySelector("button").innerHTML = "Enviar"

        }


        console.log(base64Image)




      } catch (error) {
        console.log(error)
      }
    }
  })


document.querySelectorAll("header nav ul li")
  .forEach(li => {
    console.log(li)
    li.addEventListener("mousedown", e => {
      const state = e.target.id;

      if (state != formState) handleFormState(state);
    })
  })

function handleFormState(state) {


  const inputFile = document.querySelector("#inputFile");
  inputFile.value = '';
  const p = document.querySelector("#customFileInput p");
  p.innerHTML = "Faça o upload da imagem";

  const fileInput = document.querySelector("#customFileInput");
  const inputPrompt = document.querySelector("#inputPrompt");
  inputPrompt.value = ""
  const h1 = document.querySelector("main h1");
  const figure = document.querySelector("main figure");

  if (state == "generatorLink") {
    formState = "generatorLink"
    fileInput.classList.add("slide-out")

    h1.innerHTML = "Gerador de Imagens"

    setTimeout(() => {
      inputPrompt.classList.add("slide-in");
      figure.classList.add("slide-in");
      figure.classList.remove("sr-only")
      inputPrompt.classList.remove("sr-only");

      setTimeout(() => {
        inputPrompt.classList.remove("slide-in");
        figure.classList.remove("slide-in");
      }, 1000)

      fileInput.classList.add("sr-only");
      fileInput.classList.remove("slide-out");
    }, 1000)

  }

  if (state == "upscaleLink") {
    formState = "upscaleLink"
    inputPrompt.classList.add("slide-out")
    figure.classList.add("slide-out")


    h1.innerHTML = "Upscale de Imagens"

    setTimeout(() => {
      fileInput.classList.add("slide-in");
      fileInput.classList.remove("sr-only");

      setTimeout(() => {
        fileInput.classList.remove("slide-in");
      }, 1000)

      inputPrompt.classList.add("sr-only");
      figure.classList.add("sr-only");
      inputPrompt.classList.remove("slide-out");
      figure.classList.remove("slide-out");
    }, 1000)
  }

}

document.querySelector("#inputFile")
  .addEventListener("change", e => {

    const filepath = e.target.value
    const arrFilePath = filepath.split(/(\\|\/)/g);
    let filename = arrFilePath[arrFilePath.length - 1];

    if (filename.length > 30) {
      const arrFile = filename.split(".")
      let name = arrFile[0]
      let mime = arrFile[1]

      name = name.slice(0, 30) + '[...]';

      filename = name + '.' + mime
    }


    const p = document.querySelector("#customFileInput p");

    p.innerHTML = filename;

  })

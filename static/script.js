let formState = "generateContainer";

document.querySelector("#generateForm")
  .addEventListener("submit", async e => {

    const submitButton = document.querySelector("#generateForm button")
    submitButton.disable = true;
    submitButton.innerHTML = "<div class='lds-ring'><div></div><div></div><div></div><div></div></div>"


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

    } catch (error) {
      console.log(error)
    }

    submitButton.disable = false;
    submitButton.innerHTML = "Enviar"
  });

document.querySelector("#upscaleForm")
  .addEventListener("submit", async e => {


    try {

      const input = document.querySelector("#inputUpscaleFile");
      const file = input['files'][0]
      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = async function () {

        const base64Image = reader.result.split(',')[1];

        const submitButton = document.querySelector("#upscaleForm button")
        submitButton.disable = true;
        submitButton.innerHTML = "<div class='lds-ring'><div></div><div></div><div></div><div></div></div>"


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

          const virtualImg = new Image();

          virtualImg.src = data.image_raw;

          virtualImg.onload = () => {
            makeFigureResponsive(virtualImg)
          }

        }

        submitButton.disable = false;
        submitButton.innerHTML = "Enviar"

      }

    } catch (error) {
      console.log(error)
    }
  });

document.querySelectorAll("header nav ul li")
  .forEach(li => {
    console.log(li)
    li.addEventListener("mousedown", e => {
      const state = e.target.classList[0];

      console.log(state);

      if (state != formState) handleFormState(formState, state);
    })
  })

function handleFormState(prevState, state) {

  formState = state;
  const prevStateForm = document.querySelector(`#${prevState}`);
  const stateForm = document.querySelector(`#${state}`);

  prevStateForm.classList.add("slide-out");


  setTimeout(() => {
    prevStateForm.classList.add("sr-only");
    prevStateForm.classList.remove("slide-out");

    setTimeout(() => {
      stateForm.classList.remove("slide-in");
    }, 1000)

    stateForm.classList.add("slide-in");
    stateForm.classList.remove("sr-only");
  }, 1000)
}

document.querySelector("#inputUpscaleFile")
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


    const p = document.querySelector("#inputUpscaleFile .customFileInput p");

    p.innerHTML = filename;

    const figure = document.querySelector("#upscaleContainer figure");

    const input = document.querySelector("#inputUpscaleFile");
    const file = input['files'][0]
    let reader = new FileReader();


    reader.onload = async function (e) {
      const img = new Image();

      img.onload = function () {
        figure.width = img.width;
        figure.height = img.height;

        makeFigureResponsive(img);

      };

      // Set the source of the image to the uploaded file
      img.src = e.target.result;

    }

    reader.readAsDataURL(file);
  })

function makeFigureResponsive(img) {
  const elementImage = document.querySelector("#upscaleContainer figure img");

  const container = document.querySelector("#upscaleContainer figure");
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const imgWidth = img.width;
  const imgHeight = img.height;

  const widthBigger = imgWidth > imgHeight;

  // Calculate the aspect ratio of the original image
  const aspectRatio = imgWidth / imgHeight;

  // Adjust the img width and height based on the container size
  if (widthBigger && containerWidth < imgWidth) {
    img.style.width = (containerWidth - 20) + "px";
    img.style.height = ((containerWidth / aspectRatio) - 20) + "px";
  } else if (!widthBigger && containerHeight < imgHeight) {
    img.style.height = (containerHeight - 20) + "px";
    img.style.width = ((containerHeight * aspectRatio) - 20) + "px";
  }

  elementImage.style.width = img.style.width;
  elementImage.style.height = img.style.height;

  elementImage.src = img.src;

}


document.querySelector("#inputEditorFile")
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


    const p = document.querySelector("#editorContainer .customFileInput p");

    p.innerHTML = filename;

    const canvas = document.querySelector("#editorContainer #canvas-wrapper canvas");

    const input = document.querySelector("#inputEditorFile");
    const file = input['files'][0]
    let reader = new FileReader();


    reader.onload = async function (e) {
      const img = new Image();

      img.onload = function () {
        //canvas.width = img.width;
        //canvas.height = img.height;

        makeCanvasResponsive(img);


      };

      // Set the source of the image to the uploaded file
      img.src = e.target.result;

    }

    reader.readAsDataURL(file);
  })

function makeCanvasResponsive(img) {
  const canvas = document.querySelector("#editorContainer #canvas-wrapper canvas");

  const container = document.querySelector("#editorContainer .figure");
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const imgWidth = img.width;
  const imgHeight = img.height;

  const widthBigger = imgWidth > imgHeight;

  // Calculate the aspect ratio of the original image
  const aspectRatio = imgWidth / imgHeight;

  // Adjust the img width and height based on the container size
  if (widthBigger && containerWidth < imgWidth) {
    img.style.width = (containerWidth) + "px";
    img.style.height = ((containerWidth / aspectRatio)) + "px";
  } else if (!widthBigger && containerHeight < imgHeight) {
    img.style.height = (containerHeight) + "px";
    img.style.width = ((containerHeight * aspectRatio)) + "px";
  }

  canvas.style.width = img.style.width;
  canvas.style.height = img.style.height

  canvas.style.backgroundImage = `url(${img.src})`;
  canvas.style.backgroundSize = 'cover'

  const canvasOffsetX = canvas.offsetLeft;
  const canvasOffsetY = canvas.offsetTop;

  canvas.width = window.innerWidth - canvasOffsetX;
  canvas.height = window.innerHeight - canvasOffsetY;
}





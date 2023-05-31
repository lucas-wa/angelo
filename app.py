import os
import io
import threading
import base64

from flask import Flask, render_template, request, jsonify, send_file
from pyngrok import ngrok
from flask_cors import CORS

import torch
from diffusers import StableDiffusionPipeline

pipe = StableDiffusionPipeline.from_pretrained("CompVis/stable-diffusion-v1-4", torch_dtype=torch.float16) 

if torch.cuda.is_available():
    pipe = pipe.to("cuda")
else:
    pipe = pipe.to("cpu")
 

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
port = 5000

# Open a ngrok tunnel to the HTTP server
public_url = ngrok.connect(port).public_url
print(" * ngrok tunnel \"{}\" -> \"http://127.0.0.1:{}\"".format(public_url, port))

# Update any base URLs to use the public ngrok URL
app.config["BASE_URL"] = public_url

# ... Update inbound traffic via APIs to use the public-facing ngrok UR#

# Define Flask routes
@app.route("/", methods = ['GET', 'POST'])
def index():
  try:
      if request.method == "GET":
        return render_template("index.html")
      else:

        
          req = request.get_json()

          if "prompt" not in req:
              return jsonify({"error": "Please specify a prompt parameter"}), 400
          
          prompt = req["prompt"]
          #with autocast("cuda"):
          image = pipe(prompt).images[0]
          buffered = io.BytesIO()
          image.save(buffered, format="PNG")
          image.save(f"test.png")
          img_str = base64.b64encode(buffered.getvalue())
          b = "data:image/png;base64," + str(img_str)[2:-1]

          return jsonify({"image_raw": b})

  except Exception as e:
        return jsonify({"error": e}) 



# Start the Flask server in a new thread
threading.Thread(target=app.run, kwargs={"use_reloader": False}).start()


# if __name__ == "__main__":
#     app.run(debug=True)
import os
import io
import base64
import queue
import threading
import numpy

from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
from pyngrok import ngrok
from flask_cors import CORS

request_queue = queue.Queue()

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
port = 5000



public_url = ngrok.connect(port).public_url
print(" * ngrok tunnel \"{}\" -> \"http://127.0.0.1:{}\"".format(public_url, port))

# Update any base URLs to use the public ngrok URL
app.config["BASE_URL"] = public_url
app.config['UPLOAD_FOLDER'] = 'images/'

def generate_image(prompt):
  try:
    image = pipe(prompt).images[0]
    buffered = io.BytesIO()
    image.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue())
    b = "data:image/png;base64," + str(img_str)[2:-1]
    return b
  except Exception as e:
    return str(e)


def process_requests():
    while True:
      try:
        req, response_queue, status_code = request_queue.get()
        # Process the request here and generate the response
        prompt = req["prompt"]
        response = generate_image(prompt)
        status_code = 200
      except Exception as e:
        response = "Internal server error. Image couldn't be generated"
        status_code = 500

      response_queue.put(response)


@app.route("/", methods = ['GET', 'POST'])
def index():
  try:
      if request.method == "GET":

        return render_template("index.html")

      else:

          status_code = 200

          req = request.get_json()
          prompt = req["prompt"]

          if ("prompt" not in req) or (prompt == ''):
              return jsonify({"error": "Please specify a prompt parameter"}), 400

          response_queue = queue.Queue()
          request_queue.put((req, response_queue, status_code))
          response = response_queue.get()

          if(response[2] == 500):
            return jsonify({"error": "Internal server error"}), 500


          return jsonify({"image_raw": response})

  except Exception as e:
    return jsonify(error=404, text=str(e)), 404


@app.route("/uploadFile", methods = ['POST'])
def upload_file():

  if 'file' not in request.files:
      return jsonify({"error": "No file"}), 400
    
  file = request.files['file']


  if file.filename == '':
      return jsonify({"error": "No file"}), 400

  filename = secure_filename(file.filename)
  
  npimg = numpy.fromstring(file.read(), numpy.uint8)
  print(npimg)
  file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

  return jsonify({"ok": "File stored"}), 200








# if __name__ == "__main__":
app.run()
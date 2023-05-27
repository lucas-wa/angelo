import os
import io
import threading
import base64

from flask import Flask, render_template, request, jsonify, send_file
from pyngrok import ngrok
from flask_cors import CORS


# os.environ["FLASK_DEBUG"] = "True"

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
port = 5000

# Open a ngrok tunnel to the HTTP server
public_url = ngrok.connect(port).public_url
print(" * ngrok tunnel \"{}\" -> \"http://127.0.0.1:{}\"".format(public_url, port))

# Update any base URLs to use the public ngrok URL
app.config["BASE_URL"] = public_url

# ... Update inbound traffic via APIs to use the public-facing ngrok URL


# Define Flask routes
@app.route("/", methods=["GET"])
def index():
  return render_template("index.html")


@app.route("/generateImage", methods = ['POST'])
def generator():

    jsonData = request.get_json()
    prompt = jsonData["prompt"]
#   if request.method == "POST":
#       # img_data = run_inference(prompt)
#       with autocast("cuda"):
#         image = pipe(prompt).images[0]
#       buffered = io.BytesIO()
#       image.save(buffered, format="PNG")
#       img_str = base64.b64encode(buffered.getvalue())
#       b = "data:image/png;base64," + str(img_str)[2:-1]

    return jsonify({"ok": prompt})

# # Start the Flask server in a new thread
# threading.Thread(target=app.run, kwargs={"use_reloader": False}).start()

if __name__ == "__main__":
    app.run()
import queue
from PIL import Image

from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
from pyngrok import ngrok
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
port = 5000

public_url = ngrok.connect(port).public_url
print(" * ngrok tunnel \"{}\" -> \"http://127.0.0.1:{}\"".format(public_url, port))

app.config["BASE_URL"] = public_url
app.config['UPLOAD_FOLDER'] = 'images/'


@app.route("/", methods = ['GET', 'POST'])
def index():

  return render_template("index.html")

#app.run()
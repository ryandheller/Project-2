from flask import Flask, request, url_for
from flask import render_template
import pymongo
from pymongo import MongoClient
import json
from bson import json_util
from bson.json_util import dumps
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'NYT_best_sellers'
COLLECTION_NAME = 'info'
FIELDS = {'Kindle': True, 'title': True, 'Audio': True, 'Harcover': True, 'Paperback': True, 'rank': True, 'author': True, 'date': True, '_id': False}


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/history")
def history():
    return render_template("history.html")

@app.route("/authorSearch")
def authorSearch():
    return render_template("authorSearch.html")

@app.route("/titleSearch")
def titleSearch():
    return render_template("titleSearch.html")
    
@app.route("/price")
def price():
    return render_template("price.html")

@app.route("/nyt/jsondata")
def nyt_jsondata():
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    projects = collection.find(projection=FIELDS)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    connection.close()
    return json_projects

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5000,debug=True)
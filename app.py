from flask import Flask, request, url_for, jsonify
from flask import render_template
import pymongo
from pymongo import MongoClient
import json
from bson import json_util
from bson.json_util import dumps
from flask_cors import CORS

from collections import defaultdict


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


@app.route("/nyt/timesort")
def nyt_timesort():
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    projects = collection.find(projection=FIELDS)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    connection.close()
    return json_projects


@app.route("/nyt/titlesort")
def nyt_titlesort():
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    projects = collection.find(projection=FIELDS)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    sorted_json = sorted(json_projects, key=lambda k: k['title']) 
    print(sorted_json)
    titleDict = defaultdict(list)
    for row in sorted_json:
        booktitle = row.get('title')
        if titleDict[booktitle]:
            titleDict[booktitle]['datapoints'].append(
                {'x': f"new Date({row.get('date')})", 'y': row.get('rank')}
            )
            titleDict[booktitle]['x'].append(
                row.get('date')
            )
            titleDict[booktitle]['y'].append(
                row.get('rank')
            )
        else:
            titleDict[booktitle] = defaultdict(list)
            titleDict[booktitle]['datapoints'].append(
                {'x': f"new Date({row.get('date')})", 'y': row.get('rank')})
            titleDict[booktitle]['x'].append(
                row.get('date')
            )
            titleDict[booktitle]['y'].append(
                row.get('rank')
            )


        titleDict[booktitle]['type'] = 'line'
        titleDict[booktitle]['name'] = booktitle
        titleDict[booktitle]['axisYType'] = 'secondary'
        titleDict[booktitle]['markerSize'] = 0
        titleDict[booktitle]['yValueFormatString'] = '$Y-$m-$d'



    json_projects = json.dumps(json_projects, default=json_util.default)
    connection.close()
    return jsonify(titleDict)
    #    {"data": list(titleDict.values())} 
    #     )

@app.route("/nyt/authorsort")
def nyt_authorsort():
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    projects = collection.find(projection=FIELDS)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    sorted_json = sorted(json_projects, key=lambda k: k['author']) 
    print(sorted_json)
    authorDict = defaultdict(list)
    for row in sorted_json:
      authorName = row.get('author')
      if authorDict[authorName]:
          authorDict[authorName][authorName].append(
          {'book':row.get('title'),'date':row.get('date'),'rank':row.get('rank')}
          )
      else: 
          authorDict[authorName] = defaultdict(list)
          authorDict[authorName][authorName].append(
          {'book':row.get('title'),'date':row.get('date'),'rank':row.get('rank')}
          )
    json_projects = json.dumps(json_projects, default=json_util.default)
    connection.close()
    return jsonify(
       {"data": list(authorDict.values())})


@app.route("/nyt/titlecount")
def nyt_titlecount():
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    projects = collection.find(projection=FIELDS)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    sorted_json = sorted(json_projects, key=lambda k: k['title']) 


    title_count = defaultdict(list)
    for row in sorted_json:
        booktitle = row.get('title')
        if title_count[booktitle]:
            title_count[booktitle]+=1
        else:
            title_count[booktitle] = defaultdict(list)
            title_count[booktitle] = 1
    return jsonify(title_count)

@app.route("/nyt/datecount")
def nyt_datecount():
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    projects = collection.find(projection=FIELDS)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    sorted_json = sorted(json_projects, key=lambda k: k['date']) 


    date_count = []
    for row in sorted_json:
        listdate = row.get('date')
        if listdate not in date_count:
            date_count.append(listdate)
    return jsonify(date_count)

@app.route("/nyt/titlelist")
def nyt_titlelist():
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    projects = collection.find(projection=FIELDS)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    sorted_json = sorted(json_projects, key=lambda k: k['title']) 


    title_list = []
    for row in sorted_json:
        title = row.get('title')
        if title not in title_list:
            title_list.append(title)
    return jsonify(title_list)



if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5000,debug=True)
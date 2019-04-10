from flask import Flask
from flask import render_template

app = Flask(__name__)

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

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5000,debug=True)
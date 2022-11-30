from flask import Flask, request, render_template


app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html')

@app.route('/', methods=['POST'])
def play():
    color = request.form['colors']
    player_name = request.form['player_name']
    return render_template('index.html', color=color, name=player_name)

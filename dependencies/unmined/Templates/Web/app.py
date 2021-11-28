# Flask + Unmined

from flask import Flask, json, render_template, Response, send_file, request
from os.path import join, dirname, realpath

app = Flask(__name__)

ServerChat = []
ServerPlayers = []
ServerMOTD = ""


@app.route('/')
def index():
    global ServerChat
    global ServerPlayers
    global ServerMOTD
    return render_template('unmined.index.html', messages=ServerChat, players=ServerPlayers, motd=ServerMOTD)


@app.route('/leaflet/regions')
def regions():
    f = open(join(dirname(realpath(__file__)),
             "unmined.map.regions.js"), "r", encoding="UTF-8").read()
    return Response(f, mimetype='text/javascript')


@app.route('/leaflet/properties')
def properties():
    f = open(join(dirname(realpath(__file__)),
             "unmined.map.properties.js"), "r", encoding="UTF-8").read()
    return Response(f, mimetype='text/javascript')


@app.route('/tiles/<path:img>')
def get_image(img):
    try:
        filename = join(dirname(realpath(__file__)), f'tiles/{img}')
        return send_file(filename, mimetype='image/png')
    except:
        return {"status": "not found"}


@app.post('/server/SendMessage')
def serverSendMessage():
    global ServerChat
    data = request.json
    ServerChat.append(data)
    return {"status": "success"}


@app.post('/server/SendPlayerList')
def serverSendPlayerList():
    global ServerPlayers
    data = request.json['result']
    ServerPlayers = data
    return {"status": "success"}


@app.post('/server/SendMOTD')
def serverSendMOTD():
    global ServerMOTD
    data = request.json['data']
    ServerMOTD = data
    return {"status": "success"}


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=False)

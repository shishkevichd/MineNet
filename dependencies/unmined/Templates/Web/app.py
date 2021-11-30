# Flask + Unmined

from flask import Flask, render_template, Response, send_file, request, abort
from os.path import join, dirname, realpath

# Setting variables
# ==================================
app = Flask(__name__)
ServerChat = []
ServerPlayers = []
ServerPlayersPositions = []
ServerMOTD = ""
# ==================================


# Routes
# ==================================
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
        return {"status": "not found"}, 404
# ==================================


# API routes
# ==================================

def AuthorizeAction(password):
    f = open(join(dirname(realpath(__file__)),
             "minenet-key.txt"), "r", encoding="UTF-8").read()
    if (password == f):
        return True
    else:
        return False


@app.route('/server/SendMessage', methods=['GET', 'POST'])
def serverSendMessage():
    if (request.method == 'POST'):
        global ServerChat
        if (AuthorizeAction(request.json['key'])):
            data = request.json['data']
            ServerChat.append(data)
            return {"status": "success"}, 200
        else:
            return {"status": "error"}, 403
    else:
        return abort(404)


@app.route('/server/SendPlayerList', methods=['GET', 'POST'])
def serverSendPlayerList():
    if (request.method == 'POST'):
        global ServerPlayers
        global ServerPlayersPositions
        if (AuthorizeAction(request.json['key'])):
            data = request.json['data']
            type = request.json['type']
            if (type == 'list'):
                ServerPlayers = data
                return {"status": "success"}, 200
            elif (type == 'position'):
                ServerPlayersPositions = data
                return {"status": "success"}, 200
        else:
            return {"status": "error"}, 403
    else:
        return abort(404)


@app.route('/server/SendMOTD', methods=['GET', 'POST'])
def serverSendMOTD():
    if (request.method == 'POST'):
        global ServerMOTD
        if (AuthorizeAction(request.json['key'])):
            data = request.json['data']
            ServerMOTD = data
            return {"status": "success"}, 200
        else:
            return {"status": "error"}, 403
    else:
        return abort(404)

# ==================================


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=False)

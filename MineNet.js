var options = {
  enablePlugin: true,
  worldName: "Server",
  outputName: "minenet",
  mapData: {
    zoomIn: 0,
    zoomOut: 6,
  },
  features: {
    Chat: true,
    PlayerList: true,
    PlayerPosition: false,
  },
  customSiteMotd: {
    enable: false,
    motd: "Minecraft Server",
  },
};

var ServerIsStarted = false;
var ServerAPIKey = File.readFrom(`./${options.outputName}/minenet-key.txt`)

class MineMapAPI {
  static getValue(val) {
    if (val === "") return null;

    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }
  }
  static ParseValue(input) {
    var output = {};

    input.split(/[\r\n]+/g).forEach(function (line) {
      if (line[0] === "#" || line.indexOf("=") < 0) return; // just a comment

      var parts = line.split("="),
        key = parts[0].trim(),
        val = parts[1].trim();

      if (!key) return;

      output[key] = MineMapAPI.getValue(val);
    });

    return output;
  }
  static sendMessage(pl, message, type="message") {
    let json = {
      key: ServerAPIKey,
      data: {
        type: type,
        player: pl.realName,
        message: message,
      },
    };
    network.httpPost(
      "http://127.0.0.1:8000/server/SendMessage",
      JSON.stringify(json),
      "application/json",
      function (status, result) {
        return;
      }
    );
  }
  static sendMOTD(motd) {
    let json = {
      key: ServerAPIKey,
      data: motd,
    };
    network.httpPost(
      "http://127.0.0.1:8000/server/SendMOTD",
      JSON.stringify(json),
      "application/json",
      function (status, result) {
        return;
      }
    );
  }
  static sendPlayersList(type = "list") {
    let json, players, arrayWithPlayers;
    
    switch (type) {
      case "list":
        players = mc.getOnlinePlayers();
        arrayWithPlayers = [];
        players.forEach((element) => {
          arrayWithPlayers.push({
            name: element.realName,
            ping: element.getDevice().avgPing,
          });
        });

        json = {
          key: ServerAPIKey,
          type: type,
          data: arrayWithPlayers,
        };
        break;
      case "position":
        players = mc.getOnlinePlayers();
        arrayWithPlayers = [];
        players.forEach((element) => {
          arrayWithPlayers.push({
            name: element.realName,
            pos: {
              x: element.pos.x,
              z: element.pos.z,
              d: element.pos.dimid,
            },
          });
        });

        json = {
          key: ServerAPIKey,
          type: type,
          data: arrayWithPlayers,
        };
        break;
      default:
        break;
    }

    network.httpPost(
      "http://127.0.0.1:8000/server/SendPlayerList",
      JSON.stringify(json),
      "application/json",
      function (status, result) {
        return;
      }
    );
  }
  static startServer() {
    system.cmd(
      `start python ./${options.outputName}/app.py`,
      function (exitcode, output) {
        return;
      }
    );
  }
  static createApiKey() {
    if (!File.exists(`./${options.outputName}/minenet-key.txt`)) {
      let r = (Math.random() + 1).toString(16).substring(7);
      File.writeTo(`./${options.outputName}/minenet-key.txt`, data.toSHA1(r));
    }
  }
  static buildMap(first = false) {
    system.newProcess(
      `./plugins/dependencies/unmined/unmined-cli.exe web render --zoomin=${options.mapData.zoomIn} --zoomout=${options.mapData.zoomOut} --world="./worlds/${options.worldName}" --output="./${options.outputName}"`,
      function (exitcode, output) {
        logger.info(
          `The process 'unmined-cli.exe' came out with code ${exitcode}.`
        );
        if (exitcode === 0) {
          if (first) {
            if (!ServerIsStarted) {
              logger.info(
                "The map was successfully created, the web server starts."
              );
              ServerIsStarted = true;
              MineMapAPI.startServer();
            }
          }
        } else {
          logger.info("Failed to initialize MineMap, server shuts down.");
          mc.runcmdEx("stop");
        }
      }
    );
  }
}

if (options.enablePlugin) {
  MineMapAPI.createApiKey();
  logger.info('Running "unmined-cli.exe". Please, wait');
  MineMapAPI.buildMap(true);

  setInterval(() => {
    let x = String(File.readFrom("./server.properties"));
    let y = MineMapAPI.ParseValue(x);
    if (!ServerIsStarted) {
      if (options.customSiteMotd.enable) {
        MineMapAPI.sendMOTD(options.customSiteMotd.motd);
      } else {
        MineMapAPI.sendMOTD(
          y["server-name"].replace(/\u00A7[0-9A-FK-OR]/gi, "")
        );
      }
    }
  }, 1000);

  if (options.features.Chat) {
    mc.listen("onChat", function (pl, msg) {
      MineMapAPI.sendMessage(pl, msg);
    });
  }

  if (options.features.PlayerList) {
    setInterval(() => {
      MineMapAPI.sendPlayersList();
    }, 5000);
  }

  setInterval(() => {
    logger.info('Running "unmined-cli.exe". Please, wait');
    MineMapAPI.buildMap();
  }, 1800000);

  setTimeout(() => {
    if (File.exists(`./${options.outputName}`) && !ServerIsStarted) {
      ServerIsStarted = true;
      MineMapAPI.startServer();
    }
  }, 15000);
}

mc.regConsoleCmd("minenet", "MineNet - reload map", function (args) {
  log("Reload MineNet, please wait...");
  MineMapAPI.buildMap();
});

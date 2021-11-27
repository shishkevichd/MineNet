var options = {
  enablePlugin: true,
  worldName: "Server",
  mapData: {
    zoomIn: 0,
    zoomOut: 6,
  },
};

class MineMapAPI {
  static sendMessage(pl, message) {
    let json = {
      player: pl.realName,
      message: message,
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
  static sendPlayersList() {
    let players = mc.getOnlinePlayers();
    let arrayWithPlayers = [];
    players.forEach((element) => {
      arrayWithPlayers.push({
        name: element.realName,
        ping: element.getDevice().avgPing,
        maxHealth: element.maxHealth,
        health: element.health,
      });
    });

    let x = { result: arrayWithPlayers };

    network.httpPost(
      "http://127.0.0.1:8000/server/SendPlayerList",
      JSON.stringify(x),
      "application/json",
      function (status, result) {
        return;
      }
    );
  }
}

if (options.enablePlugin) {
  logger.info('Running "unmined-cli.exe". Please, wait');
  system.newProcess(
    `./plugins/dependencies/unmined/unmined-cli.exe web render --zoomin=${options.mapData.zoomIn} --zoomout=${options.mapData.zoomOut} --world="./worlds/${options.worldName}" --output="./output"`,
    function (exitcode, output) {
      if (exitcode === 0) {
        logger.info("The map was successfully created, the web server starts.");
        logger.info("Web server started, check new window!");
        system.cmd(`start python ./output/app.py`, function (exitcode, output) {
          return;
        });
      } else {
        logger.info("Failed to initialize MineMap, server shuts down.");
        mc.runcmdEx("stop");
      }
    }
  );

  mc.listen("onChat", function (pl, msg) {
    MineMapAPI.sendMessage(pl, msg);
  });

  setInterval(() => {
    MineMapAPI.sendPlayersList()
  }, 5000);
}

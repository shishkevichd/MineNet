/**
 *
 * Default stylesheet for uNmINeD.
 *
 *
 * Language: JavaScript running on Jint 3.x
 * See https://github.com/sebastienros/jint for supported language features.
 *
 *
 */

var STYLESHEET = {
    name: "uNmINeD default terrain map style",
    settings: function (s) {
        s.bool(SETTING.flowerColoring, "Flower coloring", true);
        s.bool(SETTING.oreColoring, "Ore coloring", true);
        s.bool(SETTING.dyeColoring, "Dye coloring", true);
        s.bool(SETTING.myceliumColoring, "Mycelium coloring", true);
        s.bool(SETTING.useUnderground, "Different underground", true);
    },
    main: function (b) {
        addMinecraftColors(b);
        addTerrainColors(b);

        addDefaultStyles(b);

        if (b.s[SETTING.flowerColoring]) addFlowerStyles(b);
        if (b.s[SETTING.oreColoring]) addOreStyles(b);

        //add your styles here
    }
};

var SETTING = {
    flowerColoring: "flowerColoring",
    oreColoring: "oreColoring",
    dyeColoring: "dyeColoring",
    myceliumColoring: "myceliumColoring",
    useUnderground: "useUnderground",
};

// Colors for colored blocks (wool, concrete, carpet, etc.)
function addMinecraftColors(b) {
    b.color("mc.white", 0, 0, 90);
    b.color("mc.orange", 24, 80, 60);
    b.color("mc.magenta", 300, 70, 70);
    b.color("mc.light_blue", 204, 70, 70);
    b.color("mc.yellow", 48, 70, 70);
    b.color("mc.lime", 96, 80, 60);
    b.color("mc.pink", 336, 70, 70);
    b.color("mc.gray", 0, 0, 35);
    b.color("mc.light_gray", 0, 0, 50);
    b.color("mc.cyan", 180, 70, 40);
    b.color("mc.purple", 276, 70, 40);
    b.color("mc.blue", 240, 70, 40);
    b.color("mc.brown", 36, 70, 40);
    b.color("mc.green", 96, 70, 40);
    b.color("mc.red", 0, 70, 40);
    b.color("mc.black", 0, 0, 10);
}

// Colors for terrain
function addTerrainColors(b) {
    b.color("map.ice", 190, 50, 70);
    b.color("map.snow", 0, 0, 90);
    b.color("map.dirt", 48, 40, 40);
    b.color("map.lava", 18, 90, 50); // adjusted to match MC texture
    //b.color("map.water", 214, 95, 45);
    //b.color("map.water.deep", 234, 90, 40);
    b.color("map.water", 214, 90, 40);
    b.color("map.water.magic", 180, 75, 50);
    b.color("map.water.poison", 168, 70, 50);
    b.color("map.sand", 48, 35, 70);
    b.color("map.salt", 48, 10, 90);
    b.color("map.redsand", 24, 70, 45);
    b.color("map.terracotta", 18, 45, 60);
    b.color("map.gravel", 36, 10, 60);
    b.color("map.darkrock", 0, 0, 20);

    b.color("map.land", 78, 100, 35);
    b.color("map.vegetation", 75, 60, 40);
    b.color("map.grass", 84, 90, 35);
    b.color("map.leaves", 102, 90, 23);
    b.color("map.flower", 96, 60, 60);

    b.color("map.land.underground", 36, 60, 50);

    b.color("map.flower.red", 0, 90, 60);
    b.color("map.flower.yellow", 54, 90, 60);
    b.color("map.flower.blue", 204, 90, 60);
    b.color("map.flower.purple", 282, 90, 60);
    b.color("map.flower.white", 0, 0, 95);


    b.color("map.netherrack", 0, 60, 25); // adjusted to match MC texture
    b.color("map.soulsand", 24, 30, 25); // adjusted to match MC texture
    b.color("map.netherwart", 0, 70, 40); // adjusted to match MC texture
    b.color("map.warpedwart", 180, 70, 30); // adjusted to match MC texture

    b.color("map.mountain", 36, 90, 30);
    b.color("map.mountain.sand", 48, 40, 70);
    b.color("map.mountain.salt", 48, 10, 80);
    b.color("map.mountain.redsand", 36, 50, 70);
    b.color("map.mountain.rock", 0, 0, 60);

    b.color("map.mud", 36, 60, 25);
    b.color("map.path", 36, 50, 30);

    b.color("map.artificial", 0, 0, 80);
    b.color("map.light", 54, 100, 60);
    b.color("map.rail", 42, 100, 50);
    b.color("map.fire", 24, 100, 60);
    b.color("map.circuit", 0, 70, 50);
    b.color("map.cobweb", 0, 0, 80);

    b.color("map.wood", 42, 50, 50);
    b.color("map.stone", 0, 0, 70);
    b.color("map.rock", 0, 0, 70);
    b.color("map.crops", 42, 60, 40);

    b.color("map.mycelium", 282, 20, 35);
    b.color("map.mushroom.red", 0, 70, 30);
    b.color("map.mushroom.brown", 48, 60, 30);

    b.gradient("land")
        .step(b.altitude.sea, "map.land")
        .step(b.altitude.mountain, "map.mountain");

    b.gradient("land.sand")
        .step(b.altitude.sea, "map.sand")
        .step(b.altitude.mountain, "map.mountain.sand");

    b.gradient("land.salt")
        .step(b.altitude.sea, "map.salt")
        .step(b.altitude.mountain, "map.mountain.salt");

    b.gradient("land.redsand")
        .step(b.altitude.sea, "map.redsand")
        .step(b.altitude.mountain, "map.mountain.redsand");

    b.gradient("land.rock")
        .step(b.altitude.sea, "map.rock")
        .step(b.altitude.mountain, "map.mountain.rock");

    b.curve("land.lightness.elevation")
        .point(b.altitude.min, -0.15)
        .point(b.altitude.sea - 32, -0.10)
        .point(b.altitude.sea, -0.0)
        .point(b.altitude.sea + 32, -0.10)
        .point(b.altitude.max, -0.15);
}


function addOreStyles(b) {
    b.style("coal_ore").color(0, 0, 70);
    b.style("copper_ore").color(24, 60, 40);
    b.style("diamond_ore").color(180, 60, 40);
    b.style("emerald_ore").color(150, 60, 40);
    b.style("gold_ore").color(48, 60, 40);
    b.style("iron_ore").color(36, 40, 40);
    b.style("lapis_ore").color(240, 40, 40);
    b.style("nether_gold_ore").color(48, 80, 60);
    b.style("nether_quartz_ore").color(0, 0, 80);
    b.style("redstone_ore").color(0, 40, 40);
}

function addDefaultStyles(b) {
    b.style("#artificial").color("map.artificial");
    b.style("#light").color("map.light");

    b.style("#ground").colorByElevation("land").lightnessByElevation("land.lightness.elevation");
    b.style("#ground #sand").colorByElevation("land.sand").lightnessByElevation("land.lightness.elevation");
    b.style("#ground #salt").colorByElevation("land.salt").lightnessByElevation("land.lightness.elevation");
    b.style("#ground #redsand").colorByElevation("land.redsand").lightnessByElevation("land.lightness.elevation");
    b.style("#ground #rock, #ore, #crystal").colorByElevation("land.rock")
        .lightnessByElevation("land.lightness.elevation");
    b.style("#ground #terracotta").lightnessByElevation("!");

    b.style("#ground #mud").color("map.mud");
    b.style("#ice").color("map.ice");
    b.style("#snow").color("map.snow");
    b.style("#dirt").color("map.dirt");

    if (b.s[SETTING.myceliumColoring]) {
        b.style("#mycelium").color("map.mycelium");
    }

    b.style("#water").color("map.water");

    b.style("#water.poison").color("map.water.poison");
    b.style("#water.magic").color("map.water.magic");

    b.style("#vegetation").color("map.vegetation");
    b.style("#leaves, #vine, #bush").color("map.leaves");
    b.style("#grass").color("map.grass");

    b.style("#fauna").color("map.cobweb");

    b.style("#mushroom.brown, #mushroom").color("map.mushroom.brown");
    b.style("#mushroom.red").color("map.mushroom.red");

    b.style("#flower").color("map.flower");


    b.style("#artificial #stone").color("map.stone");
    b.style("#artificial #rail").color("map.rail");
    b.style("#artificial #wooden").color("map.wood");
    b.style("#artificial #crops").color("map.crops");
    b.style("#circuit").color("map.circuit");


    b.style("#light").color("map.light").lightnessByElevation("!");
    b.style("#fire").color("map.fire").lightnessByElevation("!");
    b.style("#lava").color("map.lava").lightnessByElevation("!");

    b.style("minecraft:terracotta").color("map.terracotta"); //.lightnessByElevation("!");

    b.curve("lightness.elevation.underground")
        .point(b.altitude.min, -0.35)
        .point(b.altitude.sea, -0.0)
        .point(b.altitude.max, +0.10);

    if (b.isOverworld) {
        if (b.s[SETTING.useUnderground]) {
            b.style("#ground")
                .undergroundOnly()
                .color("map.land.underground")
                .lightnessByElevation("lightness.elevation.underground");
        }
    }

    if (b.s[SETTING.dyeColoring]) {
        b.style("#white").color("mc.white");
        b.style("#orange").color("mc.orange");
        b.style("#magenta").color("mc.magenta");
        b.style("#light_blue").color("mc.light_blue");
        b.style("#yellow").color("mc.yellow");
        b.style("#lime").color("mc.lime");
        b.style("#pink").color("mc.pink");
        b.style("#gray").color("mc.gray");
        b.style("#light_gray").color("mc.light_gray");
        b.style("#cyan").color("mc.cyan");
        b.style("#purple").color("mc.purple");
        b.style("#blue").color("mc.blue");
        b.style("#brown").color("mc.brown");
        b.style("#green").color("mc.green");
        b.style("#red").color("mc.red");
        b.style("#black").color("mc.black");
    }

    b.style("#terracotta")
        .adjustSaturation(0.90)
        .adjustLightness(0.75);

    b.style("#path").color("map.path");

    b.style("nether_wart_block, crimson_* #natural").color("map.netherwart");
    b.style("warped_wart_block, warped_* #natural").color("map.warpedwart");
    b.style("netherrack").color("map.netherrack");
    b.style("#soul #ground").color("map.soulsand");
    b.style("#darkrock, #darkstone").color("map.darkrock");
    b.style("#gravel").color("map.gravel");
    b.style("#magma").color("map.lava").adjustLightness(0.7);

    if (b.isNether()) {
        b.style("#dirt").color("map.dirt");
    }

}

function addFlowerStyles(b) {
    b.style("#flower.red").color("map.flower.red");
    b.style("#flower.yellow").color("map.flower.yellow");
    b.style("#flower.blue").color("map.flower.blue");
    b.style("#flower.purple").color("map.flower.purple");
    b.style("#flower.white").color("map.flower.white");
}
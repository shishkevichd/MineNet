/**
 *
 * Default block tags for uNmINeD.
 *
 *
 * Language: JavaScript running on Jint 3.x
 * See https://github.com/sebastienros/jint for supported language features.
 *
 * Notes:
 *
 * 1. Namespaces
 *
 *      If namespace is not specified, it is interpreted as "minecraft:".
 *
 *      Example:
 *          "acacia_*" means "minecraft:acacia_*"
 
  * 2. Logical operations
 * 
 *      Comma (",") between values means logical OR
 *      Space (" ") between values means logical AND
 *      Exclamation mark ("!") before a value means logical NOT
 *
 *      Examples:
 *
 *          "lava, water" means "lava" or "water" (matches minecraft:lava and minecraft:water)
 *          "*sand !red_sand" means "*sand" and not "red_sand" (matches any vanilla block name ends with "sand" except "minecraft:red_sand")
 *
 * 3. Wildcards
 *
 *      Wildcards "*" and "?" can be used for matching block names (but not for matching #tags).
 *
 * 4. Double asterix
 *
 *      "**x" is a shortcut for "*:*x, *:*_x"
 *
 *      Example:
 *
 *          "**lava" is interpreted as "*:*lava, *:*_lava", so it matches "minecraft:lava" and "minecraft:flowing_lava"
 *
 *
 */


var STYLESHEET = {
    name: "uNmINeD default block tags",
    main: function (b) {
        addAir(b);

        addTerrain(b);
        addFormations(b);
        addWeather(b);
        addFlora(b);
        addFauna(b);

        addProducts(b);
        addProductMaterials(b);
        addCrafting(b);
        addGlasses(b);
        addLights(b);
        addCircuit(b);
        addOtherArtificial(b);
        addUnsortedArtificial(b);

        addColors(b);
        addTechnical(b);
    }
}


function addAir(b) {
    b.tag("#air").apply("*:air, *:*_air");
}

function addTerrain(b) {
    b.tag("#terrain, #ground").apply(b => {

        b.tag("#mycelium").apply("mycelium");
        b.tag("#dirt").apply("**dirt");
        b.tag("#grassblock").apply("grass_block");
        b.tag("#soil").apply("#mycelium, #dirt, **podzol, **soil, harddirt");

        b.tag("#ore").apply("*_ore, ancient_debris");
        b.tag("#rock").apply("bedrock, andesite, basalt, smooth_basalt, diorite, calcite, granite, obsidian, crying_obsidian, tuff, stone, grimstone, deepslate, netherrack, *:*_nylium, end_stone, *:cragrock");
        b.tag("#rock").apply("infested_stone, infested_deepslate");
        b.tag("#darkrock").apply("bedrock, basalt, obsidian, crying_obsidian");


        b.tag("#gravel").apply("gravel");
        b.tag("#mud").apply("*:mud");
        b.tag("#clay").apply("clay");
        b.tag("#magma").apply("magma, magma_block");

        b.tag("#soulsand").apply("soul_sand");
        b.tag("#soul").apply("soul_soil, #soulsand");
        b.tag("#sand").apply("**sand !red_sand !soul_sand, sandstone, hardsand");
        b.tag("#redsand").apply("red_sand, red_sandstone");
        b.tag("#rock").apply("sandstone, red_sandstone");
        b.tag("#sands").apply("#soulsand, #redsand, #sand");

        b.tag("#salt").apply("*:dried_salt");

        b.tag("#path").apply("grass_path, dirt_path");

        b.tag("#terracotta").apply("**terracotta");

    }).natural().blocking();
}

function addFormations(b) {
    b.tag("#dripstone,#ground").apply("dripstone_block, pointed_dripstone").natural().nonblocking();
    
    b.tag("#amethyst").apply("*_amethyst_bud, amethyst_cluster").natural().nonblocking();
    b.tag("#amethyst, #ground").apply("amethyst_block, budding_amethyst").natural().blocking();
    b.tag("#crystal").apply("#amethyst");
}

function addWeather(b) {
    b.tag("#water").apply([
        "**water",
        "*:bubble_column"
    ]).natural().fluid();;

    b.tag("#water.poison").apply("*:poison").natural().fluid();
    b.tag("#lava").apply("**lava").natural().fluid();
    b.tag("#ice").apply("**ice").natural().blocking();
    b.tag("#snow").apply("**snow, **snow_layer").nonblocking().natural();;
    b.tag("#snow").apply("**snow_block").natural().blocking();
    b.tag("#fire").apply("**fire").natural().nonblocking();
}

function addFlora(b) {

    // blocking
    b.tag("#flora").natural().blocking().apply(b => {
        b.tag("#leaves").apply("**leaves,**leaves?,**leaves_?,**foliage,biomesoplenty:petals");
        b.tag("#log").apply("**log,**log?,**logs?");
        b.tag("#mushroom.brown").apply("brown_mushroom_block");
        b.tag("#mushroom.red").apply("red_mushroom_block");
        b.tag("#mushroom").apply("#mushroom.brown, #mushroom.red");
        b.tag("#mushroom").apply("shroomlight");
        b.tag("#bush").apply("azalea,flowering_azalea,big_dripleaf,moss_block");
    });

    b.tag("#flora").natural().blocking().apply("*:bamboo, *:cactus, *:sugar_cane, reeds, *:chorus_plant, *:reed");

    // non-blocking
    b.tag("#flora").natural().nonblocking().apply(b => {

        b.tag("#sapling").apply("**sapling");
        b.tag("#stem").apply("**stem");
        b.tag("#sprout").apply("**sprout, **sprouts");
        b.tag("#flower").apply(
            "**flower,**flowers,**flowers?,**flower_?,**flower?,*:plant_?,*:plant?,*:moss,*:double_plant, **allium, **bluet, **orchid, **dandelion, **lavender, **lilac, lily_of_the_valley, **lily_pad, **hibiscus, **tulip, **lily, **daisy, **peony, **poppy, **rose, **violet",
            "spore_blossom");
        
        b.tag("#flower.red").apply("*:red_* #flower, poppy, rose_bush");
        b.tag("#flower.yellow").apply("*:yellow_* #flower, dandelion, sunflower");
        b.tag("#flower.blue").apply("*:blue_* #flower, cornflower");
        b.tag("#flower.purple").apply("*:purple_* #flower, lilac, peony, allium");
        b.tag("#flower.white").apply("*:white_* #flower, oxeye_daisy");


        b.tag("#mushroom").apply("*:*_fungus, **mushroom, **mushroom?");
        b.tag("#grass").apply("**roots, **wart, *:barley, **bush, moss_carpet");

        b.tag("#lichen").apply("**lichen");

        b.tag("#grass").apply("**grass, small_dripleaf, **fern");
        b.tag("#seagrass").apply("**seagrass");
        b.tag("#kelp").apply("**kelp, **kelp_plant");
        b.tag("#vine").apply("**vine, **vines, **vines_plant, *:ivy, *:treemoss, *:willow");

        b.tag("#fruit").apply("cocoa, melon, pumpkin");
    });


    // alias
    b.tag("#vegetation").apply("#flora");
}

function addFauna(b) {
    b.tag("#corals").natural().nonblocking().apply(b => {
        b.tag("#coral").apply("**coral");
        b.tag("#coral_fan").apply("**coral_fan, coral_fan_hang, coral_fan_hang?, coral_fan_dead");
        b.tag("#coral_wall_fan").apply("*:*_coral_wall_fan");
        b.tag("#coral_block").apply("**coral_block");
    });

    b.tag("#fauna").apply("*:cobweb, *:web, *:*_nest, *:*_egg, sea_pickle, slime").natural().nonblocking();
    b.tag("#fauna").apply("#corals");
}

function addProducts(b) {

    b.tag("#artificial, #product").artificial().blocking().apply((b) => {
        b.tag("#door").apply("*:*_door");
        b.tag("#fence").apply("**fence");
        b.tag("#fence_gate").apply("**fence_gate");
        b.tag("#planks").apply("**planks");
        b.tag("#slab").apply("*:*_slab, *:*_slab?");
        b.tag("#stairs").apply("*:*_stairs");
        b.tag("#wood").apply("**wood, *:*_hyphae");
    });

    b.tag("#artificial, #product").artificial().nonblocking().apply((b) => {
        b.tag("#button").apply("*:*_button");
        b.tag("#pressure_plate").apply("*:*_pressure_plate");
        b.tag("#sign").apply("*:*_sign, chalkboard");
        b.tag("#trapdoor").apply("**trapdoor");
        b.tag("#wall_sign").apply("*:*_wall_sign");
        b.tag("#banner").apply("*:*_banner");
        b.tag("#wall_banner").apply("*:*_wall_banner");
    });
}

function addProductMaterials(b) {
    b.tag("#wooden").apply([
        "*:acacia_* !#natural",
        "*:birch_* !#natural",
        "*:dark_oak_* !#natural",
        "*:jungle_* !#natural",
        "*:oak_* !#natural",
        "*:petrified_oak_* !#natural",
        "*:spruce_* !#natural",
    ]).artificial();

    b.tag("#stone").apply([
        "*:stone_* !#natural",
        "*:deepslate_* !#natural",
        "*:grimstone_* !#natural",
        "*:sandstone_* !#natural",
        "*:red_sandstone_* !#natural",
        "*:granite_* !#natural",
        "*:diorite_* !#natural",
        "*:andesite_* !#natural",
        "*:nether_brick_* !#natural",
        "*:prismarine_* !#natural",
        "*:purpur_* !#natural",
        "*:cobbled_*"
        
    ]).artificial();
}

function addGlasses(b) {
    b.tag("#glasses").artificial().blocking().apply(b => {
        b.tag("#glass").apply("**glass, *:tinted_glass");
        b.tag("#stained_glass").apply("*:*_stained_glass");
        b.tag("#glass_pane").apply("**glass_pane");
        b.tag("#stained_glass_pane").apply("*:*_stained_glass_pane");
    });
}

function addLights(b) {
    b.tag("#torch").apply("**torch");
    b.tag("#light").apply("#torch").artificial().nonblocking();
    b.tag("#light").apply("**lamp, **lantern, seaLantern, lit_pumpkin").artificial().blocking();
    b.tag("#light").apply("**glowstone").natural().blocking();
}

function addCircuit(b) {
    b.tag('#circuit, #piston').apply("*:piston_head, **piston").artificial().blocking();
    b.tag('#circuit, #piston').apply("pistonArmCollision, stickyPistonArmCollision, movingBlock").artificial().blocking(); // Bedrock

    b.tag("#circuit").apply([
        "dispenser",
        "dropper",
        "hopper",
        "lightning_rod",
        "observer",
        "redstone_lamp",
        "redstone_wire",
        "**repeater",
        "tripwire_hook",
        "tripWire"
    ]).artificial().blocking();

    b.tag("#circuit").apply([
        "**comparator",
        "daylight_detector*",
        "lever",
        "lightning_rod",
        "redstone_torch",
        "redstone_wire",
        "**repeater",
        "sculk_sensor",
        "tripwire",
    ]).artificial().nonblocking();
}

function addCrafting(b) {
    b.tag("#crafting").apply("*:*_table, brewing_stand, **furnace, grindstone, loom, anvil, composter, smoker, stonecutter, soul_campfire, campfire").artificial().blocking();
    b.tag("#crops").apply("*crops, *:farmland, **wheat, **potatoes, **beetroots, **beetroot, **carrots").artificial().nonblocking();
}

function addUnsortedArtificial(b) {
    b.tag("#artificial").blocking().apply([
        "note_block", // JE
        "noteblock",  // BE
        "allow",  // BE
        "deny",  // BE
        "frame",
        "barrel",
        "beacon",
        "bed",
        "beehive",
        "bell",
        "bookshelf",
        "carved_pumpkin",
        "chain,conduit",
        "chest",
        "chipped_anvil",
        "composter",
        "damaged_anvil",
        "end_gateway",
        "end_portal",
        "end_portal_frame",
        "end_rod",
        "ender_chest",
        "flower_pot",
        "glowstone",
        "iron_bars",
        "jukebox",
        "ladder",
        "lectern",
        "lodestone",
        "nether_portal",
        "respawn_anchor",
        "scaffolding",
        "skeleton_skull",
        "skeleton_wall_skull",
        "skull",
        "spawner",
        "mob_spawner", // BE
        "sponge",
        "target",
        "tnt",
        "trapped_chest",
        "wet_sponge",
        "wither_skeleton_skull",
    ]);
}

function addOtherArtificial(b) {
    b.tag("#stone").blocking().artificial().apply([
        "**cobblestone",
        "**prismarine",
        "**blackstone",
        "stonebrick",
        "nether_brick",
        "red_nether_brick",
    ]);

    b.tag("#darkstone").apply([
        "#artificial *blackstone*"
    ]);



    b.tag("#artificial").blocking().apply(b => {
        b.tag("#candle").apply("*:*_candle");
        b.tag("#cake").apply("*:cake");
        b.tag("#candle_cake").apply("**candle_cake");

        b.tag("#concrete").apply("**concrete");
        b.tag("#concrete_powder").apply("**concrete_powder, concretePowder");
        b.tag("#wall").apply("*:*_wall");
        b.tag("#bricks").apply("*bricks");
        b.tag("#wool").apply("**wool");
        b.tag("#bed").apply("*:*_bed");
        b.tag("#potted,-#flower").apply("*:potted_*");
        b.tag("#head").apply("*:*_head");
        b.tag("#shulker_box").apply("*shulker_box");

        b.select("*:*_glazed_terracotta").tag("#glazed_terracotta, -#terracotta");
    });

    b.tag("#artificial").nonblocking().apply(b => {
        b.tag("#rail").apply("**rail");
        b.tag("#carpet").apply("**carpet !#natural");
    });

    b.select([
        "*:chiseled_*",
        "*:stained_*",
        "*:hardened_*",
        "*:polished_*",
        "*:waxed_*",
        "*:cut_*",
        "*:_cut_copper",
        "*:smooth_* !*:smooth_basalt",
        "*:stripped_*",
        "*:*_pillar",
        "**cauldron"]).artificial().blocking();


    b.select("*:*_block").blocking();
    b.select("*:*_block !#natural").artificial();
}

function addColors(b) {
    b.tag("#white").apply("*:white_* #artificial, *:white_* #terracotta");
    b.tag("#orange").apply("*:orange_* #artificial, *:orange_* #terracotta");
    b.tag("#magenta").apply("*:magenta_* #artificial, *:magenta_* #terracotta");
    b.tag("#light_blue").apply("*:light_blue_* #artificial, *:light_blue_* #terracotta");
    b.tag("#yellow").apply("*:yellow_* #artificial, *:yellow_* #terracotta");
    b.tag("#lime").apply("*:lime_* #artificial, *:lime_* #terracotta");
    b.tag("#pink").apply("*:pink_* #artificial, *:pink_* #terracotta");
    b.tag("#gray").apply("*:gray_* #artificial, *:gray_* #terracotta");
    b.tag("#light_gray").apply("*:light_gray_* #artificial, *:light_gray_* #terracotta");
    b.tag("#cyan").apply("*:cyan_* #artificial, *:cyan_* #terracotta");
    b.tag("#purple").apply("*:purple_* #artificial, *:purple_* #terracotta");
    b.tag("#blue").apply("*:blue_* #artificial, *:blue_* #terracotta");
    b.tag("#brown").apply("*:brown_* #artificial, *:brown_* #terracotta");
    b.tag("#green").apply("*:green_* #artificial, *:green_* #terracotta");
    b.tag("#red").apply("*:red_* #artificial, *:red_* #terracotta");
    b.tag("#black").apply("*:black_* #artificial, *:black_* #terracotta");
    
    //todo minecraft:concrete and other legacy blocks
}

function addTechnical(b) {
    b.tag("#technical").apply("**command_block, **structure_block, *:structure_void").nonblocking();
    b.tag("#technical").apply("barrier, jigsaw").blocking();
}

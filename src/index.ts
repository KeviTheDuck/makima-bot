const axios = require("axios");
const { Client, LocalAuth, MessageMedia }: any = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const fs = require("file-system");
const mime = require("mime-types");
const RedditImageFetcher = require("reddit-image-fetcher");
const Anime = require("anime-api");
const { image_search_generator } = require("duckduckgo-images-api");
import { getWaifuPics } from "./webRequest";
import { helpSection } from "./help";

const client = new Client({
    puppeteer: {
        args: ["--no-sandbox"],
    },
    authStrategy: new LocalAuth(),
});

client.on("qr", (qr: any) => {
    qrcode.generate(qr, { small: true });
});
client.on("ready", () => {
    console.log("Woof for me");
});

async function TopAnime(): Promise<string> {
    return new Promise<string>(
        (resolve) => resolve(Anime.TopData(10)) // The number required to collect ِTop Anime //The maximum is 50;
    );
}

client.on("message", (message: any) => {
    console.log(message.id.remote, ":", message.body);
    // SQL structure: ID, message,author, messageFrom, messageTo, dateTime
    //insertMessages(message.body, message.author, message.from, message.to)
});

client.on("message", async (message: any) => {
    let msgSplit = message.body.split(" ");

    if (msgSplit.includes("woof")) {
        // add the number of woofs in the db
        message.reply("You earned a squueze");
    }

    if (msgSplit.includes("-sticker")) {
        if (message.hasMedia) {
            message.downloadMedia().then((media: any) => {
                if (media) {
                    const mediaPath = "./upload/";

                    if (!fs.existsSync(mediaPath)) {
                        fs.mkdirSync(mediaPath);
                    }
                    const extension = mime.extension(media.mimetype);
                    const filename = new Date().getTime();
                    const fullFilename = mediaPath + filename + "." + extension;

                    // Save to file
                    var stickerName = "Makima's collection";
                    if (message.body.split(" ")[1]) {
                        stickerName = message.body.split(" ")[1];
                    }
                    try {
                        fs.writeFileSync(fullFilename, media.data, {
                            encoding: "base64",
                        });
                        //console.log('File downloaded successfully!', fullFilename);
                        //console.log(fullFilename);

                        MessageMedia.fromFilePath(fullFilename);
                        client.sendMessage(
                            message.from,
                            new MessageMedia(
                                media.mimetype,
                                media.data,
                                filename
                            ),
                            {
                                sendMediaAsSticker: true,
                                stickerAuthor: "makima",
                                stickerName: stickerName,
                            }
                        );
                        //fs.unlinkSync(fullFilename)
                        //console.log(`File Deleted successfully!`);
                    } catch (err) {
                        console.log("Failed to save the file:", err);
                        console.log(`File Deleted successfully!`);
                    }
                }
            });
        }
    }

    if (message.body === "-meme") {
        //get media from url
        var meme_url: string = "";
        await RedditImageFetcher.fetch({
            type: "meme",
        }).then((result: any) => {
            meme_url = result[0].image;
        });
        const media = await MessageMedia.fromUrl(meme_url);
        await meme_url;
        await client.sendMessage(message.from, media, {
            
        }); 
    }

    if (message.body === "-top-anime") {
        let data: any = await TopAnime();
        client.sendMessage(
            message.from,
            `Top Animes: \n1. ${data[0]}\n2. ${data[1]}\n3. ${data[2]}\n4. ${data[3]}\n5. ${data[4]}\n6. ${data[5]}\n7. ${data[6]}\n8. ${data[7]}\n9. ${data[8]}\n10. ${data[9]}\n`
        );

        // ***HENTAI***
    }

    if (message.body === "-joe") {
        axios
            .get("https://api.yomomma.info/")
            .then((response: { data: any }) => {
                var momJoke = response.data;
                client.sendMessage(message.from, momJoke.joke);
            })
            .catch(function (error: any) {
                // handle error
                console.log(error);
            });
    }

    if (message.body === "-joke") {
        await axios
            .get(
                "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky?type=twopart"
            )
            .then((response: { data: { setup: string; delivery: string } }) => {
                client.sendMessage(
                    message.from,
                    response.data.setup + response.data.delivery
                );
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }

    if (message.body === "-vromo") {
        //message.reply("The command is unavailable for now");
        await axios
            .get("https://indian-jokes-api.herokuapp.com/jokes/random")
            .then((res: { data: { text: any } }, err: any) => {
                if (err) message.reply("The command is unavailable for now");
                var data = res.data.text;
                client.sendMessage(message.from, data);
            });
    }
    // if (message.body === "-dad") {

    // }

    if (msgSplit.includes("-hentai")) {
        if (message.id.remote != "120363026329162763@g.us") {
            //console.log(msgSplit)
            /**
             * catgeories available:
             *      waifu
             *      neko
             *      trap
             *      blowjob
             */
            const categories = ["waifu", "neko", "trap", "blowjob"];

            if (categories.includes(msgSplit[1])) {
                const media = await MessageMedia.fromUrl(
                    await getWaifuPics("nsfw", msgSplit[1])
                );
                //replying with media
                await client.sendMessage(message.from, media);
            } /*else if (categories.includes(msgSplit[1]))
                message.reply("BOT error, please try the command later");*/ else
                message.reply(
                    "Category doesn't exist.\ncheck for any typos\n\nAvailable categories:```\nwaifu\nneko\ntrap\nblowjob\n```"
                );
        } else message.reply("Command disabled for the current group");
    }

    if (msgSplit.includes("-waifu")) {
        const categories = [
            "neko",
            "shinobu",
            "megumin",
            "bully",
            "cuddle",
            "cry",
            "hug",
            "awoo",
            "kiss",
            "lick",
            "pat",
            "smug",
            "bonk",
            "yeet",
            "blush",
            "smile",
            "wave",
            "highfive",
            "handhold",
            "nom",
            "bite",
            "glomp",
            "slap",
            "kill",
            "kick",
            "happy",
            "wink",
            "poke",
            "dance",
            "cringe",
        ];
        if (categories.includes(msgSplit[1])) {
            const media = await MessageMedia.fromUrl(
                await getWaifuPics("sfw", msgSplit[1])
            );
            //replying with media
            await client.sendMessage(message.from, media);
        } else if (msgSplit[1] == undefined) {
            const media = await MessageMedia.fromUrl(
                await getWaifuPics("sfw", "waifu")
            );
            //replying with media
            await client.sendMessage(message.from, media);
        } else
            message.reply(
                "Category doesn't exist.\ncheck for any typos\n\nAvailable categories:```\n" +
                    categories.join("\n") +
                    "```"
            );
    }

    if (msgSplit.includes("-i")) {
        try {
            var imageUrl: string = "";
            for await (let resultSet of image_search_generator({
                query: message.body.split("-i")[1],
                moderate: true,
                iterations: 0,
            })) {
                imageUrl = resultSet[0].image;
            }
            const media = await MessageMedia.fromUrl(imageUrl);
            await client.sendMessage(message.from, media);
        } catch (err) {
            message.reply(
                "Search error\n\nTry again later or change the search query"
            );
        }
    }

    if (message.body == "-invite") {
        message.reply(
            "Invite link:\nhttps://chat.whatsapp.com/FhKtLoLipxu2WAorPgXt4E"
        );
    }

    if (message.body.split(" ").includes("-reki")) {
        if (message.id.remote != "120363026329162763@g.us") {
            var files = fs.readdirSync("./sauce/");
            /* now files is an Array of the name of the files in the folder and you can pick a random name inside of that array */
            var chosenFile = files[Math.floor(Math.random() * files.length)];

            const media = MessageMedia.fromFilePath(`./sauce/${chosenFile}`);
            await client.sendMessage(message.from, media);
        } else message.reply("Command disbaled for the current group");
    }
    if (message.body.split(" ").includes("-aesthetic")) {
        var files = fs.readdirSync("./aesthetic/");
        /* now files is an Array of the name of the files in the folder and you can pick a random name inside of that array */
        var chosenFile = files[Math.floor(Math.random() * files.length)];

        const media = MessageMedia.fromFilePath(`./aesthetic/${chosenFile}`);
        await client.sendMessage(message.from, media);
    }

    if (msgSplit.includes("-add")) {
        if (message.hasMedia) {
            message.downloadMedia().then((media: any) => {
                if (media) {
                    var mediaPath: string = "";
                    if (message.body.split(" ")[1] === "mommy") {
                        mediaPath = "./sauce/";
                    } else if (message.body.split(" ")[1] === "aesthetic") {
                        mediaPath = "./aesthetic/";
                    }

                    if (!fs.existsSync(mediaPath)) {
                        fs.mkdirSync(mediaPath);
                    }
                    const extension = mime.extension(media.mimetype);
                    const filename = new Date().getTime();
                    const fullFilename = mediaPath + filename + "." + extension;

                    // Save to file
                    try {
                        fs.writeFileSync(fullFilename, media.data, {
                            encoding: "base64",
                        });
                        message.reply("succesfully added");
                    } catch (err) {
                        console.log("Failed to save the file:", err);
                    }
                }
            });
        }
    }

    if (msgSplit.includes("-total")) {
        if (message.body.split(" ").includes("mommy")) {
            var files = fs.readdirSync("./sauce/");
            message.reply(`Total Mommy pics: ${files.length}`);
        } else if (message.body.split(" ").includes("aesthetic")) {
            var files = fs.readdirSync("./aesthetic/");
            message.reply(`Total aesthetic pics: ${files.length}`);
        }
    }

    if (msgSplit.includes("-help")) {
        switch (msgSplit[1]) {
            case "waifu":
                message.reply(helpSection("waifu"));
                break;
            case "hentai":
                message.reply(helpSection("hentai"));
                break;
            case "joke":
                message.reply(helpSection("joke"));
                break;
            case "vromo":
                message.reply(helpSection("jokevro"));
                break;
            case "reki":
                message.reply(helpSection("reki"));
                break;
            case "aesthetic":
                message.reply(helpSection("aesthetic"));
                break;
            case "sticker":
                message.reply(helpSection("sticker"));
                break;
            default:
                message.reply(helpSection("help"));
        }
    }

    if (msgSplit == "-updates") {
        fs.readFile("./patch_update.txt", "utf8", function (err:any,data:string) {
            if (err) {
                return console.log(err);
            }
            message.reply(data)
        });
    }
});
client.initialize();

//\n-help section\nCommands:\n*SFW*\n```\n	-waifu\n	-aesthetic\n	-meme\n	-joke\n	-joke vro\n	-sticker\n```\n*NSFW*\n```\n	-hentai\n	-reki\n```\nAdd help after a command to know more about it.\nExample:\n```-waifu help```\n*Note*: -meme doesn't have a help page\n*you really need any help for that?

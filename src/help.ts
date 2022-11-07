export function helpSection(option: string) {
    if (option == "help")
        return "\n-help section\n\nCommands:\n*SFW*\n```\n	-waifu\n	-aesthetic\n	-meme\n	-joke\n	-vromo\n	-sticker\n```\n*NSFW*\n```\n	-hentai\n	-reki\n```\nAdd ```help``` after a command to know more about it.\nExample:\n```-waifu help```\n\n*Note*: -meme doesn't have a help page\n*you really need any help for that?";
    else if (option == "waifu") {
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

        return (
            "*-waifu help section*\n\nDesc:\nGet pics of random waifus as per your requests\n\nAvailable categories:\n```\n" +
            categories.join("\n-") +
            "```\n\nExample: \n```-waifu poke```"
        );
    } else if (option == "hentai") {
        const categories = ["waifu", "neko", "trap", "blowjob"];
        return (
            "*-hentai help section*\nDesc:\nGet hentai as per the category you chose\n\n```\n-" +
            categories.join("\n-") +
            "```\n\nUsage:\n```-hentai neko```"
        );
    } else if (option == "sticker") {
        return "*sticker help section*\n\nCommand:\n```-sticker```\n\nAdding ```-sticker``` as a caption to an image or gif or even videos, returns you a sticker of the media.\n\nYou can also add a name to the sticker by providing the name after the command.\nUsage: ```sticker ducksAreCute```";
    } else if (option == "aesthetic")
        return "Get random aesthetic pics.\n\nUsage:```-aesthetic```\n\n\nIf you wanna add pics into the collection, type ```-help add```";
    else if (option == "joke") return "get dark, pun, spooky, programming jokes from the ```-joke``` command.";
    else if (option == "jokevro") return "get desi indian jokes from the ```-vromo``` command";
    else if (option == "reki")
        return "*-reki help section*\n\nDesc:\nget random NSFW cosplays.\n\n\nIf you wanna add pics into the collection, type ```-help add```";
}

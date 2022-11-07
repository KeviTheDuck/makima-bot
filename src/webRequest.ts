const axios = require('axios')

export async function getWaifuPics(type:string,category:String): Promise<string> {
    return new Promise<string>((resolve) => 
        axios.get(`https://api.waifu.pics/${type}/${category}`)
            .then((res:any) => 
            resolve(res.data.url))
            .catch((error:any) => 
            resolve("NaN")))
            
}



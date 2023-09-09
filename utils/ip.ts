export type Langs = "ES" | "EN";

const getLanguageFromLS = (): Langs | null => {
    const lang = localStorage.getItem("lang");
    if(lang){
        return lang as Langs;
    }
    return null;
}

const setLanguage = (lang: Langs): void => {
    localStorage.setItem("lang", lang);
}

export const getLanguage = async (): Promise<Langs> => {
    const lang = getLanguageFromLS();
    if(lang) return lang;

    let res: Langs = "EN";
    const GET_IP_URL = "https://api.ipify.org/?format=json";
    
    const ip = await fetch(GET_IP_URL);
    const data = await ip.json();
    
    const geolocationApi = "https://api.ipgeolocation.io/ipgeo?apiKey=9f49e76e1ea14b4e837b96396cd4d0e0";
    const geolocation = await fetch(geolocationApi);

    const geolocationData = await geolocation.json();

    if(geolocationData && geolocationData.languages.length > 0 && geolocationData.languages.split(",")[0].toLowerCase().includes("es")) {
        res = "ES";
    }

    setLanguage(res);
    return res;
};

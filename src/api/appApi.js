import * as axios from "axios";

// const appToken = {token: 'tEwjaRuFejrpZyXoYMRRMOu2Dg9QVSDfgDheHf3b'}

const instance = axios.create({
    baseURL: 'https://video.shahin-electronics.com/api/',
    withCredentials: false,
    crossorigin:true,
    crossDomain: true,
    headers: {
        'APP_KEY': 'tEwjaRuFejrpZyXoYMRRMOu2Dg9QVSDfgDheHf3b'
    }
})

export const checkApi = {
    checkApp() {
        return instance.get(`check`).then(response => response.data)
    },
    userCheck(token) {
        return instance.post('user_chech', {_token: token}).then(response => response.data)
    }
}

export const countryApi = {
    getCountry() {
        return instance.get(`country`)
            .then(response => response.data)
            .catch(error=>error)
    }
}

export const authApi = {
    auth(api_key) {
        let headers = {
            'API_KEY': `${api_key}`
        }
        return instance.post(`check`, {}, {headers: headers})
            .then(response => response.data)
    },
    login(email, password) {
        return instance.post(`auth/login`, {email, password})
            .then(response => response.data)
            .catch(error => error)
    },
    logout(userId) {
        return instance.delete(`auth/logout/${userId}`)
            .then(response => response.data)
    },
    register(email, password, country, sosial_id) {
        return instance.post(`auth/register`, {email, password, country, sosial_id})
            .then(response => response.data)
            .catch(error => error)
    },
    registerSosial(email, password, country, sosial_id) {
        return instance.post(`auth/sosial`, {email, password, country, sosial_id})
            .then(response => response.data)
            .catch(error => error)
    }
}

export const languageApi = {
    get(api_key) {
        let headers = {'API_KEY': `${api_key}`}
        return instance.get(`language`, {headers: headers})
            .then(response => response.data)
            .catch(error => error)
    }
}

export const videoApi = {
    getVideos(video_type, language_id,page, api_key) {
        let headers = {'API_KEY': `${api_key}`}
        return instance.get(`video?page=${page}&video_type=${video_type}&language_id=${language_id}`, {headers: headers})
            .then(response => response.data)
        // .catch(error=>error)
    },
    getVideo(videoId, api_key) {
        let headers = {'API_KEY': `${api_key}`}
        return instance.get(`video/show/${videoId}`, {headers: headers})
            .then(response => response.data)
    }
}

export const youtubGetVideoTitle = {
    getTitle(videoId, ytApiKey) {
        return axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${ytApiKey}`)
            .then(response => response.data)
            .then(error => error)
    }
}
export const addWatchCount = {
    addWatch(videoId, api_key) {
        let headers = {'API_KEY': `${api_key}`}

        return instance.get(`video/watchCount?id=${videoId}`, {headers: headers})
            .then(response => response.data)
            .then(error => error)
    }
}

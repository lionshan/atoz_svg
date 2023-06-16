import axios from 'axios'//引入axios

const getXMLInfo = () => {
    return axios({
        method: "get",//指定请求方式
        url: "https://plmtest.gen-song.vip/3dspace/search/common/getXMLInfo",
      })
}

const getProjectTask = () => {
    return axios({
        method: "get",//指定请求方式
        url: "https://plmtest.gen-song.vip/3dspace/search/common/getXMLInfo",
      })
}

const getXMLData = (url) => {
    return axios({
        method: "get",//指定请求方式
        url: url, //url
      })
}

export { getXMLInfo, getProjectTask, getXMLData }
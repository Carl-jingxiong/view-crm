import axios from 'axios';

var homeData = axios.get(
    'analysis/indexanalysis',
    {headers:{'Authorization':'JWT  '+Cookies.get('retoken')}}
).then((response)=>{
    let homeData=response.data.data;
    return homeData;
})
export default [
    {name:"carl"}
];
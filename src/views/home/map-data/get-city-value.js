import Cookies from 'js-cookie';
import axios from 'axios';

axios.get(
    'analysis/indexanalysis',
    {headers:{'Authorization':'JWT  '+Cookies.get('retoken')}}
).then((response)=>{
    console.log("55555555555555")
    let data=response.data.data;
    let cityData=JSON.parse(data.citys);
    return cityData;
})
console.log("666666")
export default cityData;


// export default [
//     {name: '海门', value: 45},
//     {name: '鄂尔多斯', value: 34},
//     {name: '招远', value: 47},
//     {name: '舟山', value: 22},
//     {name: '齐齐哈尔', value: 74},
//     {name: '广州', value: 138},
//     {name: '盐城', value: 15},
//     {name: '北京', value: 250},
//     {name: '深圳', value: 141},
//     {name: '赤峰', value: 16},
//     {name: '青岛', value: 89},
//     {name: '乳山', value: 18},
//     {name: '金昌', value: 34},
//     {name: '泉州', value: 21},
//     {name: '莱西', value: 66},
//     {name: '日照', value: 45},
//     {name: '胶南', value: 23},
//     {name: '南通', value: 54},
//     {name: '拉萨', value: 22},
//     {name: '云浮', value: 78},
//     {name: '梅州', value: 23},
//     {name: '文登', value: 78},
//     {name: '上海', value: 218},
//     {name: '海口', value: 50},
// ];

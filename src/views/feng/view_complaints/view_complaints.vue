<template>
    <div class="container">
        查看投诉(冯老师)
        <Row class="margin-top-15">
            <Col span="24" >
                <Card >
                    <p slot="title">
                        <Row class="height-200px">
                            <Col span="4">
                                <Icon type="pinpoint"></Icon>
                                学生反馈详情
                            </Col>
                        </Row>
                    </p>
                    <Row class="margin-top-10">
                        <Col span="2">
                            类型选择：
                        </Col>
                        <Col span="20">
                            <Select 
                            @on-change="chooseType" 
                            :model.sync="type_id" 
                            style="width:130px">
                                <Option :key="index" v-for="(item,index) in typelist" :value="item.id">{{item.typename}}</Option>
                            </Select>
                        </Col>
                    </Row>
                    <!-- 建议详情展示表格 -->
                    <Table  style="margin-top:10px;" :columns="suggestionHead" :data="suggestionData"></Table>
                </Card> 
            </Col>
        </Row>
    </div>
</template>

<script type="text/ecmascript-6">
import canEditTable from '../../tables/components/canEditTable';
import tableData from '../../tables/components/table_data.js';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Modal } from 'iview';
import sugges_expandRow from './component/feng_sugges_expandRow';

export default {
    name: 'feng_view_complaints_index',
    components:{
        canEditTable,
        sugges_expandRow
    },
    data(){
        return{
            suggestionHead: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h(sugges_expandRow, {
                            props: {
                                row: params.row
                            }
                        });
                    }
                },
                {
                    title: '姓名',
                    key: 'stuid'
                },
                {
                    title: '所属班级',
                    key: 'classes'
                },
                {
                    title: '反馈讲师',
                    key: 'teacher'
                },
                {
                    title: '反馈类型',
                    key: 'coclassifyd'
                },
                {
                    title: '反馈日期',
                    key: 'codate'
                },
                {
                    title: '反馈时间',
                    key: 'cotime'
                },
                {
                    title: '联系电话',
                    key: 'tel'
                }
            ],
            suggestionData: [
                // {
                //     stuid: '学生姓名',
                //     teacher: '讲师名称',
                //     coclassifyd:'反馈类型',
                //     codate:'日期',
                //     cotime: '时间',
                //     tel:'12345678879',

                //     classes:"AID",
                //     scheduled: '反馈进度',
                //     detail:'反馈内容详情'
                // }
            ],
            typelist:[
                {id:1,typename:'建议'},
                {id:2,typename:'赞美'},
                {id:3,typename:'疑问'},
                {id:4,typename:'投诉'},
            ],
            // showCurrentTableData: false,
            studentSuggestModal:false,
            type_id:'',
        }
    },
    methods: {
        getData () {
            axios.get(
                'complaint/mcomplaint',
                {
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')},
                    params:{'orderid':''}
                }
            ).then((response)=>{
                this.suggestionData=response.data.data.data;
            })
        },
        chooseType(val){
            this.type_id=val;
            console.log(val)
            this.changeType(val);
        },
        changeType(typeid){
            axios.get(
                'complaint/mcomplaint',
                {
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')},
                    params:{'coclassifyid':typeid}
                }
            ).then((response)=>{
                this.suggestionData=response.data.data.data;
            })
        }
    },
    created(){
        this.getData();
    }
}
</script>
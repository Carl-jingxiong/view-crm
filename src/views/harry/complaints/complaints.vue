<style lang="less">
    @import '../../../styles/common.less';
    @import '../../tables/components/table.less';
</style>

<template>
    <div class="container">
        查看、反馈投诉(品保主管)
        <Row class="margin-top-15">
            <Col span="24" >
                <Card >
                    <p slot="title" style="height:30px">
                        <Row class="height-100px">
                            <Col span="21">
                                <Icon type="pinpoint"></Icon>
                                查看、反馈投诉
                            </Col>
                            <Col span="3">
                                
                            </Col>
                        </Row>
                    </p>
                    <div class="edittable-table-height-con">
                        <can-edit-table 
                        refs="harry-view-complain" 
                        v-model="complainsData" 
                        :columns-list="complainsHead" 
                        @on-change="handleChange" 
                        @on-delete="handleDel"></can-edit-table>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script type="text/ecmascript-6">
import canEditTable from '../../tables/components/canEditTable';  
import axios from 'axios';
import Cookies from 'js-cookie';
import { Modal } from 'iview';
let $ = require('jquery');

export default {
    name: 'complaints_index',
    components: {
        canEditTable
    },
    data () {
        return {
            complainsHead:[
                {
                    title: '序号',
                    type: 'index',
                    width: 50,
                    align: 'center'
                },
                {
                    title: '列表号',
                    key: 'id',
                    width: 50,
                    align: 'center'
                },
                {
                    title: '学生',
                    align: 'center',
                    key: 'stuid',
                    width: 90
                },
                {
                    title: '班级',
                    align: 'center',
                    key: 'classes',
                    width:90
                },
                {
                    title: '日期',
                    align: 'center',
                    key: 'codate',
                    width: 100
                },
                {
                    title: '反馈对象',
                    align: 'center',
                    key: 'teacher',
                    width: 90
                },
                {
                    title: '反馈内容',
                    align: 'center',
                    key: 'detail',
                    width: 210
                },
                {
                    title: '回馈内容',
                    align: 'center',
                    key: 'solvede',
                    // width: 150,
                    editable: true
                },
                {
                    title: '操作',
                    align: 'center',
                    width: 180,
                    key: 'handle',
                    handle: ['edit']
                }
            ],
            complainsData: [
                // {
                //     stuid: '学生姓名',
                //     teacher: '讲师名称',
                //     coclassifyd:'反馈类型',
                //     codate:'2018-08-07',
                //     cotime: '时间',
                //     tel:'12345678879',
                //     solvede:'这是回馈内容！！！！',
                //     classes:"AID1801",
                //     scheduled: '反馈进度',
                //     detail:'反馈内容详情,反馈内容详情,'
                // }
            ],
            centerList:[],
            leaderList:[],
            showCurrentTableData: false,
            loading: true,
            proLeader:'',
        };
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
                console.log(response.data.data.data)
                this.complainsData=response.data.data.data;
            })
        },
        handleDel (val,index) {
            // this.$Message.success('删除了第' + (index + 1) + '行数据');

            // console.log(this.complainsData[index].id)
            // axios.delete(
            //     'complaint/mcomplaint',
            //     {
            //         data:{"orderid":this.complainsData[index].id},
            //         headers:{'Authorization':'JWT  '+Cookies.get('retoken')}
            //     }
            // ).then((response)=>{
            //     console.log(response.data)
            //     if(response.data.result==true){
            //         this.getData();
            //     }
            // })
        },
        // handleCellChange (val, index, key) {
        //     this.$Message.success('修改了第 ' + (index + 1) + ' 行列名为 ' + key + ' 的数据');
        // },
        handleChange (val, index) {
            // this.$Message.success('修改了第' + (index + 1) + '行数据');
            console.log(val[index]);
            // let param = new URLSearchParams();
            // param.append("managerid",val[index].id);
            // param.append("manname",val[index].username);
            // param.append("tel",val[index].tel);
            // param.append("email",val[index].uemail);
            axios.delete(
                'complaint/mcomplaint',
                {
                    data:{
                        "orderid":val[index].id,
                        "solvede":val[index].solvede
                    },
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')}
                }
            ).then((response)=>{
                console.log(response.data)
                if(response.data.result==true){
                    this.getData();
                }
            })
        }
    },
    created () {
        this.getData();
    }
}
</script>
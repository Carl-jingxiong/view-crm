<style lang="less" scoped>
    @import '../../../styles/common.less';
    @import '../../tables/components/table.less';
    .classes-message-table{
        border-collapse:collapse;
        tr{
            width:100%;
            padding:10px 10px;
            td{
                width:20%;
                border:1px solid #EBEAEA;
                text-align: center;
                padding:7px 0;
            }
        }
    }
</style>

<template>
    <div class="container">
        <!-- 管理班级(教学经理页面) -->
        <Row class="margin-top-15">
            <Col span="24" >
                <Card >
                    <p slot="title"  style="height:33px">
                        <Row class="height-200px">
                            <Col span="21">
                                <Icon type="pinpoint"></Icon>
                                管理班级
                            </Col>
                            <Col span="3">
                                <i-button type="primary" @click="addClass">
                                    添加远程班级
                                </i-button>
                            </Col>
                        </Row>
                        <!-- 激活班级弹框 -->
                        <Modal
                            v-model="actClassModal"
                            title="激活新班级"
                            @on-ok="activeClass">
                            <p>
                                <Row class="margin-top-10">
                                    <Col span="4">
                                        项目经理：
                                    </Col>
                                    <Col span="20">
                                        <Select 
                                        @on-change="managerChange" 
                                        :model.sync="managerid"
                                        style="width:130px">
                                            <Option :key="index" v-for="(item,index) in managerList" :value="item.id">{{item.username}}</Option>
                                        </Select>
                                    </Col>
                                </Row>
                                <Row class="margin-top-10">
                                    <Col span="4">
                                        班主任：
                                    </Col>
                                    <Col span="20">
                                        <Select 
                                        @on-change="masterChange" 
                                        :model.sync="masterid" 
                                        style="width:130px">
                                            <Option :key="index" v-for="(item,index) in masterList" :value="item.id">{{item.username}}</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </p>
                        </Modal>
                        <!-- 添加远程班弹框 -->
                        <Modal
                            v-model="addClassModal"
                            title="添加远程班" 
                            @on-ok="addClass_ok">
                                <p>
                                    <Row class="margin-top-10">
                                        <Col span="4">
                                            选择主讲班：
                                        </Col>
                                        <Col span="8">
                                            <Select 
                                            @on-change="remotelyClassChange" 
                                            :model.sync="remotelyClassid"
                                            style="width:130px">
                                                <Option :key="index" v-for="(item,index) in classData" :value="item.id">{{item.classno}}</Option>
                                            </Select>
                                        </Col>
                                        <Col><span style="display:inline-block;padding-top:6px;">{{backClassno}}</span></Col>
                                    </Row>
                                    <!-- <Row class="margin-top-10">
                                        <Col span="4">
                                            远程班后缀：
                                        </Col>
                                        <Col span="20">
                                            <Select 
                                            @on-change="remotelyClassChange" 
                                            :model.sync="remotelyClassid"
                                            style="width:130px">
                                                <Option :key="index" v-for="(item,index) in classData" :value="item.id">{{item.classno}}</Option>
                                            </Select>
                                        </Col>
                                    </Row> -->
                                    <!-- <Row class="margin-top-10">
                                        <Col span="4">
                                            项目经理：
                                        </Col>
                                        <Col span="20">
                                            <Select 
                                            @on-change="managerChange" 
                                            :model.sync="managerid"
                                            style="width:130px">
                                                <Option :key="index" v-for="(item,index) in managerList" :value="item.id">{{item.username}}</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                    <Row class="margin-top-10">
                                        <Col span="4">
                                            班主任：
                                        </Col>
                                        <Col span="20">
                                            <Select 
                                            @on-change="masterChange" 
                                            :model.sync="masterid" 
                                            style="width:130px">
                                                <Option :key="index" v-for="(item,index) in masterList" :value="item.id">{{item.username}}</Option>
                                            </Select>
                                        </Col>
                                    </Row> -->
                                </p>
                        </Modal>
                    </p>
                    <table class="classes-message-table">
                        <tr style="background-color:#F9F8F8">
                            <td><b>班级名称</b></td>
                            <td><b>所属中心</b></td>
                            <td><b>项目经理</b></td>
                            <td><b>班主任</b></td>
                            <td><b>是否激活</b></td>
                            <td style="width:200px;">操作激活</td>
                            <td style="width:200px;">停用操作</td>
                        </tr>
                        <tr v-for="(item,index) in classData">
                            <td>{{item.classno}}</td>
                            <td>{{item.cname}}</td>
                            <td>{{item.proman}}</td>
                            <td>{{item.master}}</td>
                            <td>{{item.active}}</td>
                            <td style="padding:7px 20px;">
                                <!-- :disabled="item.active=='已激活'" -->
                                <i-button :disabled="item.active=='已激活'"  type='success' @click='act(item.id)'>激活</i-button>
                            </td>
                            <td style="padding:7px 20px;">
                                <i-button type='error' @click='deleteClass(item.id)'>停用</i-button>
                            </td>
                        </tr>
                    </table>
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
let $ = require('jquery');

export default {
    name: 'classes_message_index',
    components: {
        canEditTable
    },
    data(){
        return{
            classData: [],
            managerList:[],
            masterList:[],
            showCurrentTableData: false,
            actClassModal:false,
            addClassModal:false,
            loading: true,
            className:'',
            classid:'',
            managerid:'',
            masterid:'',
            remotelyClassid:'',
            backClassname:'',
            backClassno:'',
            backCenterid:''
        }
    },
    methods: {
        getData () {
            // 获取班级列表
            axios.get(
                'userinfo/classes',
                {headers:{'Authorization':'JWT  '+Cookies.get('retoken')}}
            ).then((response)=>{
                console.log(response.data.data);
                let resData=response.data.data;
                let data=[];
                for(let i=0;i<resData.length;i++){
                    data[i]={};
                    data[i].classno=resData[i].classno;
                    data[i].cname=resData[i].center.cname;
                    // data[i].master=resData[i].master.username;
                    if(resData[i].master==null){
                        data[i].master="班级未激活";
                    }else{
                        data[i].master=resData[i].master.username;
                    }
                    if(resData[i].manager==null){
                        data[i].proman="班级未激活";
                    }else{
                        data[i].proman=resData[i].manager.username;
                    }
                    data[i].id=resData[i].id;
                    data[i].active=resData[i].active==true?"已激活":"否";
                }
                // console.log(data);
                this.classData=data;
            })
        },
        //加载各个弹框中的项目经理和班主任列表信息
        init(){
            axios.get(
                'userinfo/classactive',
                {
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')}
                }
            ).then((response)=>{
                let resData=JSON.parse(response.data.data);
                // console.log(resData)
                this.masterList=JSON.parse(resData.master);
                this.managerList=JSON.parse(resData.manager);
            })
        },
        //激活班级添加项目经理弹框
        act(classid){
            // console.log(classid);
            this.actClassModal=true;
            //当前班级的id
            this.classid=classid;
        },
        //激活的时候选择项目经理
        managerChange(val){
            // console.log(val);
            this.managerid=val;
        },
        //激活的时候选择班主任
        masterChange(val){
            // console.log(val)
            this.masterid=val;
        },
        //确定激活新班级
        activeClass(){
            // console.log("确定激活了")
            let param = new URLSearchParams();
            param.append("classid",this.classid);
            param.append("managerid",this.managerid);
            param.append("masterid",this.masterid)
            axios.post(
                'userinfo/classactive',param,
                {headers:{'Authorization':'JWT  '+Cookies.get('retoken')}}
            ).then((response)=>{
                // console.log(response.data);
                if(response.data.result==true){
                    this.$Message.success('激活班级成功！');
                    this.getData();
                }else{
                    // console.log(response.data.error)
                    this.$Message.error('激活班级失败！'); 
                }
            })
        },
        //停用当前班级
        deleteClass(index){
            // console.log(index)
            axios.delete(
                'userinfo/classactive',
                {
                    data:{"classid":index},
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')}
                }
            ).then((response)=>{
                // console.log(response.data);
                if(response.data.result==true){
                    this.$Message.success('该班级已停用！');
                    this.getData();
                }else{
                    // console.log(response.data.error)
                    this.$Message.error('停用班级失败！'); 
                }
            })
        },
        //弹出添加远程班级弹框
        addClass(){
            this.addClassModal=true;
        },
        //远程班级的主讲班选择
        remotelyClassChange(val){
            // console.log(val);
            this.remotelyClassid=val;
            axios.get(
                'userinfo/ceclass',
                {
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')},
                    params:{'classid':this.remotelyClassid}
                }
            ).then((response)=>{
                console.log(response.data);
                if(response.data.result==true){
                    let data=response.data.data;
                    this.backClassname=data.classname;
                    this.backClassno=data.classno;
                    this.backCenterid=data.centerid;
                }else{

                }
            })
        },
        //确认添加远程班按钮
        addClass_ok(){
            let param = new URLSearchParams();
            param.append("classid",this.remotelyClassid);
            param.append("centerid",this.backCenterid);
            param.append("classno",this.backClassno);
            param.append("classname",this.backClassname);
            axios.post(
                'userinfo/ceclass',param,
                {headers:{'Authorization':'JWT  '+Cookies.get('retoken')}}
            ).then((response)=>{
                console.log(response.data);
                if(response.data.result==true){
                    this.$Message.success('添加班级成功');
                    this.getData();
                }else{
                    console.log(response.data.error)
                    this.$Message.error('已存在该班级！'); 
                }
            })
        }
    },
    created () {
        this.getData();
        this.init();
    }
}
</script>
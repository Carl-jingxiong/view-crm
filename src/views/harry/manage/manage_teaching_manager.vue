<style lang="less">
    @import '../../../styles/common.less';
    @import '../../tables/components/table.less';
</style>

<template>
    <div>
        <Row class="margin-top-15">
            <Col span="24" >
                <Card >
                    <p slot="title" style="height:35px">
                        <Row class="height-200px">
                            <Col span="21">
                                <Icon type="pinpoint"></Icon>
                                管理教学经理
                            </Col>
                            <Col span="3">
                                <i-button type="primary" @click="add">
                                    添加教学经理
                                </i-button>
                            </Col>
                        </Row>
                        <Modal
                            v-model="addTeacherManagerModal"
                            title="添加教学经理"
                            @on-ok="addTeacherManager">
                            <p>
                                <Row class="margin-top-10">
                                    <Col span="4">
                                        教学经理姓名:
                                    </Col>
                                    <Col span="20">
                                        <i-input v-model="teacherManagerName" placeholder="请输入教学经理姓名"></i-input>
                                    </Col>
                                </Row>
                                <Row  class="margin-top-10">
                                    <Col span="4">
                                        邮箱地址:
                                    </Col>
                                    <Col span="20">
                                        <i-input v-model="teacherManagerEmail" placeholder="请输入邮箱地址"></i-input>
                                    </Col>
                                </Row>
                                <Row class="margin-top-10">
                                    <Col span="4">
                                        个人电话:
                                    </Col>
                                    <Col span="20">
                                        <i-input v-model="teacherManagerPhone" placeholder="请输入个人电话"></i-input>
                                    </Col>
                                </Row>
                                <Row class="margin-top-10">
                                    <Col span="4">
                                        所属中心:
                                    </Col>
                                    <Col span="20">
                                        <Select @on-change="centerChange" 
                                        :model.sync="centerid" 
                                        style="width:130px">
                                            <Option :key="index" v-for="(item,index) in centerList" :value="item.id">{{item.cname}}</Option>
                                        </Select>
                                    </Col>
                                </Row>
                                <Row class="margin-top-10">
                                    <Col span="4">
                                        所属领导:
                                    </Col>
                                    <Col span="20">
                                        <Select @on-change="leaderChange" 
                                        :model.sync="leaderid" 
                                        style="width:130px">
                                            <Option :key="index" v-for="(item,index) in leaderList" :value="item.id">{{item.username}}</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </p>
                            <!-- <i-button type="info">
                                这是确定按钮
                            </i-button> -->
                        </Modal>
                    </p>
                    <div class="edittable-table-height-con">
                        <can-edit-table refs="center" 
                        v-model="teacherManagerData" 
                        :columns-list="teacherManagerHead"
                        @on-change="handleChange"
                        @on-delete="handleDel"></can-edit-table>
                    </div>
                </Card>
            </Col>
            
        </Row>
    </div>
</template>

<script>
import canEditTable from '../../tables/components/canEditTable';
import tableData from '../../tables/components/table_data.js';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Modal } from 'iview';

export default {
    name: 'manage_teaching_manager',
    components: {
        canEditTable
    },
    data () {
        return {
            teacherManagerHead:[
                {
                    title: '序号',
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '列表号',
                    key: 'id',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '姓名',
                    align: 'center',
                    key: 'username',
                    width: 150,
                    editable: true
                },
                {
                    title: '手机号',
                    align: 'center',
                    key: 'tel',
                    // width: 180,
                    editable: true
                },
                {
                    title: '邮箱',
                    align: 'center',
                    key: 'uemail',
                    width: 240,
                    editable: true
                },
                {
                    title: '所属中心',
                    align: 'center',
                    key: 'center',
                    width: 260,
                    // editable: true
                },
                {
                    title: '操作',
                    align: 'center',
                    width: 190,
                    key: 'handle',
                    handle: ['edit', 'delete']
                }
            ],
            teacherManagerData: [
                // {
                //     cname: '大钟寺中心',
                //     ads:'中坤广场',
                //     id:'3',
                //     tel:'3333333333',
                //     leader:'大钟寺中心主任',
                // },
                // {
                //     cname: '大钟寺中心',
                //     ads:'中坤广场',
                //     id:'4',
                //     tel:'3333333333',
                //     leader:'大钟寺中心主任',
                // },
                // {
                //     cname: '大钟寺中心',
                //     ads:'中坤广场',
                //     id:'5',
                //     tel:'3333333333',
                //     leader:'大钟寺中心主任',
                // },
            ],
            centerList:[],
            leaderList:[],
            showCurrentTableData: false,
            addTeacherManagerModal:false,
            loading: true,
            teacherManagerName:'',
            teacherManagerEmail:'',
            teacherManagerPhone:'',
            centerLeader:'',
            centerid:'',
            leaderid:''
        };
    },
    methods: {
        getData () {
            // 获取教学经理列表
            axios.get(
                'userinfo/edus',{headers:{'Authorization':'JWT  '+Cookies.get('retoken')}}
            ).then((response)=>{
                console.log(response.data.data);
                this.teacherManagerData=response.data.data
            })
        },
        handleDel (val,index) {
            // this.$Message.success('删除了第' + (index + 1) + '行数据');
            console.log(this.teacherManagerData[index].id)
            axios.delete(
                'userinfo/edus',
                {
                    data:{"eduid":this.teacherManagerData[index].id},
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')}
                }
            ).then((response)=>{
                console.log(response.data)
                if(response.data.result==true){
                    this.$Message.success('删除教学经理成功！');
                    this.getData();
                }
            })
        },
        handleCellChange (val, index, key) {
            this.$Message.success('修改了第 ' + (index + 1) + ' 行列名为 ' + key + ' 的数据');
        },
        handleChange (val, index) {
            // this.$Message.success('修改了第' + (index + 1) + '行数据');
            console.log(val[index]);
            let param = new URLSearchParams();
            param.append("eduid",val[index].id);
            param.append("eduname",val[index].username);
            param.append("email",val[index].uemail);
            param.append("tel",val[index].tel);
            axios.put(
                'userinfo/edus',param,
                {
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')}
                }
            ).then((response)=>{
                if(response.data.result==true){
                    this.$Message.success('修改成功！');
                    this.getData();
                }
            })
        },
        add(){
            this.addTeacherManagerModal=true;
            axios.get(
                'userinfo/center',
                {
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')}
                }
            ).then((response)=>{
                // console.log(response.data.data);
                this.centerList=response.data.data
            });
            //获取教学经理的leader列表
            axios.get(
                'daily/aboutleader',
                {
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')},
                    params:{"add":7}
                }
            ).then((response)=>{
                // console.log(response.data.data);
                this.leaderList=response.data.data;
            })
        },
        centerChange(val){
            this.centerid=val;
        },
        leaderChange(val){
            this.leaderid=val;
        },
        addTeacherManager(){
            let param = new URLSearchParams();
            param.append("eduname",this.teacherManagerName);
            param.append("tel",this.teacherManagerPhone);
            param.append("uemail",this.teacherManagerEmail);
            param.append("centerid",this.centerid);
            param.append("leaderid",this.leaderid);
            axios.post(
                'userinfo/edus',param,
                {headers:{'Authorization':'JWT  '+Cookies.get('retoken')}}
            ).then((response)=>{
                if(response.data.result==true){
                    this.$Message.success('添加教学经理成功！');
                    this.getData();
                }
            })
        },
        submitAddCenter(){
            // setTimeout(() => {
            //     this.addCenter = false;
            // }, 2000);
            console.log("2222")
            let content=`
                提示信息
            `;
            let config={
                title:'添加中心',
                content:content,
                okText:'确定添加',
                onOk:()=>{
                    console.log("点击了确定")
                }
            }
            this.$Modal.info(config)
        }
        
    },
    created () {
        this.getData();
    }
};
</script>

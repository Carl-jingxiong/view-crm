<style lang="less">
    @import '../../../styles/common.less';
    @import '../../tables/components/table.less';
    @import '../../advanced-router/advanced-router.less';
</style>

<template>
    <div>
        完善就业信息(班主任)
        <Row class="margin-top-15">
            <Col span="24" >
                <Card >
                    <p slot="title" style="height:35px">
                        <Row class="height-200px">
                            <Col span="4">
                                <Icon type="pinpoint"></Icon>
                                学生就业信息
                            </Col>
                            <Col span="17">
                                {{classname}}
                            </Col>
                            <Col span="3">
                                <i-button type="primary" @click="addEmploy">
                                    录入学生就业信息
                                </i-button>
                            </Col>
                        </Row>
                        <Modal
                            v-model="addEmployModal"
                            title="录入学生就业信息"
                            @on-ok="employSend">
                            <p>
                                <Row class="margin-top-10">
                                    <Col span="4" class="padding-top-5">
                                        学生姓名:
                                    </Col>
                                    <Col span="20">
                                        <Select @on-change="studentChange" 
                                        :model.sync="studentid" 
                                        style="width:130px">
                                            <Option :key="index" v-for="(item,index) in studentList" :value="item.id">{{item.name}}</Option>
                                        </Select>
                                    </Col>
                                </Row>
                                <Row  class="margin-top-10">
                                    <Col span="4" class="padding-top-5">
                                        就业方向:
                                    </Col>                                    
                                    <Col span="8">
                                        <Select 
                                        @on-change="directionChange"
                                        :model.sync="direction">
                                            <Option value="7">Web</Option>
                                            <Option value="6">前端</Option>
                                            <Option value="5">嵌入式</Option>
                                            <Option value="4">量化交易</Option>
                                            <Option value="3">人工智能</Option>
                                            <Option value="2">数据分析</Option>
                                            <Option value="1">爬虫</Option>
                                        </Select>
                                    </Col>
                                    <Col span="4" class="padding-top-5 padding-left-5" >
                                        薪资水平:
                                    </Col>  
                                    <Col span="6">
                                        <i-input v-model="salary" placeholder="请输入薪资"></i-input>
                                    </Col>
                                </Row>
                                <Row class="margin-top-10">
                                    <Col span="4" class="padding-top-5">
                                        入职公司:
                                    </Col>
                                    <Col span="20">
                                        <i-input v-model="company" placeholder="请输入入职公司名称"></i-input>
                                    </Col>
                                </Row>
                            </p>
                        </Modal>
                    </p>
                    <!-- 修改学生信息的表格 -->
                    <div class="edittable-table-height-con">
                        <can-edit-table refs="modify_smessage" 
                        v-model="studentData" 
                        :columns-list="studentHead"
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

export default {
    name: 'modify_students_employment',
    components:{
        canEditTable,
    },
    data(){
        return{
            studentHead: [
                {
                    title: '序号',
                    type: 'index',
                    width: 60,
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
                    width:120,
                    align: 'center',
                    key: 'sname',
                    // editable: true
                },
                {
                    title: '性别',
                    width:100,
                    align: 'center',
                    key: 'sex'
                },
                {
                    title: '手机号',
                    width:180,
                    align: 'center',
                    key: 'mobile',
                    // editable: true                    
                },
                {
                    title: '就业方向',
                    width:150,
                    align: 'center',
                    key: 'direction',
                },
                {
                    title: '薪资水平',
                    align: 'center',
                    key: 'salary',
                },
                {
                    title: '就业公司',
                    align: 'center',
                    key: 'company',
                },
                // {
                //     title: '操作',
                //     align: 'center',
                //     width: 190,
                //     key: 'handle',
                //     handle: ['edit', 'delete']
                // }
            ],
            studentData: [
                {
                    // sname: '王小明',
                    // age: 18,
                    // sex:'男',
                    // direction:'统招本科',
                    // mobile: '938457093248705284',
                    // QQ:'287349837',
                    // classes:"AID",
                    // major: '系',
                    // uname:'登录名',
                    // remark:'这是备注',
                    // company:'家里蹲大学',
                    // workbg:'5年'
                }
            ],
            showCurrentTableData: false,
            addEmployModal:false,
            loading: true,
            direction:'',
            company:'',
            studentid:'',
            class_id:'',
            classname:'',
            studentList:[],
            salary:'',
        }
    },
    methods: {
        init(){
            this.class_id=this.$route.query.class_id;
            this.getData();
        },
        getData () {
            // 获取基本就业信息
            axios.get(
                'student/stuemploy',
                {
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')},
                    params:{'classid':this.class_id}
                }
            ).then((response)=>{
                // console.log(response.data)
                this.classname=response.data.classname;
                this.studentData=response.data.data;
                let resData=response.data.data;
                let data=[];
                console.log(resData)
                
                for(var i=0;i<resData.length;i++){
                    if(resData[i].employ==true){
                        // console.log(resData[i].employ);
                        return
                    }else{
                        data[i]={};
                        data[i].name=resData[i].sname;
                        data[i].id=resData[i].id;
                    }
                }
                console.log(data)
                this.studentList=data;

                
            })
        },
        handleDel (val,index) {
            // this.$Message.success('删除了第' + (index + 1) + '行数据');
            console.log(this.studentData[index].id)
            axios.delete(
                'student/stuedit',
                {
                    data:{"stuid":this.studentData[index].id},
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')}
                }
            ).then((response)=>{
                // console.log(response.data)
                if(response.data.result==true){
                    this.getData();
                }
            })
        },
        handleChange (val, index) {
            // this.$Message.success('修改了第' + (index + 1) + '行数据');
            // console.log(val[index]);
            axios.put(
                'student/stuedit',val[index],
                {
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')}
                }
            ).then((response)=>{
                if(response.data.result==true){
                    this.getData();
                }
            })
        },
        //录入学生信息方法
        addEmploy(){
            this.addEmployModal=true;
        },
        employSend(){
            let param = new URLSearchParams();
            param.append("stuid",this.studentid);
            param.append("studire",this.direction);
            param.append("stusalary",this.salary);
            param.append("stucompany",this.company);
            axios.post(
                'student/stuemploy',param,
                {headers:{'Authorization':'JWT  '+Cookies.get('retoken')}}
            ).then((response)=>{
                if(response.data.result==true){
                    this.$Message.success('就业信息录入成功！');
                    this.getData();
                }
            })
        },
        studentChange(val){
            this.studentid=val;
        },
        directionChange(val){
            console.log(val)
            this.direction=val;
        }
        //录入学生信息方法结束
    },
    beforeMount(){
        this.init();
    },
    watch: {
        '$route' () {
            this.init();
        }
    }
}
</script>
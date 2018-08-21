<style lang="less" scoped>
    @import '../../../../styles/common.less';
    @import '../../../tables/components/table.less';
</style>

<template>
    <div class="container">
        下载学生反馈
        <div>

        <Row class="margin-top-10">
            <Card>
                <h4 slot="title">
                    <Icon type="android-archive"></Icon>
                    导出已完成反馈为 .Xls 文件 (Excel)
                </h4>
                <Row>
                    <Col span="18">
                        <Table 
                            :columns="excelColumns" 
                            :data="table2excelData" size="small" ref="tableExcel">
                        </Table>
                    </Col>
                    <Col span='6' class="padding-left-10">
                        <div class="margin-top-10 margin-left-10">
                            <span>输入文件名：</span>
                            <Input v-model="excelFileName" icon="document" placeholder="请输入文件名" style="width: 190px" />
                        </div>
                        <div class="margin-left-10 margin-top-20">
                            <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
                            <Button type="primary" size="large" @click="exportExcel">下载表格数据</Button>
                        </div>
                    </Col>
                </Row>
            </Card>
        </Row>
    </div>
    </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios';
import Cookies from 'js-cookie';
import {table2csvData, csvColumns} from '../../../tables/data/table2csv.js';
// import {table2excelData} from '../../../tables/data/table2excel.js';
import table2excel from '@/libs/table2excel.js'; 
export default {
    name: 'download_complaints_index',
    data(){
        return{
            columnsCsv: csvColumns,
            csvData: table2csvData,
            table2excelData: [],
            excelColumns: [
                {
                    'title': '列表号',
                    'key': 'id'
                },
                {
                    'title': '班级',
                    'key': 'classes',
                    'sortable': true
                },
                {
                    'title': '学生姓名',
                    'key': 'stuid'
                },
                {
                    'title': '讲师',
                    'key': 'teacher',
                    'sortable': true
                },
                {
                    'title': '日期',
                    'key': 'codate',
                    'sortable': true
                },
                {
                    'title': '时间',
                    'key': 'cotime'
                },
                {
                    'title': '详情',
                    'key': 'detail'
                },
                {
                    'title': '反馈',
                    'key': 'solvede'
                }
            ],
            rowNum: table2csvData.length,
            colNum: csvColumns.length,
            selectMinRow: 1,
            selectMaxRow: table2csvData.length,
            selectMinCol: 1,
            selectMaxCol: csvColumns.length,
            maxRow: 0,
            minRow: 1,
            maxCol: 0,
            minCol: 1,
            csvFileName: '',
            excelFileName: '',
            tableExcel: {},
            fontSize: 16
        }
    },
    methods: {
        getData(){
            axios.get(
                'complaint/allcomplaint',
                {
                    headers:{'Authorization':'JWT  '+Cookies.get('retoken')}
                }
            ).then((response)=>{
                console.log(response.data.data.data)
                this.table2excelData=response.data.data.data;
            })
        },
        exportData (type) {
            if (type === 1) {
                this.$refs.tableCsv.exportCsv({
                    filename: '原始数据'
                });
            } else if (type === 2) {
                this.$refs.tableCsv.exportCsv({
                    filename: '排序和过滤后的数据',
                    original: false
                });
            } else if (type === 3) {
                this.$refs.tableCsv.exportCsv({
                    filename: this.csvFileName,
                    columns: this.columnsCsv.filter((col, index) => index >= this.selectMinCol - 1 && index <= this.selectMaxCol - 1),
                    data: this.csvData.filter((data, index) => index >= this.selectMinRow - 1 && index <= this.selectMaxRow - 1)
                });
            }
        },
        exportExcel () {
            table2excel.transform(this.$refs.tableExcel, 'hrefToExportTable', this.excelFileName);
        }
    },
    created(){
        this.getData();
    }
}
</script>
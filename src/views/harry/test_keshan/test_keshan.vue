<style lang="less">
    @import '../../my-components/area-linkage/area-linkage.less';
    @import '../../../styles/common.less';
</style>

<template>
    <div>
        <Row class="margin-top-10" :gutter="10">
            <Col span="12">
                <Card>
                    <p slot="title">
                        可搜索
                    </p>
                    <Row class="area-linkage-page-row2">
                        <al-selector 
                            v-model="searchvalue"
                            searchable
                        />
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import alSelector from '../../my-components/area-linkage/components/al-selector';
import alCascader from '../../my-components/area-linkage/components/al-cascader';

// import Vue from 'vue';
// import iviewArea from 'iview-area';
// Vue.use(iviewArea);

export default {
    components: {
        alSelector,
        alCascader
    },
    data () {
        return {
            searchvalue:[]
        };
    },
    methods: {
        renderFormat (label) {
            return label.join(' => ');
        },
    },
    watch: {
        searchvalue (val) {
            this.searchvalue = val;
        }
    }
};
</script>

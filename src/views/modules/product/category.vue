<template>
    <div>
        <el-tree :data="menus" show-checkbox node-key="catId" :props="defaultProps" :expand-on-click-node="false"
            :default-expanded-keys="expandedKey">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                    <el-button v-if="node.level <= 2" type="text" size="mini" @click="() => append(data)">
                        Append
                    </el-button>
                    <el-button type="text" size="mini" @click="() => edit(data)">
                        Edit
                    </el-button>
                    <el-button v-if="node.childNodes.length === 0" type="text" size="mini"
                        @click="() => remove(node, data)">
                        Delete
                    </el-button>
                </span>
            </span>
        </el-tree>
        <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
            <el-form :model="category">
                <el-form-item label="分类名称">
                    <el-input v-model="category.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图标">
                    <el-input v-model="category.icon" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="计量单位">
                    <el-input v-model="category.productUnit" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dialogType: "",
            title: "",
            category: {
                name: '',
                parentCid: 0,
                catLevel: 0,
                showStatus: 1,
                sort: 0,
                catId: null,
                icon: '',
                productUnit: ''
            },
            dialogVisible: false,
            menus: [],
            expandedKey: [],
            data: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            }
        }
    },
    methods: {
        getMenus() {
            this.$http({
                url: this.$http.adornUrl('/product/category/list/tree'),
                method: 'get'
            }).then(({ data }) => {
                this.menus = data.data
            })
        },
        submit() {
            if (this.dialogType === "add") {
                this.addCategory()
            } else if (this.dialogType === "edit") {
                this.editCategory()
            }
        },
        append(data) {
            this.dialogType = "add"
            this.title = "添加分类"
            this.dialogVisible = true
            this.category.parentCid = data.catId
            this.category.catLevel = data.catLevel * 1 + 1
            this.category.catId = null
            this.category.icon = ""
            this.category.name = ""
            this.category.productUnit = ""
            this.category.showStatus = 1
            this.category.sort = 0
        },
        addCategory() {
            this.$http({
                url: this.$http.adornUrl('/product/category/save'),
                method: 'post',
                data: this.$http.adornData(this.category, false)
            }).then(({ data }) => {
                this.$message({
                    message: '分类添加成功',
                    type: 'success'
                });
                this.dialogVisible = false;
                this.category.name = ''
                // 刷新菜单列表
                this.getMenus();
                // 刷新展开的节点
                this.expandedKey = [this.category.parentCid]
            })
        },
        edit(data) {
            this.dialogType = "edit"
            this.title = "编辑分类"
            this.dialogVisible = true
            // 发送请求获取当前节点最新数据
            this.$http({
                url: this.$http.adornUrl(`/product/category/info/${data.catId}`),
                method: 'get'
            }).then(({ data }) => {
                console.log(data);
                this.category.name = data.category.name
                this.category.catId = data.category.catId
                this.category.icon = data.category.icon
                this.category.productUnit = data.category.productUnit
                this.category.parentCid = data.category.parentCid
            })
        },
        editCategory() {
            var { catId, name, icon, productUnit } = this.category
            this.$http({
                url: this.$http.adornUrl('/product/category/update'),
                method: 'post',
                data: this.$http.adornData({ catId, name, icon, productUnit }, false)
            }).then(({ data }) => {
                this.$message({
                    message: '菜单修改成功',
                    type: 'success'
                });
                this.dialogVisible = false;
                // 刷新菜单列表
                this.getMenus();
                // 刷新展开的节点
                this.expandedKey = [this.category.parentCid]
            })
        },
        remove(node, data) {
            var ids = [data.catId]
            this.$confirm(`是否删除[${data.name}]菜单?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http({
                    url: this.$http.adornUrl('/product/category/delete'),
                    method: 'post',
                    data: this.$http.adornData(ids, false)
                }).then(({ data }) => {
                    this.$message({
                        message: '菜单删除成功',
                        type: 'success'
                    });
                    // 刷新菜单列表
                    this.getMenus();
                    // 刷新展开的节点
                    this.expandedKey = [this.category.parentCid]
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
    },
    created() {
        this.getMenus()
    }
}
</script>
<style scoped></style>
<template>
  <div class="app-container">
    <!--<el-row class="app-query">-->
      <!--<el-input v-model="listQuery.orgTypeName" placeholder="组织名称"  style="width: 150px;"></el-input>-->
      <!--<el-button  type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>-->
      <el-button style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">新增</el-button>
    <!--</el-row>-->

    <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 120%" @row-contextmenu="openTableMenu">

      <el-table-column :show-overflow-tooltip="true" align="left" label="组织名称">
        <template slot-scope="scope">
          <span>{{scope.row.orgTypeName}}</span>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="left" label="组织编号">
        <template slot-scope="scope">
          <span>{{scope.row.orgType}}</span>
        </template>
      </el-table-column>


    </el-table>
    <menu-context ref="menuContext">
      <menu-context-item @click="handleUpdate">编辑</menu-context-item>
      <!--<menu-context-item @click="handleDelete">删除</menu-context-item>-->
    </menu-context>
   <!-- <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNum" :page-sizes="[5,10,15,20]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.total">
      </el-pagination>
    </div>-->
    <div class="el-dialog-customer">
      <el-dialog :title="textMap[dialogorgType]" :visible.sync="dialogFormVisible" width="30%">
        <el-form :rules="rules" ref="customerForm" :model="customerFormData" label-position="right" label-width="80px" style='width: 90%; margin-left:15px;'>

          <el-form-item label="组织名称" prop="orgTypeName">
            <el-input v-model="customerFormData.orgTypeName"></el-input>
          </el-form-item>
          <el-form-item v-if="dialogorgType=='create'" label="组织编号" prop="orgTypeName">
            <el-input v-model="customerFormData.orgType"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="editData">确认</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import {orglist,editorg,create} from '@/api/org'
    export default {
        data() {
            const validateEnterpriseFun = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('所属企业不能为空'))
                } else {
                    callback()
                }
            }
            return {
                list: null,
              listQuery: {
                total:50,
                pageNum:1,
                pageSize:5,
                orgTypeName:""
              },
                orgTypeArray:[
                    {value:0,label:'否'},
                    {value:1,label:'是'}
                ],
                enterpriseOption:[],
                textMap: {
                    update: '编辑',
                    create: '新增'
                },
                dialogorgType: '',
                dialogFormVisible: false,
                customerFormData: {
                    orgTypeName:'',
                    orgType:1,
                },
                rules: {
                    enterpriseId: [
                        { required: true, trigger: 'blur', validator: validateEnterpriseFun}
                    ],
                    orgTypeName: [
                        { required: true, message: '组织名称不能为空', trigger: 'blur' }
                    ],
                },
                listLoading: true,
            }
        },
        created() {
            Promise.all([this.initEnterpriseList()]).then(()=>{this.getList()})
        },
        methods: {
            openTableMenu(row, event) {
                this.$refs.menuContext.openTableMenu(row,event);
            },
            initEnterpriseList(){

            },
            handleFilter() {
                this.listQuery.pageNum = 1
                this.getList()
            },
            getList() {
                this.listLoading = true
                orglist().then(response => {

                    const data=response.data.data

                    this.list=data

                    this.listLoading = false
                })
            },
            resetTemp() {
                this.customerFormData = {
                    orgTypeName:'',
                    orgType:'',
                }
            },
            handleCreate() {
                this.resetTemp()
                this.dialogorgType = 'create'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['customerForm'].clearValidate()
                })
            },
            handleUpdate(row) {
                this.customerFormData = Object.assign({}, row) // copy obj
                this.dialogorgType = 'update'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['customerForm'].clearValidate()
                })
            },
            editData(){
                this.$refs.customerForm.validate(valid => {
                    if (valid) {
                      if( this.dialogorgType =='create'){
                        create({
                          orgTypeName:this.customerFormData.orgTypeName,
                          orgType:this.customerFormData.orgType
                        }).then(data=>{
                          this.dialogFormVisible = false
                          this.$message({
                            message: '成功',
                            type: 'success'
                          });
                          this.getList()
                        })
                      }else{
                        editorg({
                          orgTypeName:this.customerFormData.orgTypeName,
                          orgType:this.customerFormData.orgType
                        }).then(data=>{
                          this.dialogFormVisible = false
                          this.$message({
                            message: '成功',
                            type: 'success'
                          });
                          this.getList()
                        })
                      }
                    } else {
                        return false
                    }
                })
            },
            handleDelete(row) {
                this.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteCustomerById(row.id).then(data=>{
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.list.splice(this.list.indexOf(row), 1)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val
                this.getList()
            },
            handleCurrentChange(val) {
                this.listQuery.pageNum = val
                this.getList()
            }
        }
    }
</script>

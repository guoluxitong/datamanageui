<template>
  <div>
  <div v-if="enterprisecodevisible===0" class="app-container">
    <el-row class="app-query">
      <!--<el-input v-model="listQuery.enterpriseName" placeholder="企业名称"  style="width: 150px;"></el-input>-->
      <!--<el-button  type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>-->
      <el-button style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">新增</el-button>
    </el-row>

    <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 120%" @row-contextmenu="openTableMenu">
      <el-table-column :show-overflow-tooltip="true" align="left" label="企业名称">
        <template slot-scope="scope">
          <span>{{scope.row.enterpriseName}}</span>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="left" label="是否可用">
        <template slot-scope="scope">
          <span v-for="item in statusArray" v-if="item.value==scope.row.status">{{item.label}}</span>
        </template>
      </el-table-column>
      <el-table-column  align='center' label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="customer(scope.$index, scope.row)">企业客户管理</el-button>
          <el-button size="mini" type="success" @click="enterprise(scope.$index, scope.row)">企业编号管理</el-button>
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
    <div class="el-dialog-enterprise">
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="30%">
        <el-form :rules="rules" ref="enterpriseForm" :model="enterpriseFormData" label-position="right" label-width="80px" style='width: 90%; margin-left:15px;'>
          <el-form-item label="企业名称" prop="enterpriseName">
            <el-input v-model="enterpriseFormData.enterpriseName"></el-input>
          </el-form-item>
          <el-form-item label="是否可用">
            <el-select clearable class="filter-item" v-model="enterpriseFormData.status"  style="width: 100%">
              <el-option v-for="item in statusArray" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="editData">确认</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
    <div v-if="enterprisecodevisible===1">
      <el-button style="margin-left: 10px;" @click="handleCustomerCreate" type="primary" icon="el-icon-edit">新增</el-button>
      <el-button style="margin-left: 80%;" @click="handleCancel" type="primary" >取消</el-button>
      <el-table :data="customerList" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 120%" @row-contextmenu="openTableMenu">

        <el-table-column :show-overflow-tooltip="true" align="left" label="企业名称">
          <template slot-scope="scope">
            <span>{{enterpriseName}}</span>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="left" label="客户名称">
          <template slot-scope="scope">
            <span>{{scope.row.customerName}}</span>
          </template>
        </el-table-column>
          <el-table-column  align='center' label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="customercode(scope.$index, scope.row)">企业客户编号管理</el-button>
            </template>
          </el-table-column>
      </el-table>
      <menu-context ref="menuContext">
        <menu-context-item @click="handleCustomerUpdate">编辑</menu-context-item>
        <!--<menu-context-item @click="handleDelete">删除</menu-context-item>-->
      </menu-context>
      <!--<div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNum" :page-sizes="[5,10,15,20]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.total">
        </el-pagination>
      </div>-->
      <div class="el-dialog-customer">
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogCustomerFormVisible" width="30%">
          <el-form :rules="rules" ref="enterprisecustomerForm" :model="enterprisecustomerFormData" label-position="right" label-width="80px" style='width: 90%; margin-left:15px;'>

            <el-form-item v-if="dialogStatus=='create'" label="企业" prop="enterpriseId">
              <el-autocomplete
                v-model="enterpriseName"
                :fetch-suggestions="querySearchAsyncuser"
                placeholder="企业"
                @select="((item)=>{handleSelectuser(item)})"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item label="客户名称" prop="customerName">
              <el-input v-model="enterprisecustomerFormData.customerName"></el-input>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogCustomerFormVisible = false">取消</el-button>
            <el-button type="primary" @click="editCustomerData">确认</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <div v-if="enterprisecodevisible===2">
      <el-button style="margin-left: 10px;" @click="handleCodeCreate" type="primary" icon="el-icon-edit">新增</el-button>
      <el-button style="margin-left: 80%;" @click="handleCodeCancel" type="primary" >取消</el-button>
      <el-table :data="customerCodeList" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 120%" >

        <el-table-column :show-overflow-tooltip="true" align="left" label="客户名称">
          <template slot-scope="scope">
            <span>{{scope.row.customerName}}</span>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="left" label="编号">
          <template slot-scope="scope">
            <span>{{scope.row.code}}</span>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="left" label="是否可用">
          <template slot-scope="scope">
            <span v-for="item in statusArray" v-if="item.value==scope.row.status">{{item.label}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="el-dialog-customer">
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogCustomerCodeFormVisible" width="30%">
          <el-form :rules="rules" ref="customerForm" :model="enterprisecustomerCodeFormData" label-position="right" label-width="80px" style='width: 90%; margin-left:15px;'>

            <el-form-item label="企业客户" >
              <el-input v-model="enterpriseCustomerId"></el-input>
            </el-form-item>
            <el-form-item label="编号" prop="code">
              <el-input v-model="enterprisecustomerCodeFormData.code"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogCustomerCodeFormVisible = false">取消</el-button>
            <el-button type="primary" @click="editCodeData">确认</el-button>
          </div>
        </el-dialog>
      </div>
    </div >
    <div  v-if="enterprisecodevisible===3">
      <el-button style="margin-left: 10px;" @click="handleEnterpriseCreate" type="primary" icon="el-icon-edit">新增</el-button>
      <el-button style="margin-left: 80%;" @click="handleEnterpriseCancel" type="primary" >取消</el-button>
      <el-table :data="enterpriseCodeList" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 120%" @row-contextmenu="openTableMenu">
        <el-table-column :show-overflow-tooltip="true" align="left" label="企业名称">
          <template slot-scope="scope">
            <span>{{scope.row.enterpriseName}}</span>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="left" label="编号">
          <template slot-scope="scope">
            <span>{{scope.row.codePrefix}}</span>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="left" label="是否可用">
          <template slot-scope="scope">
            <span v-for="item in statusArray" v-if="item.value==scope.row.status">{{item.label}}</span>
          </template>
        </el-table-column>

      </el-table>
      <menu-context ref="menuContext">
        <menu-context-item @click="handleEnterpriseUpdate">编辑</menu-context-item>
      </menu-context>
      <!--<div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNum" :page-sizes="[5,10,15,20]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.total">
        </el-pagination>
      </div>-->
      <div class="el-dialog-customer">
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogCodeFormVisible" width="30%">
          <el-form :rules="rules" ref="enterpriseForm" :model="enterpriseCodeFormData" label-position="right" label-width="80px" style='width: 90%; margin-left:15px;'>
            <el-form-item v-if="dialogStatus =='create'" label="企业" prop="enterpriseId">
              <el-autocomplete
                v-model="enterpriseName"
                :fetch-suggestions="querySearchAsyncuser"
                placeholder="企业"
                @select="((item)=>{handleSelectuser(item)})"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item v-if="dialogStatus =='create'"  label="编号" prop="codePrefix">
              <el-input v-model="enterpriseCodeFormData.codePrefix"></el-input>
            </el-form-item>
            <el-form-item label="是否可用">
              <el-select clearable class="filter-item" v-model="enterpriseCodeFormData.status"  style="width: 100%">
                <el-option v-for="item in statusArray1" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogCodeFormVisible = false">取消</el-button>
            <el-button type="primary" @click="editEnterpriseData">确认</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
    import {getEnterpriseListByConditionAndPage,editEnterprise,create,deleteEnterpriseById} from '@/api/enterprise'
    import {enterprisecodelist,editenterprisecode,createPrefix} from '@/api/enterpriseCode'
    import {enterprisecustomerlist,editenterprisecustomer,createcustomer} from '@/api/enterpriseCustomer'
    import {enterprisecustomercodelist,editenterprisecustomercode} from '@/api/enterpriseCustomerCode'
    export default {
        data() {
            return {
                list: null,
              customerList:null,
              customerCodeList:null,
              enterpriseCodeList:null,
              listQuery: {
                    total:50,
                    pageNum:1,
                    pageSize:5,
                    enterpriseName:null
                },
              enterpriseName: '',
              listQuery1: {
                total:50,
                pageNum:1,
                pageSize:5,
                enterpriseId:"",
                customerName:""
              },
              listQuery2: {
                total:50,
                pageNum:1,
                pageSize:5,
                enterpriseCustomerId:"",
                code:"",
                codePrefix: ''
              },
              listQuery3: {
                total:50,
                pageNum:1,
                pageSize:5,
                enterpriseId:"",
                codePrefix: ''
              },
                statusArray:[
                    {value:0,label:'否'},
                    {value:1,label:'是'}
                ],
              statusArray1:[
                {value:0,label:'否'},
                {value:1,label:'是'}
              ],
                textMap: {
                    update: '编辑',
                    create: '新增'
                },
              enterpriseCustomerId: '',
                dialogStatus: '',
                dialogFormVisible: false,
              dialogCodeFormVisible: false,
                dialogCustomerFormVisible: false,
              dialogCustomerCodeFormVisible: false,
                enterpriseFormData: {
                    id:'',
                    enterpriseName:'',
                    status:1
                },
              enterpriseCodeFormData: {
                  id:'',
                enterpriseId:"",
                codePrefix: '',
                status:1
              },
              enterprisecustomerFormData: {
                enterpriseId:'',
                customerName:'',
                id:'',
                status:1
              },
              enterprisecustomerCodeFormData: {
                enterpriseCustomerId:"",
                code:"",
                codePrefix:'',
              },
              enterpriseList:[],
              enterprisecodevisible:0,
                rules: {
                  enterpriseId: [
                    { required: true, message: '企业id不能为空', trigger: 'blur' }
                  ],
                  customerName: [
                    { required: true, message: '客户名称不能为空', trigger: 'blur' }
                  ],
                    enterpriseName: [
                        { required: true, message: '企业名称不能为空', trigger: 'blur' }
                    ],
                  enterpriseCustomerId: [
                    { required: true, message: '企业客户Id不能为空', trigger: 'blur' }
                  ],
                  code: [
                    { required: true, message: '编号不能为空', trigger: 'blur' }
                  ],
                  codePrefix: [
                    { required: true, message: '编号不能为空', trigger: 'blur' }
                  ],
                },
                listLoading: true,
            }
        },
        created() {
            this.getList()
        },
        methods: {
          querySearchAsyncuser(queryString, callback) {
            getEnterpriseListByConditionAndPage().then(response => {
              this.enterpriseList = [];
              var results = [];
              for (let i = 0, len = response.data.data.length; i < len; i++) {
                response.data.data[i].value = response.data.data[i].enterpriseName;
              }
              this.enterpriselist = response.data.data;
              results = queryString ? this.enterpriselist.filter(this.createFilteruser(queryString)) : this.enterpriselist;
              callback(results);
            });
          },

          createFilteruser(queryString, queryArr) {
            return (queryArr) => {
              return (queryArr.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
          },
          handleSelectuser(item) {
            this.enterpriseCodeFormData.enterpriseId=item.id
            this.enterprisecustomerFormData.enterpriseId=item.id
          },
          customercode(index,row){
            this.enterprisecodevisible=2;
            this.listQuery2.enterpriseCustomerId=row.id;
            this.enterpriseCustomerId=row.id;
            this.getCustomerCodeList()
          },
          customer(index,row){
            this.enterprisecodevisible=1;
            this.listQuery1.enterpriseId=row.id;
            this.enterpriseName=row.enterpriseName;
            this.enterprisecustomerFormData.status=row.status;
            this.getCustomerList()
          },
          enterprise(index,row){
            this.enterprisecodevisible=3;
            this.listQuery3.enterpriseId=row.id;
            this.getEnterpriseList()
          },
          getEnterpriseList() {
            this.listLoading = true;
            enterprisecodelist().then(response => {
              console.log(response);
              const data=response.data.data;
              this.enterpriseCodeList=data;
              this.listLoading = false
            })
          },
          getCustomerList() {
            this.listLoading = true;
            enterprisecustomerlist(this.listQuery1).then(response => {
              const data=response.data.data;
              this.customerList=data;
              this.listLoading = false
            })
          },
          getCustomerCodeList() {
            this.listLoading = true;
            enterprisecustomercodelist(this.listQuery2).then(response => {

              const data=response.data.data;

              this.customerCodeList=data;

              this.listLoading = false
            })
          },
            openTableMenu(row, event) {
                this.$refs.menuContext.openTableMenu(row,event);
            },
            handleFilter() {
                this.listQuery.pageNum = 1;
                this.getList()
            },
            getList() {
                this.listLoading = true;
                getEnterpriseListByConditionAndPage().then(response => {
                  const data=response.data.data;
                  this.list=data;
                  this.listLoading = false
                })
            },
            resetTemp() {
                this.enterpriseFormData = {
                    id:'',
                    enterpriseName:'',
                    status:1
                }
            },
          handleCancel(){
            this.enterprisecodevisible=0;
          },
          handleCodeCancel(){
            this.enterprisecodevisible=1;
          },
          handleEnterpriseCancel(){
            this.enterprisecodevisible=0;
          },
          handleCodeCreate(){
            this.enterprisecustomerCodeFormData={
              enterpriseCustomerId:"",
                code:"",
              codePrefix:'',
            };
            this.dialogStatus = 'create';
            this.dialogCustomerCodeFormVisible=true;
            this.$nextTick(() => {
              this.$refs['customerForm'].clearValidate()
            })
          },
          handleEnterpriseCreate(){
            this.enterpriseCodeFormData={
              enterpriseId:'',
                codePrefix: '',
                status:1
            };
            this.dialogStatus = 'create';
            this.dialogCodeFormVisible=true;
            this.$nextTick(() => {
              this.$refs['enterpriseForm'].clearValidate()
            })
          },
            handleCreate() {
                this.resetTemp();
                this.dialogStatus = 'create';
                this.dialogFormVisible = true;
              this.$nextTick(() => {
                this.$refs['enterpriseForm'].clearValidate()
              })
            },
          handleCustomerCreate() {
            this.enterprisecustomerFormData={
                  id:'',
                enterpriseId:'',
                customerName:''
            };
            this.dialogStatus = 'create';
            this.dialogCustomerFormVisible = true;
            this.$nextTick(() => {
              this.$refs['enterprisecustomerForm'].clearValidate()
            })
          },
          handleCustomerUpdate(row) {
            this.enterprisecustomerFormData = Object.assign({}, row) ;// copy obj
            this.dialogStatus = 'update';
            this.dialogCustomerFormVisible = true;
            this.$nextTick(() => {
              this.$refs['enterprisecustomerForm'].clearValidate()
            })
          },
          handleEnterpriseUpdate(row){
            this.enterpriseCodeFormData = Object.assign({}, row) ;// copy obj
            this.dialogStatus = 'update';
            this.dialogCodeFormVisible = true;
            this.$nextTick(() => {
              this.$refs['enterpriseForm'].clearValidate()
            })
          },
          editEnterpriseData(){
            this.$refs.enterpriseForm.validate(valid => {
              if (valid) {
                if(  this.dialogStatus =='create'){
                  createPrefix({
                    enterpriseId:this.enterpriseCodeFormData.enterpriseId,
                    prefix: this.enterpriseCodeFormData.codePrefix,
                  }).then(data=>{
                    this.dialogCodeFormVisible = false;
                    this.$message({
                      message: '成功',
                      type: 'success'
                    });
                    this.getEnterpriseList()
                  })
                }else{
                  editenterprisecode({
                    enterpriseId:this.enterpriseCodeFormData.id,
                    status: this.enterpriseCodeFormData.status,
                  }).then(data=>{
                    this.dialogCodeFormVisible = false;
                    this.$message({
                      message: '成功',
                      type: 'success'
                    });
                    this.getEnterpriseList()
                  })
                }
              } else {
                return false
              }
            })
          },
          editCodeData(){
            this.enterprisecustomerCodeFormData.enterpriseCustomerId=this.enterpriseCustomerId;
            this.$refs.customerForm.validate(valid => {
              if (valid) {
                editenterprisecustomercode({
                  enterpriseCustomerId:this.enterprisecustomerCodeFormData.enterpriseCustomerId,
                  code:this.enterprisecustomerCodeFormData.code,
                }).then(data=>{
                  this.dialogCustomerCodeFormVisible = false;
                  this.$message({
                    message: '成功',
                    type: 'success'
                  });
                  this.getCustomerCodeList()
                })
              } else {
                return false
              }
            })
          },
          editCustomerData(){
            this.$refs.enterprisecustomerForm.validate(valid => {
              if (valid) {
                if(this.dialogStatus =='create'){
                  createcustomer({
                    enterpriseId:this.enterprisecustomerFormData.enterpriseId,
                    customerName:this.enterprisecustomerFormData.customerName,
                    status:1
                  }).then(data=>{
                    this.dialogCustomerFormVisible = false;
                    this.$message({
                      message: '成功',
                      type: 'success'
                    });
                    this.getCustomerList()
                  })
                }else{
                  editenterprisecustomer({
                    id:this.enterprisecustomerFormData.id,
                    customerName:this.enterprisecustomerFormData.customerName,
                  }).then(data=>{
                    this.dialogCustomerFormVisible = false;
                    this.$message({
                      message: '成功',
                      type: 'success'
                    });
                    this.getCustomerList()
                  })
                }

          } else {
            return false
          }
        })
          },
            handleUpdate(row) {
                this.enterpriseFormData = Object.assign({}, row) ;// copy obj
                this.dialogStatus = 'update';
                this.dialogFormVisible = true;
              this.$nextTick(() => {
                this.$refs['enterpriseForm'].clearValidate()
              })
            },
            editData(){
              this.$refs.enterpriseForm.validate(valid => {
                if (valid) {
                  if( this.dialogStatus =='create'){
                    create({
                      enterpriseName:this.enterpriseFormData.enterpriseName,
                      status:this.enterpriseFormData.status
                    }).then(data=>{
                      this.dialogFormVisible = false;
                      this.$message({
                        message: '成功',
                        type: 'success'
                      });
                      this.getList()
                    })
                  }else{
                    editEnterprise({
                      id:this.enterpriseFormData.id,
                      enterpriseName:this.enterpriseFormData.enterpriseName,
                      status:this.enterpriseFormData.status
                    }).then(data=>{
                      this.dialogFormVisible = false;
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
                    deleteEnterpriseById(row.id).then(data=>{
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
                this.listQuery.pageSize = val;
                this.getList()
            },
            handleCurrentChange(val) {
                this.listQuery.pageNum = val;
                this.getList()
            }
        }
    }
</script>

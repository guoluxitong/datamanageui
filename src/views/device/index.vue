<template>
  <div>
  <div v-if="!deviceTypeVisible" class="app-container">
    <el-row class="app-query">
      <el-col :span="3">
      <el-autocomplete
        v-model="enterpriseList.enterpriseName"
        :fetch-suggestions="querySearchAsyncuser"
        placeholder="所属企业"
        @select="((item)=>{handleSelectuser(item)})"
      ></el-autocomplete>
      </el-col>
      <el-col :span="2">
      <el-button  type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      </el-col>
      <el-col :span="3">
      <el-input clearable v-model="suffix" placeholder="设备编号"  style="width: 150px;"></el-input>
      </el-col>
      <el-col :span="2">
      <el-button  type="primary" icon="el-icon-search" @click="handleSuffixFilter">查询</el-button>
      </el-col>
      <el-col :span="2">
      <el-button  type="success" icon="el-icon-plus" @click="handleCreate">新增</el-button>
      </el-col>
      <el-col :span="2">
      <el-button  type="primary"  @click="handleDeviceType">设备类型管理</el-button>
      </el-col>
    </el-row>

    <el-table :data="list.slice((currentPage1-1)*pageSize1,currentPage1*pageSize1)" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 120%" @row-contextmenu="openTableMenu">
      <el-table-column align="left" :show-overflow-tooltip="true" label="设备编号">
        <template slot-scope="scope">
          <span>{{scope.row.deviceSuffix}}</span>
        </template>
      </el-table-column>
     <!-- <el-table-column v-if="enterpriseList.enterpriseName!=''" align="left" :show-overflow-tooltip="true"  label="企业名称">
        <template slot-scope="scope">
          <span>{{enterpriseList.enterpriseName}}</span>
        </template>
      </el-table-column>-->
      <el-table-column align="left" :show-overflow-tooltip="true" label="设备类型">
        <template slot-scope="scope">
          <span>{{scope.row.deviceType}}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" :show-overflow-tooltip="true"  label="导入时间">
        <template slot-scope="scope">
          <span>{{dateFormat(scope.row.importDatetime)}}</span>
        </template>
      </el-table-column>
    </el-table>
    <menu-context ref="menuContext">
      <menu-context-item @click="handleUpdate">编辑</menu-context-item>
      <!--<menu-context-item @click="handleDelete">删除</menu-context-item>-->
    </menu-context>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
        :current-page="currentPage1"
        :page-sizes="[5]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.length"
      ></el-pagination>
    </div>
    <div class="el-dialog-device">
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="40%">
        <el-form ref="DeviceFormData" :model="deviceFormData" label-position="right" label-width="80px" style='width: 90%; margin-left:15px;'>

          <el-row v-if="dialogStatus=='create'">
            <el-col :span="12">
              <el-form-item label="设备类型" prop="deviceType">
                <el-autocomplete
                  v-model="deviceFormData.deviceType"
                  :fetch-suggestions="querySearchAsyncuser3"
                  placeholder="设备类型"
                  @select="((item)=>{handleSelectuser3(item)})"
                ></el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业" prop="enterpriseId">
                <el-autocomplete
                  v-model="enterpriseList.enterpriseName"
                  :fetch-suggestions="querySearchAsyncuser"
                  placeholder="企业"
                  @select="((item)=>{handleSelectuser(item)})"
                ></el-autocomplete>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="dialogStatus!='create'">
            <el-col :span="12">
              <el-form-item label="设备编码" prop="devicePrefix">
                <el-input v-model="deviceFormData.devicePrefix"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否可用" prop="status">
                <el-select clearable class="filter-item" v-model="deviceFormData.status" >
                  <el-option v-for="item in statusArray1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-col v-if="dialogStatus=='create'" :span="12">
              <el-form-item label="起始设备编号" prop="deviceSuffix">
                <el-input v-model="deviceFormData.deviceSuffix"></el-input>
              </el-form-item>
            </el-col>
            <el-col v-if="dialogStatus!='create'" :span="12">
              <el-form-item label="设备编号" prop="deviceSuffix">
                <el-input v-model="deviceFormData.deviceSuffix"></el-input>
              </el-form-item>
            </el-col>
            <el-col  v-if="dialogStatus!='create'" :span="12">
              <el-form-item label="设备类型" prop="deviceType">
                <el-autocomplete
                  v-model="deviceFormData.deviceType"
                  :fetch-suggestions="querySearchAsyncuser3"
                  placeholder="设备类型"
                  @select="((item)=>{handleSelectuser3(item)})"
                ></el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col  v-if="dialogStatus=='create'" :span="12">
              <el-form-item label="结束设备编号" prop="deviceEndSuffix">
                <el-input v-model="deviceFormData.deviceEndSuffix"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="editData">确认</el-button>
          <el-button icon="el-icon-back" type="warning" @click="dialogFormVisible = false">取消</el-button>
        </div>
      </el-dialog>
    <!--  <el-dialog title="生成二维码" :visible.sync="dialogQRCodeFormVisible" width="30%">
        <el-form :rules="qRCodeRules" ref="qRCodeForm" :model="qRCodeFormData" label-position="right" label-width="80px" style='width: 80%; margin-left:30px;'>
          <el-form-item label="开始编号" prop="startSuffix">
            <el-input v-model="qRCodeFormData.startSuffix"></el-input>
          </el-form-item>
          <el-form-item label="结束编号" prop="endSuffix">
            <el-input v-model="qRCodeFormData.endSuffix"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogQRCodeFormVisible = false">取消</el-button>
          <el-button type="primary" @click="generateQRCode">生成</el-button>
        </div>
      </el-dialog>-->
    </div>
  </div>
    <div v-if="deviceTypeVisible">
      <el-row class="app-query">
        <!--<el-input v-model="listQuery.deviceType" placeholder="设备类型名称"  style="width: 150px;"></el-input>-->
        <!--<el-button  type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>-->
        <el-col :span="22">
        <el-button  @click="handleDeviceTypeCreate" type="success" icon="el-icon-plus">新增</el-button>
        </el-col>
        <el-col :span="2">
        <el-button  @click="handleCenal" icon="el-icon-back" type="warning" >取消</el-button>
        </el-col>
      </el-row>

      <el-table :data="deviceTypeList.slice((currentPage1-1)*pageSize1,currentPage1*pageSize1)" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 120%" @row-contextmenu="openTableMenu">
        <el-table-column :show-overflow-tooltip="true" align="left" label="设备类型名称">
          <template slot-scope="scope">
            <span>{{scope.row.deviceType}}</span>
          </template>
        </el-table-column>
      </el-table>
      <menu-context ref="menuContext">
        <menu-context-item @click="handleDeviceTypeUpdate">编辑</menu-context-item>
        <!--<menu-context-item @click="handleDelete">删除</menu-context-item>-->
      </menu-context>
      <div class="pagination-container">
        <el-pagination
          background
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
          :current-page="currentPage1"
          :page-sizes="[5]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="deviceTypeList.length"
        ></el-pagination>
      </div>
      <div class="el-dialog-enterprise">
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dilogdeviceTypeVisible" width="30%">
          <el-form :rules="qRCodeRules" ref="deviceTypeForm" :model="deviceTypeFormData" label-position="right" label-width="80px" style='width: 90%; margin-left:15px;'>
            <el-form-item  label="设备类型名称" prop="deviceType">
              <el-input v-model="deviceTypeFormData.deviceType"></el-input>
            </el-form-item>
           <!-- <el-form-item v-if="dialogStatus!='create'" label="设备类型" prop="deviceType">
              <el-autocomplete
                v-model="deviceFormData.deviceType"
                :fetch-suggestions="querySearchAsyncuser3"
                placeholder="设备类型"
                @select="((item)=>{handleSelectuser3(item)})"
              ></el-autocomplete>
            </el-form-item>-->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="editDeviceTypeData">确认</el-button>
            <el-button icon="el-icon-back" type="warning" @click="dilogdeviceTypeVisible = false">取消</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import {fuelArray,mediumArray} from '@/utils/common'
  import {formatDateTime} from '@/utils/date'
  import {getDeviceListByEnterpriseIdAndPage,getDeviceList,getDeviceListBySuffix,insertDevice,editDevice,deleteDeviceById} from '@/api/device'
  import {getEnterpriseListByConditionAndPage} from '@/api/enterprise'
  import {getCustomerListByConditionAndPage} from '@/api/customer'
  import {getDeviceTypeListByConditionAndPage,createdeviceType,editdeviceType,deletedeviceTypebyid} from '@/api/device-type'
  export default {
    data() {
      return {
        list:[],
        deviceTypeList:[],
        suffix:'',
       DeviceList1:
          {
            prefix:'',
            deviceType:'',
            suffix:'',
            saleStatus:'',
          },
        currentPage1: 1,
        pageNum1: 1,
        pageSize1: 5,
        deviceList:[],
        deviceAddList:
          {
            deviceType:'',
            enterpriseId:'',
            deviceSuffix:'',
            subType:'',
            deviceNo:''
          },
        addDeviceTypeList:[],
        deviceNoList:{},
        enterpriseOption:[],
        customerOption:[],
        enterpriseList:{
          id:'',
          enterpriseName:''
        },
        customerList:{
          id:'',
          customerName:''
        },
       deviceTypeFormData: {
        id:'',
        deviceType:'',
      },
        listQuery2: {
          total:50,
          pageNum:1,
          pageSize:5,
          deviceType:null
        },
        listQuery: {
          total:50,
          pageNum:1,
          pageSize:5,
         suffix:null,
          customerNo:null,
          enterpriseId:null,
          status:null,
          runStatus:null,
    /*      onlineStates:null,*/
          saleDatetime:null
        },
        statusArray1:[
          {value:0,label:'否'},
          {value:1,label:'是'}
        ],
        isOrNotArray:[
          {value:1,label:'是'},
          {value:0,label:'否'}
        ],
     /*   isOrbool:[
          {value:1,label:'✔'},
          {value:0,label:''}
        ],*/
        /*✖*/
        deviceTypeOption:[],
        textMap: {
          update: '编辑',
          create: '新增'
        },
        deviceTypeVisible:false,
        dilogdeviceTypeVisible:false,
        fuelArray:fuelArray,
        mediumArray:mediumArray,
        dialogStatus: '',
        dialogFormVisible: false,
        deviceFormData: {
          devicePrefix: '',
          deviceEndSuffix:'',
         status: '',
          enterpriseId:'',
          deviceType:'',
          deviceSuffix:'',
          subType:'',
          deviceNo:'',
        },
        dialogQRCodeFormVisible:false,
        qRCodeFormData:{
          startSuffix:'',
          endSuffix:''
        },
        qRCodeRules: {
          startSuffix: [
            { required: true, message: '开始编号不能为空', trigger: 'blur' }
          ],
          endSuffix: [
            { required: true, message: '结束编号不能为空', trigger: 'blur' }
          ],
          deviceType : [
            { required: true, message: '设备类型名称不能为空', trigger: 'blur' }
          ]
        },
        listLoading:false
      }
    },
    filters: {
      statusFilterLabel(status,dictaryList){
        return dictaryList.filter(item => {
          return item.value==status
        })
      }
    },
    created() {
     /* this. getDeviceList()*/
    },
    methods: {
      dateFormat: function(time) {
        var date = new Date(time);
        var year = date.getFullYear();
        /* 在日期格式中，月份是从0开始的，因此要加0
         * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
         * */
        var month =
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours =
          date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes =
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        // 拼接
        return (
          year +
          "-" +
          month +
          "-" +
          day +
          " " +
          hours +
          ":" +
          minutes +
          ":" +
          seconds
        );
      },
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
        this.listQuery.enterpriseId = item.id;
        this.deviceFormData.enterpriseId=item.id
      },
      querySearchAsyncuser2(queryString, callback) {
        getCustomerListByConditionAndPage().then(response => {
          this.customerList = [];
          var results = [];
          for (let i = 0, len = response.data.data.length; i < len; i++) {
            response.data.data[i].value = response.data.data[i].customerName;
          }
          this.customerList = response.data.data;
          results = queryString ? this.customerList.filter(this.createFilteruser2(queryString)) : this.customerList;
          callback(results);
        });
      },

      createFilteruser2(queryString, queryArr) {
        return (queryArr) => {
          return (queryArr.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelectuser2(item) {
        this.listQuery.customerId = item.id;

      },
      querySearchAsyncuser3(queryString, callback) {
        getDeviceTypeListByConditionAndPage(this.listQuery2).then(response => {
          this.addDeviceTypeList = [];
          var results = [];
          for (let i = 0, len = response.data.data.length; i < len; i++) {
            response.data.data[i].value = response.data.data[i].deviceType;
          }
          this.addDeviceTypeList = response.data.data;
          results = queryString ? this.addDeviceTypeList.filter(this.createFilteruser3(queryString)) : this.addDeviceTypeList;
          callback(results);
        });
      },

      createFilteruser3(queryString, queryArr) {
        return (queryArr) => {
          return (queryArr.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelectuser3(item) {
      },
      initCustomerList(){
        let customerOption=[]
        getCustomerListByConditionAndPage().then(data=>{

          data.data.data.forEach(item=>{
            customerOption.push({value:item.id+"",label:item.customerName})
          })
          this.customerOption=customerOption

        })
      },
      openTableMenu(row, event) {
        this.$refs.menuContext.openTableMenu(row,event);
      },
      handleFilter() {
        this.currentPage1=1
        this.getList()
      },
      getDeviceTypeList() {
        this.listLoading = true
        getDeviceTypeListByConditionAndPage(this.listQuery2).then(response => {
          const data=response.data.data

          this.deviceTypeList=data

          this.listLoading = false
        })
      },
      getList() {
        this.listLoading = true
        getDeviceListByEnterpriseIdAndPage(this.listQuery.enterpriseId).then(response => {
          const data=response.data.data
          this.list=data;
          this.listLoading = false
        })
      },
      getListBySuffix() {
        this.listLoading = true
        getDeviceListBySuffix(this.suffix).then(response => {
          const data=response.data.data
          this.deviceNoList=data;
          this.list=[];
          this.list.push(this.deviceNoList)
          this.listLoading = false
        })
      },
      handleCustomerFilter() {
        this.currentPage1=1
        this.getCustomerList()
      },
      handleSuffixFilter(){
        this.currentPage1=1
        this.getListBySuffix()
      },
      getDeviceList() {
        this.listLoading = true
        getDeviceList().then(response => {
          const data=response.data.data
          this.list=data
          this.listLoading = false
        })
      },
      resetTemp() {
        this.deviceFormData={
          devicePrefix: '',
          status: '',
          enterpriseId:'',
            deviceType:'',
            deviceSuffix:'',
            subType:'',
            deviceNo:'',
        };
      },
      handleDeviceTypeUpdate(row){
        this.deviceTypeFormData = Object.assign({}, row) // copy obj
        this.dialogStatus = 'update'
        this.dilogdeviceTypeVisible = true
        this.$nextTick(() => {
          this.$refs['deviceTypeForm'].clearValidate()
        })
      },
      handleDeviceTypeCreate() {
        this.deviceTypeFormData={
          id:'',
            deviceType:'',
        },
        this.dialogStatus = 'create'
        this.dilogdeviceTypeVisible = true
        this.$nextTick(() => {
          this.$refs['deviceTypeForm'].clearValidate()
        })
      },
      editDeviceTypeData(){
        this.$refs.deviceTypeForm.validate(valid => {
          if (valid) {
            if( this.dialogStatus =='create'){
              createdeviceType({
                typeName:this.deviceTypeFormData.deviceType
              }).then(data=>{
                if(data.data.code==0){
                  this.dilogdeviceTypeVisible = false
                  this.$message({
                    message: '成功',
                    type: 'success'
                  });
                  this.getDeviceTypeList();
                }else{
                  this.$message.error(data.data.msg)
                  return
                }
              })
            }else{
              editdeviceType({
                typeName:this.deviceTypeFormData.deviceType,
                id:this.deviceTypeFormData.id
              }).then(data=>{
                if(data.data.code==0){
                  this.dilogdeviceTypeVisible = false
                  this.$message({
                    message: '成功',
                    type: 'success'
                  });
                  this.getDeviceTypeList();
                }else {
                  this.$message.error(data.data.msg)
                  return
                }
              })
            }

          } else {
            return false
          }
        })
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['DeviceFormData'].clearValidate()
        })
      },
      handleDeviceType(){
        this.deviceTypeVisible=true;
        this.currentPage1=1
        this.getDeviceTypeList();
      },
      handleCenal(){
        this.currentPage1=1
        this.deviceTypeVisible=false;
      },
      handleGenerateQRCode(){
        this.qRCodeFormData.startSuffix=''
        this.qRCodeFormData.endSuffix=''
        this.dialogQRCodeFormVisible = true
        this.$nextTick(() => {
          this.$refs['qRCodeForm'].clearValidate()
        })
      },
      handleUpdate(row) {
        this.deviceFormData = Object.assign({}, row) // copy obj
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['DeviceFormData'].clearValidate()
        })
      },
      generateQRCode(){
        this.$refs.qRCodeForm.validate(valid => {
          if (valid) {
            this.dialogQRCodeFormVisible = false
            window.open(process.env.BASE_API+'/device/generateqrcode?startSuffix='+this.qRCodeFormData.startSuffix+'&endSuffix='+this.qRCodeFormData.endSuffix, "_blank");
          } else {
            return false
          }
        })
      },
      editData(){
        this.$refs.DeviceFormData.validate(valid => {
          if (valid) {

            var deviceList =[];
            if( this.dialogStatus == 'create'){
              for(var i=0 ; i<this.deviceFormData.deviceEndSuffix-this.deviceFormData.deviceSuffix+1;i++){
                var deviceAddList={
                  deviceType:'',
                  enterpriseId:'',
                  deviceSuffix:'',
                  subType:'',
                  deviceNo:''
                };
                deviceAddList.deviceType=this.deviceFormData.deviceType,
                  deviceAddList.enterpriseId=this.deviceFormData.enterpriseId,
                 deviceAddList.deviceSuffix=(parseInt(this.deviceFormData.deviceSuffix)+i).toString(),
                  deviceAddList.subType=this.deviceFormData.deviceType,
                  deviceAddList.deviceNo=(parseInt(this.deviceFormData.deviceSuffix)+i).toString()
              deviceList.splice(i,0,deviceAddList)

              }
              insertDevice(deviceList).then(data=>{
                if(data.data.code==0){
                  this.dialogFormVisible = false
                  this.$message({
                    message: "成功",
                    type: 'success'
                  });
                }else {
                  this.$message.error(data.data.msg)
                }
              })
            }else{
              this.DeviceList1.prefix=this.deviceFormData.devicePrefix,
                this.DeviceList1.deviceType=this.deviceFormData.deviceType,
                this.DeviceList1.suffix=this.deviceFormData.deviceSuffix,
                this.DeviceList1.saleStatus=this.deviceFormData.status,
              editDevice(this.DeviceList1).then(data=>{
                if(data.data.code==0){
                  this.dialogFormVisible = false
                  this.$message({
                    message: "成功",
                    type: 'success'
                  });
                  if(this.suffix==''){
                    this.getList()
                  }else{
                    this. getListBySuffix();
                  }
                }else {
                  this.$message.error(data.data.msg)
                  return
                }
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
          deleteDeviceById(row.id).then(data=>{
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
      handleSizeChange1: function(pageSize) {
        this.pageSize1 = pageSize;
        this.handleCurrentChange1(this.currentPage);
      },
      handleCurrentChange1: function(currentPage) {
        //页码切换
        this.currentPage1 = currentPage;
      }
    }
  }
</script>

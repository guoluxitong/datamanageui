<template>
  <div class="app-container role-container">
    <el-row class="app-query">
      <el-input v-model="listQuery.roleName" placeholder="角色名称"  style="width: 150px;"></el-input>
      <el-button  type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">新增</el-button>
    </el-row>

    <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 120%" @row-contextmenu="openTableMenu">
      <el-table-column :show-overflow-tooltip="true" align="left" label="角色名称">
        <template slot-scope="scope">
          <span>{{scope.row.roleName}}</span>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="left" label="描述">
        <template slot-scope="scope">
          <span>{{scope.row.roleDesc}}</span>
        </template>
      </el-table-column>
    </el-table>
    <menu-context ref="menuContext">
      <menu-context-item @click="handleUpdate">编辑</menu-context-item>
      <menu-context-item @click="handleEditResource">分配权限</menu-context-item>
      <menu-context-item @click="handleDelete">删除</menu-context-item>
    </menu-context>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNum" :page-sizes="[5,10,15,20]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.total">
      </el-pagination>
    </div>
    <div class="el-dialog-role">
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="30%">
        <el-form :rules="rules" ref="roleForm" :model="roleFormData" label-position="right" label-width="80px" style='width: 90%; margin-left:15px;'>
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="roleFormData.roleName"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="roleFormData.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="editData">确认</el-button>
        </div>
      </el-dialog>
    </div>
    <div  class="el-dialog-resource">
      <el-dialog title="分配权限" :visible.sync="dialogResourceFormVisible" width="15%">
        <el-form :rules="rules" ref="resourceForm" :model="resourceFormData" label-position="right" label-width="80px" style='width: 70%; margin-left:30px;'>
          <el-tree :data="resourceFormData.resourceList" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :props="resourceFormData.defaultProps" :default-checked-keys="resourceFormData.idArray">
          </el-tree>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogResourceFormVisible = false">取消</el-button>
          <el-button type="primary" @click="editResource">确认</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {getRoleListByConditionAndPage,editRole,editRoleResource,deleteRoleById} from '@/api/role'
  import { getResourceListByCondition,getResourceIdListByRoleId} from '@/api/resource'
  export default {
    data() {
      return {
        list: null,
        listQuery: {
          total:50,
          pageNum:1,
          pageSize:5,
          roleName:null
        },
        textMap: {
          update: '编辑',
          create: '新增'
        },
        dialogStatus: '',
        dialogFormVisible: false,
        roleFormData: {
          roleId:'',
          roleName:'',
          roleDesc:''
        },
        rules: {
          roleName: [
            { required: true, message: '角色名称不能为空', trigger: 'blur' }
          ]
        },
        dialogResourceFormVisible:false,
        resourceFormData:{
          idArray:[],
          userId:'',
          roleId:'',
          resourceList: [],
          defaultProps: {
            children: 'children',
            label: 'label'
          }
        },
        listLoading: true,
      }
    },
    created() {
      this.getList()
    },
    methods: {
      openTableMenu(row, event) {
        this.$refs.menuContext.openTableMenu(row,event);
      },
      handleFilter() {
        this.listQuery.pageNum = 1
        this.getList()
      },
      getList() {
        this.listLoading = true
        getRoleListByConditionAndPage(this.listQuery).then(response => {
          const data=response.data.data
          this.list=data.list
          this.listQuery.total=data.total
          this.listQuery.pageNum=data.pageNum
          this.listQuery.pageSize=data.pageSize
          this.listLoading = false
        })
      },
      resetTemp() {
        this.roleFormData = {
          roleId:'',
          roleName:'',
          roleDesc:''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['roleForm'].clearValidate()
        })
      },
      handleUpdate(row) {
        this.roleFormData = Object.assign({}, row) // copy obj
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['roleForm'].clearValidate()
        })
      },
      editData(){
        this.$refs.roleForm.validate(valid => {
          if (valid) {
            editRole(this.roleFormData).then(data=>{
              this.dialogFormVisible = false
              this.$message({
                message: '成功',
                type: 'success'
              });
              this.getList()
            })
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
          deleteRoleById(row.roleId).then(data=>{
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
      },
      handleEditResource(row){
        this.resourceFormData.idArray=[]
        getResourceListByCondition().then(response => {
          const allResourceList=response.data.data
          const resourceList=this.filterFirstLevelResource(allResourceList, 0);
          resourceList.forEach(item=>{
            item.children=this.getChildResourceList(item.id,allResourceList)
          })
          this.resourceFormData.resourceList=resourceList
          return getResourceIdListByRoleId(row.roleId);
        }).then(response=>{
          let idArray=[]
          response.data.data.forEach(resource=>{
            idArray.push(resource.id)
          })
          this.resourceFormData.roleId=row.roleId
          this.resourceFormData.idArray=idArray
          this.dialogResourceFormVisible = true
          this.$nextTick(() => {
            this.$refs['resourceForm'].clearValidate()
          })
        })
      },
      editResource(){
        let parentIdArray=[];
        let childIdArray=[];
        this.$refs.tree.getCheckedNodes().forEach(node=>{
          if(parentIdArray.indexOf(node.parentId)==-1){
            parentIdArray.push(node.parentId)
          }
          childIdArray.push(node.id)
        })
        let idArray=[]
        parentIdArray.concat(childIdArray).forEach(id=>{
          if(idArray.indexOf(id)==-1&&id!=0){
            idArray.push(id)
          }
        })
        let roleResourceList=[]
        idArray.forEach(id=>{
          roleResourceList.push({roleId:this.resourceFormData.roleId,resourceId:id})
        })
        editRoleResource({roleId:this.resourceFormData.roleId,roleResourceList:roleResourceList}).then(response=>{
          this.dialogResourceFormVisible = false
          this.$message({
            message: '分配成功',
            type: 'success'
          })
          this.getList()
        })
      },
      filterFirstLevelResource(menus, menu_level){
        const firstLevelResourceList = menus.filter(item => {
          return item.parentId==menu_level;
        })
        return this.reGenerateResourceTreeData(firstLevelResourceList);
      },
      getChildResourceList(id,resoruceList=[]){
        let childResourceList=[]
        resoruceList.forEach(item=>{
          if(id==item.parentId){
            childResourceList.push(item)
          }
        })
        childResourceList=this.reGenerateResourceTreeData(childResourceList)
        childResourceList.forEach(item=>{
          item.children=this.getChildResourceList(item.id,resoruceList)
        })
        return childResourceList
      },
      reGenerateResourceTreeData(resourceList){
        let reGenerateResourceList=[]
        resourceList.forEach(resource=>{
          reGenerateResourceList.push({id:resource.id,parentId:resource.parentId,label:resource.name})
        })
        return reGenerateResourceList
      }
    }
  }
</script>

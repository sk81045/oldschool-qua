<template>
    <base-content>
        <div class="row base-card-shadow" style="margin: 8px;background-color: white">
          <div class="col" style="border-right: 1px solid rgba(0,0,0,0.12)">
              <div class="flex justify-between align-center items-center" style="font-size: 1.32rem;margin: 15px;">
                <span class="text-weight-bold">部门列表</span>
                <q-btn outline color="primary" :loading="loading" label="刷新" @click="refresh" />
              </div>
              <q-separator/>
              <template>
              <div class="col-md-4 col-sm-4 col-xs-12">
              <q-scroll-area ref="scrollArea" style="height: calc(95vh - 124px);" :thumb-style="thumbStyleOfMenu">
              <div class="q-pa-md">
              <div class="v-md-plugin-tip tip" style="width: 97%;border-color: #1976d2;">
            <p class="v-md-plugin-tip-title">提示</p>
            <p data-v-md-line="6" style="font-size: 12px;"> 
              1.目前部门最大分级为3级，删除部门则整个部门成员也将被移出。
            </p>
              <p data-v-md-line="6" style="font-size: 12px;"> 
             2.添加成员请点击第三级子部门即可获取成员列表，根据右上角的提示操作即可。
            </p>
            </div>
      <!-- <q-btn outline color="primary" size="sm"  type="submit" :loading="loading" label="添加一级部门" @click="addNode"/> -->
      <q-btn size="sm" color="primary" label="添加一级部门" :loading="loading" @click="addNode"></q-btn>
    <vue-tree-list
      @click="onClick"
      @change-name="onChangeName"
      @delete-node="onDel"
      @add-node="onAddNode"
      :model="treeData"
      default-tree-node-name="新部门"
      default-leaf-node-name="封闭部门"
      v-bind:default-expanded="false"
    >
      <template v-slot:leafNameDisplay="slotProps">
        <span>
          <!-- {{ slotProps.model.name }} <span class="muted">#{{ slotProps.model.id }}</span> -->
          {{ slotProps.model.name }}
        </span>
      </template>
      <span >添加</span>
<!--       <span class="icon" slot="addLeafNodeIcon">＋</span>
      <span class="icon" slot="editNodeIcon">📃</span>
      <span class="icon" slot="delNodeIcon">✂️</span> -->
      <span slot="treeNodeIcon"><q-icon name="people" style="font-size:1.5rem;"/></span>
    </vue-tree-list>
   <!-- <q-btn outline color="primary" :loading="loading" label="Get new tree" @click="getNewTree"/> -->
     <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="desktop_access_disabled" color="red" text-color="white" />
          <span class="q-ml-sm">确定删除这个部门（下级部门与成员也将被删除）? </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" v-close-popup />
          <q-btn flat label="确定" color="primary" v-close-popup @click="deleteData(Node)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="removeDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="desktop_access_disabled" color="red" text-color="white" />
          <span class="q-ml-sm">确定将所选成员移出这个部门？ </span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" v-close-popup />
          <q-btn flat label="确定" color="primary" v-close-popup @click="removeMembers(true)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

      <q-dialog v-model="addDialog" persistent>
      <q-card style="width: 90%;">
        <q-card-section>
          <div class="text-h6">未分配部门的成员列表</div>
        </q-card-section>
         <Table-Teacher ref="TableTeacher"> </Table-Teacher>
        <q-card-actions align="right">
          <q-btn flat label="关闭" color="primary" v-close-popup />
          <q-btn flat label="添加" color="primary" v-close-popup @click="addMembers(true)"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
 </div>
              </q-scroll-area>
              </div>
              </template>
          </div>
          <div class="col-md">
            <div class="flex justify-between align-center items-center" style="font-size: 1.32rem;margin: 15px;height: 36px">
              <span class="text-weight-bold">部门成员</span>
                <q-btn-group outline>
                  <q-btn outline color="primary" :label=CheckTitle icon="check_circle_outline" @click="membersAllCheck(allCheckStatus)"/>
                  <q-btn outline color="primary" label="向该部门添加成员" icon="person_add" @click="addMembers()"/>
                  <q-btn outline color="primary" label="将选中的成员移出该部门" icon="person_remove" @click="removeMembers(false)"/>
              </q-btn-group>
            </div>
            <q-separator/>
            <div style="margin: 0 0 0 20px;">
            <div class="flex justify-between align-center items-center" style="font-size: 1rem;margin: 15px;height: 5px">
            <p class="text-weight-bold">{{ department }} 成员 ({{Members.length}}) 人</p>
            <!-- <p  v-els class="text-weight-bold">{{ department }} 成员列表({{Members.length}})人</p> -->
            </div>
            <div class="span" style="height:15px"></div>
            <q-separator style="width: 95%;"></q-separator>
            <q-scroll-area ref="scrollArea" style="height: calc(95vh - 124px);" :thumb-style="thumbStyleOfMenu">
            <div class="q-pa-md">
          <div class=" relative-position card-example">
            <div class="text-h7" v-if="Members.length">
              <q-inner-loading :showing="loading">
                  <q-spinner-gears size="50px" color="primary" />
              </q-inner-loading>
              <q-checkbox v-for="(person,index) in Members" :key="index" v-model="checkedMembers" :val="person.id" :label="person.name"/>
              </div>
                <div v-else class="rt" style="color: #6666;" >无数据....</div>
            </div>
            </div>
          </q-scroll-area>
            </div>
          </div>
        </div>
    </base-content>
</template>
<script>
  import BaseContent from '@/components/BaseContent/BaseContent'
  import TableTeacher from '@/components/Table/Teacher'
  import { thumbStyleOfMenu } from '@/components/BaseContent/ThumbStyle'
  import { VueTreeList, Tree, TreeNode } from 'vue-tree-list'
  import { getList,getMember,saveData,renewData,deleteData} from '@/api/Department'
  import { removeMembers,addMembers} from '@/api/Department'

  export default {
    components: {
      VueTreeList,
      TableTeacher,
 BaseContent 
    },
    data() {
      return {
        thumbStyleOfMenu,
        loading:false,
        visible: false,
        formData:{},
        newTree: {},
        treeData: [],
        confirm: false,
        removeDialog:false,
        addDialog:false,
        Node:{},
        department:'',
        departmentId:'',
        TreeNodeNewName:'新部门',
        checkedMembers: [],
        Members: [],
        CheckTitle:'全选',
        allCheckStatus: false,
      }
    },
    mounted(){
      this.getList()
    },
    methods: {
      getList() {
        this.loading = true
        getList( {} ).then(res => {
        if (res.data.code == 200) {
          this.loading = false
          console.log(res.data)
          this.treeData = new Tree(res.data.result)
        }else{

        }
      }).catch(error => {
        console.log(error)
        })
      },

      onClick(node) {
        if(node.isEnd){ //判断是否为树的最底层,获取底层部门成员
            this.getMember({id:node.id})
            this.department = ''
            Object.keys(node).forEach( function(key){
              if(key == 'parent'){
                if(node[key].parent){
                    if(node[key].parent.name != 'root'){
                      console.log('1',node[key].parent.name)
                      this.department += node[key].parent.name+' / '
                    }
                }

                if(node[key].name != 'root'){
                    this.department += node[key].name+' / '
                    console.log('2',node[key].id)
                }
              }
            },this)

            if(node.name != 'root'){
              this.department += node.name+' / '
              this.departmentId = node.id
              console.log('tail',node)
            }
        }
      },
      getMember(data) {
        this.loading = true
        getMember(data).then(res=>{
          if (res.data.code == 200) {
            this.loading = false
            console.log(res.data)
            this.Members = res.data.result
          }
        }).catch(error => { console.log(error) })
      },

      onDel(node) {
        var ids = []
        ids[ids.length] = node.id
        if(node.children){
          console.log('存在子部门并执行删除')
          for(var i = 0; i < node.children.length; i++){
            ids[ids.length] = node.children[i].id
            if(node.children[i].children){
                for(var s = 0; s < node.children[i].children.length; s++){
                      ids[ids.length] = node.children[i].children[s].id
                }
            }
          }
        }else{
          console.log('删除部门')
          ids[0] = node.id
        }
        node.ids = ids.toString() 
        this.Node = node 
        this.confirm = true
      },
      deleteData(node) {
        this.loading = true
        let data = {}
        data.ids = node.ids
        // data.children = node.children
        deleteData( data ).then(res => {
        if (res.data.code == 200) {
          node.remove()
          this.Members = []
          this.loading = false
          this.$q.notify({
              icon: 'insert_emoticon',
              message: '删除成功',
              color: 'green',
              position: 'top',
              timeout: 5000
          })
        }else{

        }
      }).catch(error => {
        console.log(error)
      })
      },
      onChangeName(params) {
        console.log(params)
        if(params.eventType != "blur"){
            return false
        }
        this.loading = true
        let data = {}
        data.id = params.id
        data.name = params.newName
        renewData( data ).then(res => {
        if (res.data.code == 200) {
          this.loading = false
          this.$q.notify({
              icon: 'insert_emoticon',
              message: '修改成功',
              color: 'green',
              position: 'top',
              timeout: 5000
          })
        }else{

        }
      }).catch(error => {
        console.log(error)
      })
      },

      onAddNode(node) {
        if(node.parent.gradingBan){
          this.$q.notify({
              icon: 'sentiment_very_dissatisfied',
              message: '操作失败:已超出该部门的最大分级数',
              color: 'red',
              position: 'top',
              timeout: 2000
          })
          this.getList()
          return false
        }

        var data = {}
        data.pid = node.pid
        data.name = node.name
        this.saveData(data)  
      },

      addNode(params) {
        console.log(params)
        var node = new TreeNode({ name: this.TreeNodeNewName, isLeaf: false })
        if (!this.treeData.children) this.treeData.children = []
        this.saveData({name:this.TreeNodeNewName},node)  
      },

      saveData(data,node = '') {
        this.loading = true
        console.log(data)
        saveData( data ).then(res => {
        if (res.data.code == 200) {
          this.loading = false
          // this.treeData.addChildren(node)
          this.getList()
          this.$q.notify({
              icon: 'insert_emoticon',
              message: '操作成功',
              color: 'green',
              position: 'top',
              timeout: 5000
          })
        }else{

        }
      }).catch(error => {
        console.log(error)
      })
      },

      /*
      *
      *========成员操作===========
      *
      */
      membersAllCheck(status) {
        let arr = [];
        if(status == false){
          this.allCheckStatus = true
          this.CheckTitle = "反选"
          Object.keys(this.Members).forEach( function(key){
              arr[key] = this.Members[key].id
          },this)
          this.checkedMembers = arr 
        }else{
          this.allCheckStatus = false
          this.CheckTitle = "全选"
          this.checkedMembers = [] 
        }
      },
      addMembers(status = false) {
        if(!this.departmentId){
            this.$q.notify({
              icon: 'insert_emoticon',
              message: '请选择一个部门',
              color: 'deep-orange',
              position: 'top',
              timeout: 5000
          })
          return false
        }

        if(status == false){
          this.addDialog = true
          return false
        }

        if(!this.$refs.TableTeacher.selected.length){
            this.$q.notify({
              icon: 'insert_emoticon',
              message: '没有选择成员',
              color: 'deep-orange',
              position: 'top',
              timeout: 5000
          })
          return false
        }
        console.log('selected', this.departmentId)
        addMembers(  {department: this.departmentId , ids: this.$refs.TableTeacher.selected} ).then(res => {
          if (res.data.code == 200) {
            this.getMember({id:this.departmentId})
            this.loading = false
            this.$q.notify({
              icon: 'insert_emoticon',
              message: '操作成功',
              color: 'green',
              position: 'top',
              timeout: 5000
            })
          }
        }).catch(error => {console.log(error)})
  
      },
      removeMembers(status = false) {
         console.log('this.checkedMembers',this.checkedMembers)
        if(!this.checkedMembers.length){
            this.$q.notify({
              icon: 'insert_emoticon',
              message: '没有选择成员',
              color: 'deep-orange',
              position: 'top',
              timeout: 5000
          })
          return false
        }
        if(status == false){
          this.removeDialog = true
          return false
        }
        removeMembers( this.checkedMembers ).then(res => {
          if (res.data.code == 200) {
          for(let i = this.checkedMembers.length - 1; i >= 0; i--) {
            this.Members.splice(i,1)
          }
            this.checkedMembers = []
            this.loading = false
            this.$q.notify({
              icon: 'insert_emoticon',
              message: '操作成功',
              color: 'green',
              position: 'top',
              timeout: 5000
            })
          }
        }).catch(error => {console.log(error)})
      },

      /*
      *==========end===============
      */

      getNewTree() {
        var vm = this
        function _dfs(oldNode) {
          var newNode = {}

          for (var k in oldNode) {
            if (k !== 'children' && k !== 'parent') {
              newNode[k] = oldNode[k]
            }
          }

          if (oldNode.children && oldNode.children.length > 0) {
            newNode.children = []
            for (var i = 0, len = oldNode.children.length; i < len; i++) {
              newNode.children.push(_dfs(oldNode.children[i]))
            }
          }
          return newNode
        }

        vm.newTree = _dfs(vm.treeData)
      },
      refresh() {
        this.getList()
      },
    }
  }
</script>

<style>
.vtl .vtl-drag-disabled {
  background-color: #d0cfcf;
}
.vtl .vtl-drag-disabled:hover {
  background-color: #d0cfcf;
}
.vtl .vtl-disabled {
  background-color: #d0cfcf;
}
</style>

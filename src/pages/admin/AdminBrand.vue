<template>
  <div class="admin-user">
    <div class="edit-user">
      <el-button @click="ui.formVisible = true">修改/创建品牌</el-button>
      <!-- <div class="search f-right">
        <form @submit.prevent="search">
          <el-input placeholder="搜索品牌" prefix-icon="el-icon-search" v-model="keyword" clearable></el-input>
          <button type="submit" hidden></button>
        </form>
      </div> -->
    </div>
    <div class="form-edit" v-if="ui.formVisible">
      <form @submit.prevent="createOrUpdate">
        <div class="input-field">
          <el-input type="text" placeholder="品牌名" v-model="form.name" />
          <div class="error-list">
            <div class="error" v-for="(invalid, e) in errors.name" :key="e.id">
              <span v-if="invalid">{{rules.name[e].msg}}</span>
            </div>
          </div>
        </div>
        <div class="input-field">
          <el-button native-type="submit">提交</el-button>
        </div>
      </form>
    </div>
    <div class="table-user">
      <el-table :data="list" style="width: 100%" max-height="500">
        <el-table-column fixed prop="name" label="品牌名"></el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="remove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination text-center">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="readParam.limit"
          :current-page="readParam.page"
          @current-change="flip"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import admin from "../../mixin/admin";
export default {
  mixins: [admin],
  data() {
    return {
      model: "brand",
      rules: {
        name: {
          unique: {
            params: ["brand", "exists", "name"],
            msg: "品牌名已存在"
          },
          required: {
            msg: "此项为必填项"
          },
        },
      },
      keyword: ""
    };
  },
  methods: {}
};
</script>

<style scoped>
.admin-user {
  padding: 1em;
}

.edit-user,
.cancel {
  margin-bottom: 20px;
}

.edit-user button {
  margin-bottom: 1em;
}

.table-user {
  border: 1px solid #ccc;
  padding: 5px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(46, 61, 73, 0.08);
}

.input-field {
  margin-bottom: .5em;
}
</style>

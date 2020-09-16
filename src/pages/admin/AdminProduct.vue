<template>
  <div class="admin-user">
    <div class="edit-user">
      <el-button @click="ui.formVisible = true">创建/修改商品</el-button>
      <!-- <div class="search f-right">
        <form @submit.prevent="search">
          <el-input placeholder="搜索品牌" prefix-icon="el-icon-search" v-model="keyword" clearable></el-input>
          <button type="submit" hidden></button>
        </form>
      </div>-->
    </div>
    <div class="form-edit" v-if="ui.formVisible">
      <form @submit.prevent="createOrUpdate">
        <el-row class="input-field">
          <el-col :span="3" class="title">商品名称：</el-col>
          <el-col :span="21">
            <el-input type="text" v-model="form.title" />
            <div class="error-list">
              <div class="error" v-for="(invalid, e) in errors.title" :key="e.id">
                <span v-if="invalid">{{rules.title[e].msg}}</span>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="input-field">
          <el-col :span="3" class="title">商品价格：</el-col>
          <el-col :span="21">
            <el-input type="text" v-model="form.price" />
            <div class="error-list">
              <div class="error" v-for="(invalid, e) in errors.price" :key="e.id">
                <span v-if="invalid">{{rules.price[e].msg}}</span>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="input-field">
          <el-col :span="3">
            <div class="title">商品品牌：</div>
          </el-col>
          <el-col :span="21">
            <Dropdown
              api="brand/read"
              searchBy="name"
              displayBy="name"
              :onSelect="makeSelect('brand_id')"
              glassName="el-input__inner"
            ></Dropdown>
            <div class="error-list">
              <div class="error" v-for="(invalid, e) in errors.brand_id" :key="e.id">
                <span v-if="invalid">{{rules.brand_id[e].msg}}</span>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="input-field">
          <el-col :span="3" class="title">商品分类：</el-col>
          <el-col :span="21">
            <Dropdown
              api="cat/read"
              searchBy="name"
              displayBy="name"
              :onSelect="makeSelect('cat_id')"
              glassName="el-input__inner"
            ></Dropdown>
            <div class="error-list">
              <div class="error" v-for="(invalid, e) in errors.cat_id" :key="e.id">
                <span v-if="invalid">{{rules.cat_id[e].msg}}</span>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="input-field">
          <el-col :span="3" class="title">商品运费：</el-col>
          <el-col :span="21">
            <el-input type="text" v-model="form.shipping_fee" />
            <div class="error-list">
              <div class="error" v-for="(invalid, e) in errors.shipping_fee" :key="e.id">
                <span v-if="invalid">{{rules.shipping_fee[e].msg}}</span>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="input-field">
          <el-col :span="3" class="title">商品库存：</el-col>
          <el-col :span="21">
            <el-input type="text" v-model="form.total" />
            <div class="error-list">
              <div class="error" v-for="(invalid, e) in errors.total" :key="e.id">
                <span v-if="invalid">{{rules.total[e].msg}}</span>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="input-field spec-prop">
          <el-col :span="3" class="title">商品属性：</el-col>
          <el-col :span="21">
            <el-input size="mini" placeholder="属性名称，如：颜色" v-model="propForm.key" />
            <el-input
              size="mini"
              placeholder="具体属性，多个属性请用 “|” 分开，如：红色|蓝色|黑色|绿色"
              v-model="propForm.value"
            />
            <el-button size="mini" @click="addProp">添加</el-button>
            <div class="show-prop">
              <div v-for="(value, key, index) in form.prop" :key="index">
                <span class="prop-group">
                  <span>{{key}}：</span>
                  <span>{{value}}</span>
                </span>
                <el-button size="mini" @click="propEdit(key,value)">编辑</el-button>
                <el-button size="mini" @click="propDelete(key)">删除</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="input-field">
          <el-col :span="3" class="title">新品：</el-col>
          <el-col :span="21">
            <el-switch v-model="form.is_new" active-color="#13ce66" inactive-color="#aaa"></el-switch>
            <!-- <div class="error-list">
              <div class="error" v-for="(invalid, e) in errors.price" :key="e.id">
                <span v-if="invalid">{{rules.price[e].msg}}</span>
              </div>
            </div>-->
          </el-col>
        </el-row>
        <el-row class="input-field">
          <el-col :span="3" class="title">热卖：</el-col>
          <el-col :span="21">
            <el-switch v-model="form.is_hot" active-color="#13ce66" inactive-color="#aaa"></el-switch>
            <!-- <div class="error-list">
              <div class="error" v-for="(invalid, e) in errors.price" :key="e.id">
                <span v-if="invalid">{{rules.price[e].msg}}</span>
              </div>
            </div>-->
          </el-col>
        </el-row>
        <el-row class="input-field">
          <el-col :span="3" class="title">首页轮播：</el-col>
          <el-col :span="21">
            <el-switch v-model="form.is_carousel" active-color="#13ce66" inactive-color="#aaa"></el-switch>
            <!-- <div class="error-list">
              <div class="error" v-for="(invalid, e) in errors.price" :key="e.id">
                <span v-if="invalid">{{rules.price[e].msg}}</span>
              </div>
            </div>-->
            <div v-if="form.is_carousel">
              <Uploader @uploadSuccess="carouselUploaded" :autoUpload="true"></Uploader>
              <div v-if="form.carousel_img" class="thumbnail-container">
                <img :src="form.carousel_img"/>
                <el-button
                  @click="removeMainCover(index)"
                  size="mini"
                  class="thumbnail-delete"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                ></el-button>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="input-field">
          <el-col :span="3" class="title">首页广告：</el-col>
          <el-col :span="21">
            <el-switch v-model="form.is_top_banner" active-color="#13ce66" inactive-color="#aaa"></el-switch>
            <!-- <div class="error-list">
              <div class="error" v-for="(invalid, e) in errors.price" :key="e.id">
                <span v-if="invalid">{{rules.price[e].msg}}</span>
              </div>
            </div>-->
            <div v-if="form.is_top_banner">
              <Uploader @uploadSuccess="topBannerUploaded" :autoUpload="true"></Uploader>
              <div v-if="form.top_banner_img" class="thumbnail-container">
                <img :src="form.top_banner_img"/>
                <el-button
                  @click="removeMainCover(index)"
                  size="mini"
                  class="thumbnail-delete"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                ></el-button>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="input-field">
          <el-col :span="3" class="title">添加主图：</el-col>
          <el-col :span="21">
            <Uploader @uploadSuccess="singleCoverUploaded" :autoUpload="true"></Uploader>
            <el-row class="uploaded-img" :gutter="6">
              <el-col :span="6" v-for="(item, index) in form.main_img" :key="index">
                <div class="thumbnail-container">
                  <img :src="fileUrl(item)" :alt="item._original_name" />
                  <el-button
                    @click="removeMainCover(index)"
                    size="mini"
                    class="thumbnail-delete"
                    type="danger"
                    icon="el-icon-delete"
                    circle
                  ></el-button>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="input-field">
          <el-col :span="3" class="title">详情描述：</el-col>
          <el-col :span="21">
            <el-button size="mini" @click="insertDesc('text')">插入文字</el-button>
            <el-button size="mini" @click="insertDesc('image')">插入图片</el-button>
            <div class="preview">
              <div class="segment" v-for="(item, index) in form.detail" :key="index">
                <el-button size="mini" @click="removeSeg(index)">删除</el-button>
                <div v-if="item.type === 'text'">
                  <el-input type="textarea" v-model="item.value"></el-input>
                </div>
                <div v-else>
                  <Uploader
                    @uploadSuccess="singleDescImageUploaded($event, index)"
                    :autoUpload="true"
                  ></Uploader>
                  <div v-if="item.value">
                    <img :src="fileUrl(item.value)" />
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="input-field">
          <el-button type="primary" native-type="submit">提交</el-button>
          <el-button @click="ui.formVisible = false">取消</el-button>
        </div>
      </form>
    </div>
    <div class="table-user">
      <el-table :data="list" style="width: 100%" max-height="500">
        <el-table-column fixed prop="title" label="名称" min-width="150"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="total" label="库存"></el-table-column>
        <el-table-column prop="$brand.name" label="品牌"></el-table-column>
        <el-table-column prop="$cat.name" label="分类" min-width="50"></el-table-column>
        <el-table-column label="主图" min-width="100">
          <template slot-scope="scope">
            <span
              class="thunbnail-img-table"
              v-for="(img, index) in scope.row.main_img"
              :key="index"
            >
              <img :src="fileUrl(img)" />
            </span>
          </template>
        </el-table-column>
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
import { fileUrl } from "../../lib/helper";
import admin from "../../mixin/admin";
import Dropdown from "../../components/Dropdown";
import Uploader from "../../components/Uploader";
export default {
  mixins: [admin],
  components: { Dropdown, Uploader },
  data() {
    return {
      model: "product",
      propForm: {},
      rules: {
        title: {
          required: {
            msg: "此项为必填项"
          }
        },
        cat_id: {
          required: {
            msg: "此项为必填项"
          }
        },
        brand_id: {
          required: {
            msg: "此项为必填项"
          }
        },
        price: {
          required: {
            msg: "此项为必填项"
          },
          min: {
            params: [0],
            msg: "价格不可小于0"
          }
        },
        shipping_fee: {
          min: {
            params: [0],
            msg: "运费不可小于0"
          }
        },
        total: {
          min: {
            params: [0],
            msg: "库存不可小于0"
          }
        }
      },
      readParam: {
        with: [
          "belongs_to:cat",
          "belongs_to:brand"
          // {
          //   model       : 'cat',
          //   relation    : 'belongs_to',
          //   foreign_key : 'parent_id',
          // },
        ]
      },
      keyword: ""
    };
  },
  methods: {
    fileUrl,
    addProp() {
      let pf = this.propForm;
      let f = this.form;
      if (!pf.key || !pf.value) {
        return;
      }
      f.prop ? f.prop : this.$set(f, "prop", {});
      this.$set(f.prop, this.propForm.key, this.propForm.value);
      this.propForm = {};
    },
    propEdit(key, value) {
      this.$set(this.propForm, "key", key);
      this.$set(this.propForm, "value", value);
    },
    propDelete(key) {
      this.$delete(this.form.prop, key);
    },
    removeMainCover(index) {
      this.form.main_img.splice(index, 1);
    },
    singleCoverUploaded(r) {
      let f = this.form;

      if (!f.main_img) {
        this.$set(f, "main_img", []);
      }

      this.form.main_img.push(r);
    },
    carouselUploaded(data) {
      this.form.carousel_img = fileUrl(data);
    },
    topBannerUploaded(data) {
      this.form.top_banner_img = fileUrl(data);
    },
    singleDescImageUploaded(img, index) {
      this.updateDesc(index, img);
    },
    insertDesc(type) {
      if (!this.form.detail) {
        this.$set(this.form, "detail", []);
      }
      this.form.detail.push({ type });
    },
    updateDesc(index, value) {
      this.$set(this.form.detail[index], "value", value);
    },
    removeSeg(index) {
      this.form.detail.splice(index, 1);
    }
  }
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

.prop-group {
  border: 1px dashed #999;
  padding: 0.2em;
}

.table-user {
  border: 1px solid #ccc;
  padding: 5px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(46, 61, 73, 0.08);
}

.input-field {
  margin-bottom: 0.8em;
  line-height: 2.4em;
}

.thunbnail-img-table img {
  display: inline-block;
  max-width: 40px;
  border: 1px solid #ddd;
}

.title {
  color: #666;
  margin-bottom: 0.2em;
}

.show-prop {
  font-size: 0.9em;
}

.show-prop button {
  margin-left: 0.2em;
}

.thumbnail-container {
  border: 1px solid #ddd;
  position: relative;
}

.thumbnail-delete {
  position: absolute;
  top: 0.2em;
  right: 0.2em;
}
</style>

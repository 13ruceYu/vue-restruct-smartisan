<template>
  <div>
    <div class="dropdown">
      <div class="filter">
        <input
          @focus="visible=true; reset()"
          :class="glassName"
          @blur="hideResult(); $emit('blur')"
          type="search"
          v-model="keyword"
          :placeholder="placeholderText"
        />
      </div>
      <div v-if="visible" class="list">
        <div
          @mousedown="select(it)"
          v-for="(it, i) in result"
          :key="i"
          class="option"
        >{{it[displayBy]}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../lib/api";

export default {
  props: ["list", "searchBy", "displayBy", "onSelect", "api", "glassName", 'placeholderText'],
  data() {
    return {
      visible: false,
      keyword: "",
      result: [],
      timer: null
    };
  },
  mounted() {
    if (this.api) this.filterAsync();
    else {
      this.result = [...this.list];
    }
  },
  methods: {
    hideResult() {
      setTimeout(() => {
        this.visible = false;
      }, 1);
    },
    reset() {
      this.keyword = "";
      this.select(null);
    },
    select(it) {
      if (it) this.keyword = it[this.displayBy];

      if (!it || !this.onSelect) return;

      this.onSelect(it);
    },
    filter() {
      this.result = this.list.filter(it => {
        return it[this.searchBy].includes(this.keyword);
      });
    },
    filterAsync() {
      let params = {};
      if (this.keyword)
        params = {
          query: `where("${this.searchBy}" contains "${this.keyword}")`
        };

      api(this.api, params).then(r => (this.result = r.data || []));
    },
    debounceFilterAsync() {
      if (this.timer) clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        this.filterAsync();
      }, 300);
    }
  },
  watch: {
    keyword() {
      if (this.api) this.debounceFilterAsync();
      else this.filter();
    }
  }
};
</script>

<style scoped>
.dropdown {
  display: block;
  position: relative;
}

.dropdown input {
  width: 100%;
}

.list {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.option {
  padding: 0.2rem 0.5rem;
}

.option:hover {
  background: rgba(0, 40, 180, 0.2);
}

.list {
  position: absolute;
  /*top: 33px;*/
  z-index: 100;
  width: 100%;
}
</style>

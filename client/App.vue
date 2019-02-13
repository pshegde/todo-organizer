<template>
  <div id="app">
    <v-app>
      <v-toolbar dark>
        <v-toolbar-title>Todo organizer</v-toolbar-title>
        <v-spacer/>
        <v-toolbar-items>
          <v-btn icon flat>
            <v-icon>home</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-content>
        <v-container fluid grid-list-md fill-height>
          <v-layout row wrap>
            <v-flex d-flex xs12 sm6 md4>
              <v-layout column wrap>
                <v-flex class="categories">
                  <b>Categories</b>
                  <br>
                  <div v-for="c in categories" :class="c">
                    <input type="checkbox" v-model="selectedCategories" :value="c">
                    <label for="checkbox">{{c}}</label>
                    <br>
                  </div>
                </v-flex>
                <v-flex class="new-item">
                  <b>New Item to do today</b>
                  <br>
                  <label for="name">Name:</label>
                  <input type="text" id="name" v-model="newItemName">
                  <br>
                  <label for="category">Category:</label>
                  <select v-model="newItemCategory">
                    <option v-for="catName in categories" :value="catName">{{catName}}</option>
                  </select>
                  <br>
                  <button
                    type="button"
                    @click="addItem"
                    :disabled="newItemName == '' || newItemCategory == ''"
                  >Add</button>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex class="items" xs12 sm6 md8>
              <b>Items to do :)</b>
              <br>
              {{getDate()}}
              <br>
              <div v-for="(category, index) in selectedCategories" :key="index">
                <div
                  v-for="(item, itemIndex) in items[category]"
                  :class="category"
                  :key="itemIndex"
                >{{item}}</div>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
const _ = require("lodash");
const moment = require("moment");
import Vue from "vue";
export default {
  name: "tasks",
  components: {},
  computed: {
    categories: {
      get() {
        return this.$store.state.categories;
      },
      set(v) {
        this.$store.state.categories = v;
      }
    },
    items: {
      get() {
        return this.$store.state.items;
      },
      set(v) {
        this.$store.state.items = v;
      }
    }
  },
  data: () => {
    return {
      selectedCategories: [],
      newItemName: "",
      newItemCategory: "",
      date: moment()
    };
  },
  methods: {
    getDate() {
      return this.date.format("MMM Do YYYY, dddd");
    },
    addItem() {
      if (!this.items[this.newItemCategory])
        Vue.set(this.items, this.newItemCategory, [this.newItemName]);
      else this.items[this.newItemCategory].push(this.newItemName);
    }
  },
  mounted() {
    console.log(this.$route);
    console.log(this.$route.params.date);
    this.date = this.$route.params.date;
    this.$store.dispatch("fetchCategories");
    this.$store.dispatch("fetchItems");
  },
  beforeRouteEnter(to, from, next) {
    console.log(moment(to.params.date, "MMDDYY").toString());
    if (moment(to.params.date, "MMDDYY").toString() == "Invalid Date")
      next(false);
    else {
      to.params.date = moment(to.params.date, "MMDDYY");
      next();
    }
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Times New Roman", Times, serif;
  font-size: 15px;
}

.work {
  color: orange;
}

.prep {
  color: blue;
}

.personal {
  color: green;
}

.categories {
  background-color: yellow;
}

.items {
  text-align: center;
  background-color: gray;
}

.new-item {
  background-color: white;
}

.input {
  border-style: solid !important;
}
</style>

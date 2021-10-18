<template>
  <div class="top"></div>
  <div class="btn-bar">
    <div class="prepend">
      <span class="search"><img src="../assets/search.svg" ></span>
      <input type="text" id="searchbar" v-model="search"  placeholder="Find Customers">
    </div>
    <div class="sort">
      <button @click="hidden=!hidden"><p>Filter by Name (A-Z)</p><div class="arrow"></div></button>
      <transition name="slide-fade">
        <div class="options" v-if="!hidden">
          <option @click="method3">Name (A-Z)</option>
          <option @click="method4">Name (Z-A)</option>
        </div>
      </transition>
    </div>
  </div>
  <div v-if="customers.length" @click="hidden=true" class="home">
    <div v-for="customer in filterCustomers" :key="customer.id" class="customer">
      <div class="card">
        <div class="missing">
          <img :src="method5(customer.id)">
          <div id="showbuttons">
            <button class="edit">Edit</button>
            <button class="view">View</button>
          </div>
        </div>
        <h2>{{ customer.name }}</h2>
        <div class="username">
          <router-link to="/twitter" target="_blank">@{{ customer.username }}</router-link>
        </div>
        <p class="catchphrase">"{{ customer.company.catchPhrase }}"</p>
        <div class="email">
          <img src="../assets/mail.png">
          <router-link to="/gmail" target="_blank">{{ customer.email }}</router-link>
        </div>
        <div class="address">
          <img src="../assets/marker.png">
          <div class="text">
            <p>{{ customer.address.street }}, {{ customer.address.suite }}</p>
            <p>{{ customer.address.city }}, {{ customer.address.zipcode }}</p>
            <p>{{ customer.address.geo.lat }}, {{ customer.address.geo.lng }}</p>
          </div>
        </div>
        <div class="phone">
          <img src="../assets/phone.png">
          <p>{{ customer.phone }}</p>
        </div>
        <div class="website">
          <img src="../assets/globe.png">
          <router-link to="/numinix" target="_blank">{{ customer.website }}</router-link>
        </div>
        <div class="business">
          <img src="../assets/business.png">
          <p>{{ customer.company.name }}</p>
        </div>
        <div class="bs">
          <img src="../assets/office.png">
          <p>{{ customer.company.bs }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="errorMsg" v-if="!filterCustomers.length"><h1>No customer(s) found with the search criteria.</h1></div>
</template>

<script>

export default {
  name: "Home",
  data() {
    return {
    search: '', 
    customers: [],
    photo: [],
    hidden: true,
    alphabetical: true,
    }
  },
  methods: {
    method1: function compareAZ (a, b) {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      },
      method2: function (a, b) {
        if (a.name > b.name)
          return -1;
        if (a.name < b.name)
          return 1;
        return 0;
      },
      method3: function () {
        return this.customers.sort(this.method1);
      },
      method4: function () {
        return this.customers.sort(this.method2);
      },
      method5: function (num) {
    return require('../assets/profile'+ num + '.jpg')
      },
  },
  computed: {
    filterCustomers() {
        return this.customers.filter(customer => {
          return customer.name.toLowerCase().includes(this.search.toLowerCase())
        })
    }
  },
  mounted() {
    fetch('http://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => this.customers = data)
    .catch(err => console.log(err.message))
  },
};
</script>

<style>
* {
  font-family: 'Rubik';
}
::-webkit-scrollbar {
    width: 12px;
}

::-webkit-scrollbar-track {
    border-radius: 10px;
    background: #20222320;
}

::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #20222340;
}
.prepend {
  display: flex;
  flex-direction: row;
}
.errorMsg {
  display: flex;
  color: #202223;
  font-size: 3em;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  min-height: 75vh;
  text-align: center;
} 
.errorMsg h1 {
  margin-top: -5em;
}
h2 {
  font-weight: 500;
  font-size: 2.4em;
  margin: 25px 0 0 28px;
  line-height: 28px;
  pointer-events: none;
}
.username {
  margin: 0 0 15px 27px;
}
.catchphrase {
  margin: 0 0 21px 27px;
  color: #51C5FF;
}
.email, .address, .phone, .website, .business, .bs {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 13px 29.5px;
}
.email img, .address img, .phone img, .website img, .business img, .bs img {
  width: 20px;
  height: 20px;
}
.email img {
  margin: 0 17px 0 0;
}
.address img {
  margin: -49px 17px 0 0px;
}
.phone img {
  margin: 0 17px 0 0;
}
.website img {
  margin: 0 18px 0 -1px;
}
.business img {
  margin: 0 18px 0 -1px;
}
.bs img {
  margin: -30px 18px 0 -1px;
}
.bs p:first-letter {
  display: block;
  text-transform: capitalize;
}
p {
  font-weight: 400;
  font-size: 1.6em;
  line-height: 25px;
  pointer-events: none;
}
.top {
  background: white;
  height: 91px;
  width: 100%;
}
.btn-bar {
  width: 82.43vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 78px auto 33px auto;
  justify-content: space-between;
  position: relative;
}
.btn-bar button {
  background: white;
  border: none;
  border-radius: 4px;
  height: 50px;
  width: 222px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.btn-bar p {
  font-size: 16px;
  font-weight: 400;
}
.arrow {
  margin-left: 30px;
  height: 0;
  width: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #5C5F62;
}
.sort {
  position: relative;
}
.options {
  margin-top: 4px;
  padding: 8px 10px 8px 10px;
  background: white;
  border-radius: 4px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  height: 100px;
  width: 202px;
  z-index: 999;
}
.options option {
  padding: 12.5px 23px 12.5px 8px;
  width: 170px;
  font-size: 1.6em;
  font-weight: 400;
  height: 36px;
}
.options option:hover {
  background-color: #F6F6F7;
  border-radius: 4px;
  cursor: pointer;
}
#searchbar {
  width: 546px;
  font-size: 1.6em;
  font-weight: 400;
  padding: 15.5px 0 15.5px 10px;
  border: none;
  background: white;
  border-radius: 0px 8px 8px 0px;
  border-left: none;
  cursor: pointer;
}
::placeholder {
  color: #202223;
  opacity: 1;
}
#searchbar:focus {
  outline: none;
}
.search img {
  cursor: pointer;
  background-color: white;
  border-radius:  8px 0px 0px 8px;
  padding: 1.8em 0 1.6em 2.2em;
  border-right: none;
  margin-bottom: -.17em;
}
.home {
  display: flex;
  flex-direction: row;
  max-width: 82.43vw;
  flex-wrap: wrap;
  gap: 43.5px;
  margin: 0 auto;
}
.customer {
  margin: auto;
}
.card {
  background: white;
  position: static;
  width: 363px;
  height: 757px;
  border-radius: 8px;
  flex: none;
  flex-grow: 0;
  margin: 67px 0 0 0;
}
.missing img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 8px 8px 0 0;
}
.missing{
  width: 362px;
  height: 289px;
  border-radius: 8px 8px 0 0;
  position: relative;
}
.missing:hover #showbuttons{
  display: flex;
}
#showbuttons {
  justify-content: center;
  top: 0;
  align-items: center;
  position: absolute;
  display: none;
  background: rgba(0, 0, 0, 0.27);
  width: 100%;
  height: 100%;
  border-radius: 8px 8px 0 0;
}
.edit {
  color:#1575BF;
  background: white;
  border: none;
  border-radius: 4px;
  width: 65px;
  height: 40px;
  margin-right: 15px;
}
.view {
  color: white;
  background: #1575BF;
  border: none;
  border-radius: 4px;
  width: 65px;
  height: 40px;
}
.username a {
  color: #909090;
  font-weight: 400;
  font-size: 1.6em;
  line-height: 25px;
  text-decoration: none;
  margin-bottom: 15px;
}
.username a:visited {
  color: #909090;
}
.website a, .email a {
  font-weight: 400;
  font-size: 1.6em;
  line-height: 25px;
  text-decoration: none;
  color: #202223;
}
.website a:visited, .email a:visited {
  color: #202223;
}
a:hover, .edit:hover, .view:hover {
  transform: scale(1.03);
  cursor: pointer;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease-in-out;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-4px);
  opacity: 0;
}
@media only screen and (max-width: 1100px) {
  #searchbar {
    width: 321px;
  }
  .sort button {
    width: 199px;
  }
  .options {
    width: 179px;
  }
  .options option {
    width: 147px;
  }
  .arrow {
  margin-left: 10px;
}
}
@media only screen and (max-width: 940px) {
  h1 {
    margin: 0 20px;
    font-size: .8em;
  }
  .top {
    height: 65px;
  }
  .btn-bar {
  width: 367px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 0;
  }
  .options {
    width: 179px;
    margin: 4px 0 24px 46%;
  }
  .options option {
    width: 147px;
  }
  .sort button{
  margin: 34px 0 0 46%;
  }
  .sort {
    width: 100%;
  }
  .card {
    width: 368px;
    height: 360px;
    margin: 0px auto 26px;
    position: relative;
  }
  .missing img {
    width: 112px;
    height: 116px;
    border-radius: 8px;
  }
  .missing {
    width: 112px;
    height: 116px;
    position: absolute;
    border-radius: 8px;
    top: 20px;
    right: 19px;
  }
  h2 {
    padding-top: 20px;
    font-size: 1.8em;
    max-width: 15ch;
  }
  p, a {
    font-size: 1.3em;
    line-height: 15px;
  }
  .email img, .address img, .phone img, .website img, .business img, .bs img {
    width: 13px;
    height: 13px;
  }
  .address img {
    margin: -29px 17px 0 0;
  }
.bs img {
  margin: 0 18px 0 -1px;
}
  .username {
    margin: 0 0 22px 27px;
  }
  .catchphrase {
    margin: 0 0 21px 27px;
    color: #51C5FF;
    line-height: 18px;
    max-width: 25ch;
  }
  .email {
    margin-bottom: 15px;
  }
  .website a, .email a, .username a {
  font-size: 1.3em;
  line-height: 15px;
  }
  .edit, .view {
    width: 35px;
    height: 25px;
    font-size: 11px;
    margin: 5px 0;
  }
  #showbuttons {
    border-radius: 8px;
    flex-direction: column;
  }
}
@media only screen and (max-width: 414px) {
  .card {
    margin: 0 26px 26px -12px;
  }

}
@media only screen and (max-width: 413px) {
  .card {
    width: 300px;
    height: 400px;
    margin: 0 auto 26px;
  }
  h2 {
    max-width: 10ch;
  }
  .catchphrase {
    max-width: 15ch;
  }
  #searchbar {
    width: 260px;
  }
  .options {
    margin: 4px 0 24px 33%;
  }
  .sort button{
  margin: 34px 0 24px 33%;
  }
  .sort {
    width: 80%;
  }
  .search img {
    padding: 1.7em 0 2.2em 2.2em;
  }
}
</style>
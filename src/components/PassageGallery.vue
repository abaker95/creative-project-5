<template>
  <div>
    
    <div class="content">
        <section class="passages">
           <div class="flip-card" v-for="passage in passages" v-bind:key="passage._id">
             
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <h2>{{passage.title}}</h2>
                <p>{{passage.passage}} - {{passage.speaker}}</p>
              </div>
                <div class="flip-card-back">
                  <h2>Passage from:</h2>
                  <p>"{{passage.work}}"</p>
                  <p> by {{passage.author}}</p>
                  <router-link class="link" :to="{ name: 'passage', params: { id: passage._id } }">More Details</router-link>
                </div>
              </div>
            </div> 
            <div >
                
                
                  
            </div>
            
        </section>
        
      </div>
    
  </div>
</template>

<script>
import moment from "moment";
import Passage from '@/views/Passage.vue';
export default {
  name: "PassageGallery",
  props: {
    passages: Array
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), "days") < 15)
        return moment(date).fromNow();
      else return moment(date).format("d MMMM YYYY");
    }
  }
};
</script>

<style scoped>
.link {
  color: white;
}
 /* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.flip-card {
  display: flex;
  background-color: transparent;
  width: 250px;
  height: 300px;
  border: 1px solid #f1f1f1;
  padding: 10px;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}


/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  background-color: rgb(27, 72, 109);
  color: white;
}

/* Style the back side */
.flip-card-back {
  background-color: black;
  color: white;
  transform: rotateY(180deg);
} 

/* Content */
.content {
  padding: 20px 20px 20px 20px;
}

/* Masonry */
html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

/* Masonry on large screens */
@media only screen  and (min-width : 1824px) {
  .passages {
      column-count: 5;
    }
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) and (max-width: 1823px) {
  .passages {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .passages {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .passages {
    column-count: 2;
  }
}

</style>
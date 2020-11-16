 <template>
  <div>
    <h2>Active goals</h2>
    <input type="text" ref="goal"/>
    <button @click="setGoal" >goals</button>
  </div>
</template>

<script>
import ErrorAlert from './ErrorAlert';
export default {
   Component:[
      ErrorAlert,
   ],
   data() {
     return {

     } 
   },
   methods:{
      setGoal(){
         let myGoal = this.$refs.goal.value;
         (myGoal === '') && alert('this cannot be empty')
      }
   }
}
</script>
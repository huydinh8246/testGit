new Vue({
    el: '#exercise',
    data: {
        value: ''
    },
    methods:{
        shAlert: function() {
            alert('alert');
        },
        storeValue: function(event) {
            this.value = event.target.value;
        },
    }
});
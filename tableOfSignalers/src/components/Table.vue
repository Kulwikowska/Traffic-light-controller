<template>
    <div>
        <h1>Traffic Lights Controller</h1>

        <table class="table table-hover">
            <thead>
            <tr>
                <td>Signaller ID</td>
                <td>Actions</td>
                <td>State</td>
            </tr>
            </thead>

            <tbody>
                <tr v-for="signaller in signallers">
                    <td>{{ signaller.signallerId }}</td>
                    <td>{{ signaller.active }}</td>
                    <td>{{ signaller.currentColor }}</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
        data(){
            return{
                signallers: []
            }
        },

        created: function()
        {
            this.fetchSignallers();
        },

        methods: {
            fetchSignallers()
            {
              let uri = 'http://localhost:8080/signallers';
              axios.get(uri).then((response) => {
                  this.signallers = response.data;
                  console.log(this.signallers);
              });
            }
        }
    }
</script>
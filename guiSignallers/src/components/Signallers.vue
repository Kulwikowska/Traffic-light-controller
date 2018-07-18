<template>
    <div>
        <header>
        <h1>Traffic Lights Controller</h1>
        </header>
        <table class="table table-hover">
            <thead>
            <tr>
                <td>Signaller ID</td>
                <td>Is Active</td>
                <td>State</td>
            </tr>
            </thead>

            <tbody>
                <tr v-for="signaller in signallers" :key="signaller.signallerId">
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
import io from 'socket.io-client';
import axios from 'axios';
import config from '../configuration/config'

export default {
    data() {
        return {
            signallers: [],
            socket : io(`${config.lightControllerAdress}`, {path: "/gui"})
        }
    },
    created: function() {
        this.fetchSignallers();
        this.socket.on('message', (data) => {
            this.updateView(data);
        });
    },
    methods: {
        fetchSignallers() {
            let uri = `http://${config.lightControllerAdress}/signallers`;
            axios.get(uri).then((response) => {
                this.signallers = response.data;
            });
        },
        updateView(data){
            const signaller = this.signallers.find(s => s.signallerId == data.signallerId);
            if (signaller == null){
                this.signallers.push(data);
                return;
            } 
            
            signaller.active = data.active;
            signaller.currentColor = data.currentColor;
        }
    }
}
</script>

<style>

body {
    background-color: rgb(229, 234, 236);
}

header {
    text-align: center;
    margin: 20px 0;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}
td {
    text-align: center;
}

</style>



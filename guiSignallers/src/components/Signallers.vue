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

export default {
    data() {
        return {
            signallers: [],
            // socket : io.connect('http://localhost:8080', {path: "/gui"}),
            socket : io('localhost:8080', {path: "/gui"})
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
            let uri = 'http://localhost:8080/signallers';
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

</style>



<template lang="hmtl">
<div class="center">
    <h1>Vista HTML</h1>
<table class="rwd-table">
  <tr v-for="row in rows.slice(0,1)">
    <th>{{row[0]}}</th>
    <th>{{row[1]}}</th>
    <th>{{row[2]}}</th>
    <th>{{row[3]}}</th>
    <th>{{row[4]}}</th>
  </tr>
  <tr v-for="row in rows.slice(1)">
    
    <td v-if="row[0] == 'Realizado'" ><select name="estado" v-bind:id="row[5]" @change="onChange($event)">
        <option value="Realizado">Realizado</option>
        <option value="Pagado">Pagado</option>
        <option value="Por Realizar">Por Realizar</option>
    </select></td>
    <td v-else-if="row[0] == 'Pagado'"><select name="estado" v-bind:id="row[5]" @change="onChange($event)">
        <option value="Pagado">Pagado</option>
        <option value="Realizado">Realizado</option>
        <option value="Por Realizar">Por Realizar</option>
    </select></td>
    <td v-else-if="row[0] == 'Por Realizar'"><select name="estado" v-bind:id="row[5]" @change="onChange($event)">
        <option value="Por Realizar">Por Realizar</option>
        <option value="Realizado">Realizado</option>
        <option value="Pagado">Pagado</option>
    </select></td>
    <td v-else><select name="estado" v-bind:id="row[5]" @change="onChange($event)">
        <option :value="row[0]">{{row[0]}}</option>
        <option value="Por Realizar">Por Realizar</option>
        <option value="Realizado">Realizado</option>
        <option value="Pagado">Pagado</option>
    </select></td>
    <td :class="[row[5].toString()]">{{row[1]}}</td>
    <td :class="[row[5].toString()]">{{row[2]}}</td>
    <td :class="[row[5].toString()]">{{row[3]}}</td>
    <td :class="[row[5].toString()]">{{row[4]}}</td>
  </tr>
</table>

</div>
</template>

<script>

import { mapState } from 'vuex';
import axios from "axios";

export default {
    name: 'Table',
    data() {
      return {
        query: '',
      }
    },
    mounted() {
        this.$store.dispatch('getRows');
    },
    computed: {
        ...mapState({
            rows: state => state.rows
        })
    },
    methods:{
        postMethod(url, needAuth, body) {
            if (needAuth) {
                const config = { headers: { Authorization: `Bearer ${localStorage.token}` } };
                axios.post(
                    url,
                    body,
                    config
                )
            } else {
                const config = { headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' } };
                axios.post(
                    url,
                    body,
                    config
                )
            }
        },
        onChange(event) {
            this.postMethod('https://carvuk.herokuapp.com/', true, {
				estado: event.target.value,
				ubicacion: event.target.id
			})
            if (event.target.value === 'Pagado') {
                let date = new Date()
                let day = `${(date.getDate())}`.padStart(2,'0');
                let month = `${(date.getMonth()+1)}`.padStart(2,'0');
                let year = date.getFullYear();
                var cusid_ele = document.getElementsByClassName(event.target.id);
                const body = {
				    nombre: cusid_ele[0].innerHTML,
				    servicio: cusid_ele[1].innerHTML,
                    monto: cusid_ele[2].innerHTML,
                    fecha: `${day}-${month}-${year}`
			    };
                this.postMethod('https://hooks.zapier.com/hooks/catch/12223778/ba5rfxv/', false, body);
            }
        }
    
    }
    
};
</script>

<style lang="css">
 @import 'https://fonts.googleapis.com/css?family=Montserrat:300,400,700';
 .rwd-table {
	 margin: 1em 0;
	 min-width: 300px;
}
 .rwd-table tr {
	 border-top: 1px solid #ddd;
	 border-bottom: 1px solid #ddd;
}
 .rwd-table th {
	 display: none;
}
 .rwd-table td {
	 display: block;
}
 .rwd-table td:first-child {
	 padding-top: 0.5em;
}
 .rwd-table td:last-child {
	 padding-bottom: 0.5em;
}
 .rwd-table td:before {
	 content: attr(data-th) ": ";
	 font-weight: bold;
	 width: 6.5em;
	 display: inline-block;
}
 @media (min-width: 480px) {
	 .rwd-table td:before {
		 display: none;
	}
}
 .rwd-table th, .rwd-table td {
	 text-align: left;
}
 @media (min-width: 480px) {
	 .rwd-table th, .rwd-table td {
		 display: table-cell;
		 padding: 0.25em 0.5em;
	}
	 .rwd-table th:first-child, .rwd-table td:first-child {
		 padding-left: 0;
	}
	 .rwd-table th:last-child, .rwd-table td:last-child {
		 padding-right: 0;
	}
}
 body {
	 padding: 0 2em;
	 font-family: Montserrat, sans-serif;
	 -webkit-font-smoothing: antialiased;
	 text-rendering: optimizeLegibility;
	 color: #444;
	 background: #eee;
}
 h1 {
	 font-weight: normal;
	 letter-spacing: -1px;
	 color: #34495e;
}
 .rwd-table {
	 background: #34495e;
	 color: #fff;
	 border-radius: 0.4em;
	 overflow: hidden;
     margin-left: auto;
     margin-right: auto;
}
 .rwd-table tr {
	 border-color: #46637f;
}
 .rwd-table th, .rwd-table td {
	 margin: 0.5em 1em;
}
 @media (min-width: 480px) {
	 .rwd-table th, .rwd-table td {
		 padding: 1em !important;
	}
}
 .rwd-table th, .rwd-table td:before {
	 color: #dd5;
}
.center {
    margin-left: auto;
    margin-right: auto;
}

</style>
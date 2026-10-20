<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> &#9925; Data Cuaca</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h2>Perkiraan Cuaca Di Jakarta</h2>
      <div class="card">
        <div v-for="(cuaca, i) in dataTampil" :key="i" class="data">
          <p>Waktu: {{ cuaca.waktu }}</p>
          <p>Suhu: {{ cuaca.suhu }} °C</p>
        </div>
      </div>
      <ion-button expand="block" @click="semua = !semua">{{ semua ? 'Tampilkan 10 Data' : 'Tampilkan Semua Data' }}</ion-button>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
  import{
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton 
  } from '@ionic/vue';
  import{ ref, computed, onMounted} from 'vue';
  import { ambilApi } from '../service/Api';

  const dataCuaca = ref<any[]>([])
  const semua = ref(false)
  const dataTampil = computed(() => 
  semua.value ? dataCuaca.value : dataCuaca.value.slice(0, 10))
  
  onMounted(async () => {
    const data = await ambilApi()
    dataCuaca.value = data.hourly.time.map((waktu: string, i: number) => ({
      waktu,
      suhu: data.hourly.temperature_2m[i]
    }));
  });
</script>

<style scoped>
ion-content{
  --background: #f0f8ff;
}
ion-toolbar{
  --background: #2196f3;
  --color: white;
}
h2{
  text-align: center;
  color: #1976d2;
}
.data{
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
}
.data:last-child{
  border-bottom: none;
}
.data p{
  margin-top: 0;
  color: #555;
}
.data b {
  color: #1976d2;
}
ion-button{
  margin-top: 20px;
  --background: #2196f3;
  --color: white;
}
</style>

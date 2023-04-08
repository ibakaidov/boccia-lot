<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-row>
          <v-col cols="3">
            <v-btn block color="success" @click="openTemplate">Открыть шаблон</v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn block color="success" @click="open">Выбрать файл</v-btn>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="groupsCount"
              label="Количество групп"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-btn block color="success" @click="lot">Жеребнуть</v-btn>
          </v-col>
          <v-col></v-col>
        </v-row>
      </v-col>
      <v-col v-if="!loted && rows">
        <v-table density="compact">
          <thead>
            <tr>
              <th class="text-left">id</th>
              <th class="text-left">ФИО</th>
              <th class="text-left">очки</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in rows"
              :key="item.id"
            >
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.ranking }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
      <v-col v-if="loted">
        <v-layout>
          <v-card xs4 v-for="(group, i) in loted" :key="i">
            <v-card-title primary-title> Группа {{ i + 1 }} </v-card-title>
            <v-card-text>
              <v-table>
                <tbody>
                  <tr v-for="(item, j) in group" :key="item.id">
                    <td>{{ j + 1 }}</td>
                    <td>{{ item.name }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-card-text>
          </v-card>
        </v-layout>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">

import { obj } from "@/lib/csv";
import { ipcRenderer, shell } from "electron";
import { Vue } from "vue-class-component";
import { Loter } from "@/lib/Loter";
export default class HelloWorld extends Vue {
  rows: obj[] | null = null;
  groupsCount = 3;
  loter = new Loter();
  loted?: (obj | null)[][] | null = null;
  async open() {
     ipcRenderer.invoke("open")
     .then((rows:obj[])=>{
      this.rows = rows.sort((a, b) =>
                a.ranking < b.ranking ? 1 : -1
              )
      
     });
    this.loted = null;
  }
  lot() {
    if (!this.rows) return;
    this.loted = this.loter.lot(this.groupsCount, this.rows);
  }

  openTemplate(){
    shell.openExternal("https://docs.google.com/spreadsheets/d/1TgFMoT4BXS2VwX92YPGI_EtvCq9OOo41D3ngC2-5-B8/edit?usp=sharing")
  }
}
</script>

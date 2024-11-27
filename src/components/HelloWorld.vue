<template>
  <div>
  <v-app >
    <v-container>
      <div :class="getSampleClass()" class="sample">
        <div v-if="flagGo === 0 && !$store.state.flagSent" class="start">
          <h1 :class="getSampleClass()" id="welcome">Добро пожаловать</h1>
          <v-btn id="sett" :class="['custom-btn', getSampleClass()]" @click="$store.state.flagSent = !$store.state.flagSent">Настройки</v-btn>
          <v-btn id="start" :class="['custom-btn', getSampleClass()]" @click="goOn(1)">Старт</v-btn>
        </div>

        <div v-if="flagGo === 1 && !$store.state.flagSent" class="members">
          <v-btn id="sett" :class="['custom-btn', getSampleClass()]" @click="$store.state.flagSent = !$store.state.flagSent">Настройки</v-btn>
          <h1 :class="getSampleClass()">Добавьте пользователей</h1>
          <div class="input-v-btns-container">
            <v-btn id="addMem" :class="['custom-btn', getSampleClass()]" @click="addMember">Добавить человека</v-btn>
            <v-btn id="addFood" :class="['custom-btn', getSampleClass()]" v-if="guests.length > 1" @click="goOn(2)">Добавить еду</v-btn>
          </div>
          <div v-for="(guest, index) in guests" :key="index" class="input-v-btns-container">
            <input :class="getSampleClass()" v-model="guests[index]" @input="validateText($event, index)" />
            <v-btn :class="['custom-btn', getSampleClass()]" @click="delGuest(index)">x</v-btn>
          </div>
        </div>

        <div v-if="flagGo === 2 && !$store.state.flagSent" class="food">
          <v-btn id="sett" :class="['custom-btn', getSampleClass()]" @click="$store.state.flagSent = !$store.state.flagSent">Настройки</v-btn>
          <div class="input-v-btns-container">
            <v-btn id="addMem" :class="['custom-btn', getSampleClass()]" @click="goOn(1)">Добавить человека</v-btn>
            <v-btn id="addFood" :class="['custom-btn', getSampleClass()]" @click="addFood">Добавить еду</v-btn>
          </div>
          <div v-for="(oneEat, indexFood) in foods" :key="indexFood">
            <p :class="getSampleClass()">Блюдо заказал
              <select :class="getSampleClass()" v-model="selectedBuyMan[indexFood]">
                <option v-for="(guest, indexGuest) in guests" :key="indexGuest">
                  {{ guest }}
                </option>
              </select>
            </p>
            <div class="input-v-btns-container">
              <input :class="getSampleClass()" type="text" v-model="foods[indexFood]" @input="validateFoodsText($event, indexFood)"/>
              <input :class="getSampleClass()" type="text" v-model="prices[indexFood]" @input="validateNumber($event, indexFood)"/>
              <v-btn :class="['custom-btn', getSampleClass()]" @click="delFood(indexFood)">x</v-btn>
              <v-btn id="addEat" :class="['custom-btn', getSampleClass()]" @click="addPersonButtons(indexFood)">+</v-btn>
            </div>
            
            <div v-if="personButtons[indexFood] && marksForPersonButtons[indexFood]">
              <h5 :class="getSampleClass()">Выберите кушателей:</h5>
              <v-btn :class="['custom-btn', getSampleClass()]" v-for="(guest, indexGuest) in guests" :key="indexGuest" @click="addButtFoodGuest(indexFood, indexGuest)">
                <div>
                  {{ guests[indexGuest] }}
                </div>
              </v-btn>
            </div>
          </div>
          <v-btn :class="['custom-btn', getSampleClass()]" v-if="foods.length != 0" @click="goOn(3), counting()"> Подвести итог</v-btn>
        </div>

        <div v-if="flagGo === 3 && !$store.state.flagSent" class="results">
          <h1 :class="getSampleClass()">Итоги застолья</h1>
          <v-btn id="sett" :class="['custom-btn', getSampleClass()]" @click="$store.state.flagSent = !$store.state.flagSent">Настройки</v-btn>
          <div class="input-v-btns-container">
            <v-btn id="addMem" :class="['custom-btn', getSampleClass()]" @click="goOn(1)">Добавить человека</v-btn>
            <v-btn id="addFood" :class="['custom-btn', getSampleClass()]" @click="goOn(2)">Добавить еду</v-btn>
          </div>
          
          <h1 :class="getSampleClass()">Кто кому должен</h1>
          <table class="fullTable">
            <tr v-for="(fiLis, indexFood) in finalList" :key="indexFood">
              <td>{{ fiLis[0][0] }} должен</td>
              <td>
                <table class="fullTable2">
                  <tr v-for="(fLi, indexFood2) in fiLis" :key="indexFood2">
                    <td>{{ fLi[1] }}</td>
                    <td v-if="fLi[2]">в количестве {{ fLi[2] }}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <h1 :class="getSampleClass()">Кому кто должен</h1>
          <table class="fullTable">
            <tr v-for="(fiLi, indexFood) in finalList2" :key="indexFood">
              <td>{{ fiLi[0][0] }} должны</td>
              <td>
                <table class="fullTable2">
                  <tr v-for="(fLi, indexFood2) in fiLi" :key="indexFood2">
                    <td v-if="fLi[1] !== 'никому'">{{ fLi[1] }}</td>
                    <td v-if="fLi[2] !== ''">в количестве {{ fLi[2] }}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>

        <div class="settings" v-if="$store.state.flagSent">
          <v-btn id="return" :class="['custom-btn', getSampleClass()]" @click="$store.state.flagSent = !$store.state.flagSent">Назад</v-btn>
          <h1 :class="getSampleClass()" id="word-sett">Настройки</h1>
          <v-btn :class="['custom-btn', getSampleClass()]" @click="toggleStyle(1)">Стиль1</v-btn>
          <v-btn :class="['custom-btn', getSampleClass()]" @click="toggleStyle(2)">Стиль2</v-btn>
          <v-btn :class="['custom-btn', getSampleClass()]" @click="toggleStyle(3)">Стиль3</v-btn>

          <div class="input-v-btns-container">
            <audio id="audio" ref="audio" src="@/assets/muzhell.mp3" preload="auto"></audio>
            <v-btn id="music" :class="['custom-btn', getSampleClass()]" @click="toggleAudio">Музыка</v-btn>
            <input id="sound" type="range" name="foo" @input="changeVolume($event.target.value)" min="0" max="100" ref="volumeControl"/>
          </div>
          <output id="volume-output">{{ $store.state.currentVolume }}</output>
        </div>
      </div>
    </v-container>
  </v-app>
</div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    computed: {
      guests() {
        return this.$store.getters.getGuests;
      },
      foods() {
        return this.$store.getters.getFoods;
      },
      prices() {
        return this.$store.getters.getPrices;
      },
      selectedBuyMan() {
        return this.$store.getters.getSelectedBuyMan;
      },
      personButtons() {
        return this.$store.getters.getPersonButtons;
      },
      marksForPersonButtons() {
        return this.$store.getters.getMarksForPersonButtons;
      },
      flagGo() {
        return this.$store.getters.getFlagGo;
      },
      style() {
        return this.$store.getters.getStyle;
      },
      whoEatFood() {
        return this.$store.getters.getWhoEatFood;
      }
    },
    methods: {
      goOn(flagGo) { 
        this.$store.dispatch('updateFlagGo', flagGo);
      },
      addMember() {
        this.$store.dispatch('addMember');
      },
      delGuest(index) {
        this.$store.dispatch('deleteMember', index);
      },
      addFood() {
        this.$store.dispatch('addFood');
      },
      delFood(index) {
        this.$store.dispatch('deleteFood', index);
      },
      addPersonButtons(index) {
        this.$store.dispatch('addPersonButtons', index);
      },
      toggleStyle(style) {
        this.$store.dispatch('setStyle', style);
      },
      toggleFlagSent() {
        this.$store.dispatch('toggleFlagSent');
      },
      finalList() {
        this.$store.dispatch('finalList');
      },
      finalList2() {
        this.$store.dispatch('finalList2');
      },
      changeVolume(value) {
        this.$store.dispatch('changeVolume', value);
        const audio = this.$refs.audio;
        if (audio) {
          audio.volume = value / 100; 
        }
      },
      toggleAudio() {
        const audio = this.$refs.audio;
        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
        }
      },
      validateFoodsText(event, index) {
        const validatedValue = event.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, '');
        this.$set(this.foods, index, validatedValue);
      },
      validateText(value, index) {
              // Убираем цифры из введенного текста
        const validatedValue = event.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, '');
        
        // Моментально обновляем значение в поле
        this.$set(this.guests, index, validatedValue);
        
        // Если требуется, можно обновить поле напрямую
        event.target.value = validatedValue;
      },
      validateNumber(event, index) {
        const validatedValue = event.target.value.replace(/[^0-9]/g, '');
        this.$set(this.prices, index, validatedValue);
      },
      addButtFoodGuest(indexFood, indexGuest) {
        let flag = true;

        if (!Array.isArray(this.$store.state.buttFoodGuest)) {
          console.error('buttFoodGuest is not an array');
          return;
        }
        console.log(this.$store.state.whoEatFood);
        for (let i = 0; i < this.$store.state.buttFoodGuest.length; i++) {
          if ((this.$store.state.buttFoodGuest[i][0] === indexFood) && (this.$store.state.buttFoodGuest[i][1] === indexGuest)) {
            flag = false;
            this.$store.state.buttFoodGuest.splice(i, 1);
          }
        }
        if (flag) {
          this.$store.state.buttFoodGuest.push([indexFood, indexGuest]);
        }

        this.$store.state.buttFoodGuest.sort();

        let result = [];
        let currentKey = this.$store.state.buttFoodGuest.length > 0 ? this.$store.state.buttFoodGuest[0][0] : null;
        let lenWhoEatFood = this.$store.state.whoEatFood.length;

        for (let i = 0; i < this.$store.state.buttFoodGuest.length; i++) {
          if (currentKey === null) break; // Прерываем, если currentKey не определен
          if (this.$store.state.buttFoodGuest[i][0] === currentKey) {
            result.push(this.$store.state.buttFoodGuest[i][1]);
          } else {
            this.$store.commit('setWhoEatFood', [...this.$store.state.whoEatFood, result]);
            result = [this.$store.state.buttFoodGuest[i][1]];
            currentKey = this.$store.state.buttFoodGuest[i][0];
          }
        }
        if (result.length > 0) {
          this.$store.commit('setWhoEatFood', [...this.$store.state.whoEatFood, result]);
        }
        this.$store.state.whoEatFood.splice(0, lenWhoEatFood);
        console.log(this.$store.state.whoEatFood);
      },
      counting() {
        let pip = [];

        // Собираем индексы гостей, которые совпадают с selectedBuyMan
        for (let i = 0; i < this.selectedBuyMan.length; i++) {
            for (let j = 0; j < this.guests.length; j++) {
                if (this.selectedBuyMan[i] === this.guests[j]) {
                    pip.push(j);
                }
            }
        }

        // Инициализируем money как массив с пустыми вложенными массивами
        let money = new Array(this.guests.length).fill(null).map(() => []);

        // Проходим по каждому блюду
        for (let i = 0; i < this.foods.length; i++) {
            if (!this.whoEatFood || !Array.isArray(this.whoEatFood) || !this.whoEatFood[i]) {
                continue;
            }
            let totalGuestsForFood = this.whoEatFood[i].length;

            for (let j = 0; j < this.whoEatFood[i].length; j++) {
                let guestIndex = this.whoEatFood[i][j];
                let priceShare = Math.ceil(this.prices[i] / totalGuestsForFood);

                if (guestIndex == null || pip[i] == null) {
                    continue;
                }

                if (!money[guestIndex]) {
                  money[guestIndex] = [];
                }
                if (pip[i] !== guestIndex) {
                    money[guestIndex].push([
                        this.guests[guestIndex],
                        this.guests[pip[i]],
                        priceShare
                    ]);
                }
            }
        }

        // Подсчёт итоговых сумм
        let finalAmounts = {};
        for (let i = 0; i < money.length; i++) {
            if (!money[i]) continue; // Пропускаем пустые значения
            for (let j = 0; j < money[i].length; j++) {
                let [debtor, creditor, amount] = money[i][j];
                let key = `${debtor}->${creditor}`;
                let reverseKey = `${creditor}->${debtor}`;

                if (finalAmounts[reverseKey]) {
                    if (finalAmounts[reverseKey] > amount) {
                        finalAmounts[reverseKey] -= amount;
                    } else if (finalAmounts[reverseKey] < amount) {
                        finalAmounts[key] = amount - finalAmounts[reverseKey];
                        delete finalAmounts[reverseKey];
                    } else {
                        delete finalAmounts[reverseKey];
                    }
                } else {
                    if (finalAmounts[key]) {
                        finalAmounts[key] += amount;
                    } else {
                        finalAmounts[key] = amount;
                    }
                }
            }
        }

        // Формируем финальные списки
        let firstFinalList = [];
        let secondFinalList = [];
        for (let key in finalAmounts) {
            let [debtor, creditor] = key.split("->");
            firstFinalList.push([debtor, creditor, finalAmounts[key]]);
            secondFinalList.push([creditor, debtor, finalAmounts[key]]);
        }

        this.finalList = this.tableCount(firstFinalList);
        this.finalList2 = this.tableCount(secondFinalList);
      },
      tableCount(firstFinalList) {
        let reduction = [];
        let reductionAll = [];
        for (let i = 0; i < this.guests.length; i++) {
          for (let j = 0; j < firstFinalList.length; j++) {
            if (firstFinalList[j][0] === this.guests[i]) {
              reduction.push(firstFinalList[j]);
            }
          }
          if (reduction.length === 0) {
            reduction = [[`${this.guests[i]} не`, 'никому', '']];
          }
          reductionAll.push(reduction);
          reduction = [];
        }
        return reductionAll;
      },
      getSampleClass() {
        document.body.className = '';
        if (this.style === 1) {
          document.body.classList.add('active1');
        } else if (this.style === 2) {
          document.body.classList.add('active2');
        } else if (this.style === 3) {
          document.body.classList.add('active3');
        }
        return {
          active1: this.style === 1,
          active2: this.style === 2,
          active3: this.style === 3
        };
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  ::v-deep(.first3) {
    border: solid;
}
</style>

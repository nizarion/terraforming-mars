import Vue from 'vue';
import {CardRenderItem} from '../../cards/render/CardRenderItem';
import {CardRenderSymbol} from '../../cards/render/CardRenderSymbol';
import {CardRenderProductionBox} from '../../cards/render/CardRenderer';
import {CardRenderItemComponent} from './CardRenderItemComponent';
import {CardProductionBoxComponent} from './CardProductionBoxComponent';
import {CardRenderEffectBoxComponent} from './CardRenderEffectBoxComponent';
import {CardDescription} from './CardDescription';
import {CardRenderSymbolComponent} from './CardRenderSymbolComponent';
import {CardRenderEffect} from '../../cards/render/CardRenderer';

export const CardRowComponent = Vue.component('CardRowComponent', {
  props: {
    componentData: {
      type: Object as () => CardRenderItem | CardRenderProductionBox | CardRenderSymbol | CardRenderEffect,
      required: true,
    },
  },
  components: {
    CardRenderSymbolComponent,
    CardRenderItemComponent,
    CardProductionBoxComponent,
    CardRenderEffectBoxComponent,
    CardDescription,
  },
  methods: {
    isItem: function(): boolean {
      return this.componentData instanceof CardRenderItem;
    },
    isSymbol: function(): boolean {
      return this.componentData instanceof CardRenderSymbol;
    },
    isProduction: function(): boolean {
      return this.componentData instanceof CardRenderProductionBox;
    },
    isEffect: function(): boolean {
      return this.componentData instanceof CardRenderEffect;
    },
    isDescription: function(): boolean {
      return typeof this.componentData === 'string' || this.componentData instanceof String;
    },
  },
  template: ` 
        <CardRenderItemComponent v-if="isItem()" :item="componentData"/>
        <CardRenderSymbolComponent v-else-if="isSymbol()" :item="componentData" />
        <CardProductionBoxComponent v-else-if="isProduction()" :rows="componentData.rows" />
        <CardRenderEffectBoxComponent v-else-if="isEffect()" :effectData="componentData" />
        <CardDescription v-else-if="isDescription()" :text="componentData" />
        <div v-else>n/a</div>
    `,
});

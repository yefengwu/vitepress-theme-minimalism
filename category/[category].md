---
title: 分类
layout: page
---

<Category />

<script lang="ts" setup>
import { onMounted } from "vue";
import { useData } from "vitepress"

const { params, site } = useData();

onMounted(() => {
  if (params.value?.category && params.value.category !== 'index') {
    document.title = `分类：${params.value.category} | ${site.value.titleTemplate}`;
  }
});
</script>

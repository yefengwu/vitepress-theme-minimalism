---
title: 标签
layout: page
---

<Category type="tag" />

<script lang="ts" setup>
import { onMounted } from "vue";
import { useData } from "vitepress"

const { params, site } = useData();

onMounted(() => {
  if (params.value?.tag && params.value.tag !== 'index') {
    document.title = `标签：${params.value.tag} | ${site.value.titleTemplate}`;
  }
});
</script>

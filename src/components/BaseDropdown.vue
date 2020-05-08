<template>
  <aside class="base-dropdown">
    <section class="base-dropdown__content">
      <slot></slot>
    </section>
  </aside>
</template>

<script>
export default {

};
</script>

<style>
.base-dropdown {
  position: absolute;
  z-index: 2;

  background: var(--bg-color--primary);

  border: 1px solid var(--bg-color--secondary);
  padding: 4px 12px;
}

.base-dropdown__content {
  display: flex;
  align-items: center;
}

</style>

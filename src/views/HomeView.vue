<template>
  <div class="container">
    <h1 class="title">Olympic Games Medal Table</h1>

    <!-- Pagination Component -->
    <div class="pagination-container">
      <span>Please enter the number of countries to display:</span>
      <input type="number" v-model.number="pageSize" min="1" @input="handlePageSizeChange" />
    </div>

    <!-- Table -->
    <el-table :data="paginatedData" :header-cell-style="{backgroundColor:'#8ad0f0a3',color:'#666'}" border @row-click="handleRowClick">
      <el-table-column prop="rank" label="Gold Medal Rank" width="120" align="center" />
      <el-table-column label="Country/Region" align="center">
        <template #default="scope">
          <a href="#" @click.prevent="navigateToCountryDetail(scope.row.rank)">
            {{ scope.row.orgName }}
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="gold" label="Gold" align="center">
        <template #header>
          <img src="@/assets/gold.png" alt="Gold Medal" class="medal-logo" /> Gold
        </template>
      </el-table-column>
      <el-table-column prop="silver" label="Silver" align="center">
        <template #header>
          <img src="@/assets/silver.png" alt="Silver Medal" class="medal-logo" /> Silver
        </template>
      </el-table-column>
      <el-table-column prop="bronze" label="Bronze" align="center">
        <template #header>
          <img src="@/assets/bronze.png" alt="Bronze Medal" class="medal-logo" /> Bronze
        </template>
      </el-table-column>
      <el-table-column prop="total" label="Total" align="center" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const medalTable = ref([]);
const router = useRouter();
const pageSize = ref(10);
const currentPage = ref(1);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return medalTable.value.slice(start, end);
});

onMounted(async () => {
  try {
    const response = await fetch('/src/data/medalTable.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    medalTable.value = await response.json();
  } catch (error) {
    console.error('Error fetching medal data:', error);
  }
});

const navigateToCountryDetail = (id: string) => {
  console.log('Navigating to country detail:', id);
  router.push({ name: 'CountryDetail', query: { id } });
};

const handleRowClick = (row) => {
  console.log('Row clicked:', row.rank);
  navigateToCountryDetail(row.rank);
};

const handlePageSizeChange = (event: Event) => {
  const newPageSize = parseInt((event.target as HTMLInputElement).value, 10);
  if (!isNaN(newPageSize) && newPageSize > 0) {
    pageSize.value = newPageSize;
    currentPage.value = 1; // Reset current page to the first page
  }
};
</script>

<style scoped>
.container {
  width: 70%;
  margin: 0 auto;
  padding: 2rem;
}

.title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.medal-logo {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  vertical-align: middle;
}

.pagination-container {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.pagination-container span {
  margin-right: 0.5rem;
}

.pagination-container input {
  width: 60px;
  padding: 0.5rem;
  text-align: center;
}
</style>

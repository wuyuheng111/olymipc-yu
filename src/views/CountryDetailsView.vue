<template>
  <div>
    <el-breadcrumb separator="/" style="margin-top: 20px;margin-left: 30px;">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Country Details</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="country-details">
      <h2>Country Name: {{ country.orgName }}</h2>
      <p><strong>Gold Medal Rank:</strong> {{ country.rank }}</p>
      <p><strong>Total Gold Medals:</strong> {{ country.gold }}</p>
      <p><strong>Total Silver Medals:</strong> {{ country.silver }}</p>
      <p><strong>Total Bronze Medals:</strong> {{ country.bronze }}</p>
      <p><strong>Total Medals:</strong> {{ country.total }}</p>
      <p><strong>Country Description:</strong> {{ country.description }}</p>
      <h3>Participating Sports Projects</h3>
      <el-table :data="paginatedProjects" :header-cell-style="{backgroundColor:'#8ad0f0a3',color:'#666'}" border style="width: 100%;">
        <el-table-column prop="name" label="Project Name" width="150" align="center" />
        <el-table-column label="Gold" align="center">
          <template #default="scope">
            <img src="@/assets/gold.png" alt="Gold Medal" class="medal-logo" /> {{ scope.row.gold }}
          </template>
        </el-table-column>
        <el-table-column label="Silver" align="center">
          <template #default="scope">
            <img src="@/assets/silver.png" alt="Silver Medal" class="medal-logo" /> {{ scope.row.silver }}
          </template>
        </el-table-column>
        <el-table-column label="Bronze" align="center">
          <template #default="scope">
            <img src="@/assets/bronze.png" alt="Bronze Medal" class="medal-logo" /> {{ scope.row.bronze }}
          </template>
        </el-table-column>
        <el-table-column prop="total" label="Total Awards" align="center" />
      </el-table>
      <div class="pagination-container" v-if="country.projects && country.projects.length > 0">
        <span class="pagination-label">Select the number of items per page</span>
        <el-pagination
            layout="sizes, prev, pager, next"
            :total="country.projects.length"
            :page-size="pageSize"
            :current-page="currentPage"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </div>

      <!-- Message Input Area -->
      <h4>Please enter a message to cheer for the athletes!</h4>
      <div class="message-input">
        <el-form @submit.prevent="addMessage">
          <el-form-item label="Name">
            <el-input v-model="newMessage.name" placeholder="Please enter your name" />
          </el-form-item>
          <el-form-item label="Content">
            <el-input v-model="newMessage.content" type="textarea" placeholder="Please enter your message" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit">Submit</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- Message List -->
      <h4>Message List</h4>
      <div class="message-list">
        <div class="message-item" v-for="(message, index) in comments" :key="index">
          <div class="message-header">
            <img src="@/assets/user-avatar.png" alt="Avatar" class="avatar" />
            <div class="message-meta">
              <div class="name">Name: {{ message.name }}</div>
              <div class="time">Time: {{ message.time }}</div>
            </div>
          </div>
          <div class="message-content">{{ message.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import medalData from '@/data/medalTable.json';
import { format } from 'date-fns';
import { useCommentsStore } from '@/store/index';

const route = useRoute();
const country = ref({});

const countryId = route.query.id;

console.log(countryId)

const pageSize = ref(10);
const currentPage = ref(1);

const paginatedProjects = computed(() => {
  if (!country.value.projects || country.value.projects.length === 0) {
    return [];
  }
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return country.value.projects.slice(start, end);
});

onMounted(async () => {
  try {
    const foundCountry = medalData.find(c => c.rank === countryId);
    if (foundCountry) {
      country.value = foundCountry;
    } else {
      console.error('Country not found with id:', countryId);
    }
  } catch (error) {
    console.error('Error fetching country data:', error);
  }
});

const handleSizeChange = (newPageSize) => {
  pageSize.value = newPageSize;
  currentPage.value = 1;
};

const handleCurrentChange = (newPage) => {
  currentPage.value = newPage;
};

const newMessage = ref({
  name: '',
  content: ''
});

const commentsStore = useCommentsStore();
console.log(countryId)
const comments = computed(() => commentsStore.getComments(countryId));

const addMessage = () => {
  if (!newMessage.value.name) {
    this.$message.error('Please enter your name');
    return;
  }
  if (!newMessage.value.content) {
    this.$message.error('Please enter your message');
    return;
  }
  if (newMessage.value.name && newMessage.value.content) {
    commentsStore.addComment(countryId, {
      name: newMessage.value.name,
      content: newMessage.value.content,
      time: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    });
    newMessage.value.name = '';
    newMessage.value.content = '';
  }
};
</script>

<style scoped>
.country-details {
  width: 60%;
  margin: 0 auto;
  text-align: left;
}

.country-details h2 {
  font-size: 2rem;
}

.country-details p {
  margin: 0.5rem 0;
}

.country-details h3 {
  font-size: 1.5rem;
  margin-top: 1rem;
}

.country-details .medal-logo {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  vertical-align: middle;
}

.country-details .el-breadcrumb {
  margin-bottom: 1rem;
}

.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.pagination-label {
  margin-right: 10px;
  font-weight: bold;
}

.message-input {
  margin-top: 20px;
}

.message-list {
  margin-top: 20px;
}

.message-item {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
}

.message-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.message-meta {
  display: flex;
  flex-direction: column;
}

.message-meta .name {
  font-weight: bold;
}

.message-meta .time {
  font-size: 0.8rem;
  color: #666;
}

.message-content {
  font-size: 1rem;
  border: 1px dashed #ddd;
  min-height: 60px;
  margin-left: 50px;
}
</style>

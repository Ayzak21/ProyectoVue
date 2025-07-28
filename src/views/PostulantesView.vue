<template>
  <div class="header">
    <div class="company-info">TechCorp Ecuador - Panel de Postulantes</div>
  </div>
  <div class="container">
    <!-- Sección de estadísticas -->
    <div class="stats-section">
      <div class="stat-card">
        <div class="stat-number">{{ stats.totalJobs }}</div>
        <div class="stat-label">Ofertas Publicadas</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ stats.totalApplicants }}</div>
        <div class="stat-label">Total Postulantes</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ stats.avgApplicants }}</div>
        <div class="stat-label">Promedio por Oferta</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ stats.activeJobs }}</div>
        <div class="stat-label">Ofertas Activas</div>
      </div>
    </div>
    <!-- Sección de ofertas de trabajo -->
    <div class="jobs-section">
      <h2 class="section-title">Mis Ofertas de Trabajo</h2>
      <div id="jobsList">
        <div v-for="job in companyJobs" :key="job.id" class="job-item">
          <div class="job-header">
            <div class="job-title">{{ job.title }}</div>
            <div class="applicant-count">{{ job.applicantsCount }} postulantes</div>
          </div>
          <div class="job-details">
            <div class="job-detail">📍 <strong>Ubicación:</strong> {{ job.location }}</div>
            <div class="job-detail">💼 <strong>Contrato:</strong> {{ job.contract }}</div>
            <div class="job-detail">💰 <strong>Salario:</strong> {{ job.salary }}</div>
            <div class="job-detail">📅 <strong>Publicado:</strong> {{ formatDate(job.posted) }}</div>
            <div class="job-detail">🔘 <strong>Estado:</strong>
              <span :style="{ color: job.status === 'activa' ? '#4CAF50' : '#f44336', fontWeight: 'bold' }">{{ job.status.toUpperCase() }}</span>
            </div>
          </div>
          <div>
            <button class="view-applicants-btn" @click="viewApplicants(job.id, job.title)">👥 Ver Postulantes</button>
            <button class="edit-job-btn" @click="editJob(job.id)">✏️ Editar Oferta</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal para ver postulantes -->
  <div v-if="showModal" id="applicantsModal" class="modal" @click.self="closeModal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2 id="modalTitle">Postulantes para: {{ modalTitle }} ({{ jobApplicants.length }})</h2>
      <div id="applicantsList">
        <div v-if="jobApplicants.length === 0" class="no-applicants">No hay postulantes para esta oferta aún.</div>
        <div v-for="applicant in jobApplicants" :key="applicant.id" class="applicant-card">
          <div class="applicant-info">
            <div class="applicant-name">{{ applicant.name }}</div>
            <div class="applicant-details">
              🎓 {{ applicant.career }} | Graduado: {{ applicant.graduation }} | 💼 Experiencia: {{ applicant.experience }}
            </div>
            <div class="applicant-details">
              📧 {{ applicant.email }} | 📱 {{ applicant.phone }}
            </div>
            <div class="applicant-details">
              📅 Aplicó: {{ formatDate(applicant.applied) }}
            </div>
            <span :class="getStatusClass(applicant.status)">{{ getStatusText(applicant.status) }}</span>
          </div>
          <div class="applicant-actions">
            <button class="action-btn btn-view" @click="viewProfile(applicant.id)">👁️ Ver Perfil</button>
            <button class="action-btn btn-contact" @click="contactApplicant(applicant.email)">✉️ Contactar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostulantesView',
  data() {
    return {
      companyJobs: [
        {
          id: 1,
          title: "Desarrollador Frontend Senior",
          location: "Manta",
          contract: "Tiempo Completo",
          salary: "800-1200 USD",
          posted: "2025-05-25",
          status: "activa",
          applicantsCount: 15
        },
        {
          id: 2,
          title: "Analista de Sistemas",
          location: "Portoviejo",
          contract: "Tiempo Completo",
          salary: "1000-1500 USD",
          posted: "2025-05-20",
          status: "activa",
          applicantsCount: 8
        },
        {
          id: 3,
          title: "Desarrollador Backend Junior",
          location: "Manta",
          contract: "Tiempo Completo",
          salary: "600-900 USD",
          posted: "2025-05-15",
          status: "cerrada",
          applicantsCount: 22
        },
        {
          id: 4,
          title: "Diseñador UX/UI",
          location: "Remoto",
          contract: "Freelance",
          salary: "500-800 USD",
          posted: "2025-05-28",
          status: "activa",
          applicantsCount: 12
        }
      ],
      applicants: {
        1: [
          {
            id: 1,
            name: "María José Zambrano",
            career: "Ingeniería en Sistemas",
            graduation: "2024",
            experience: "1 año",
            email: "maria.zambrano@live.uleam.edu.ec",
            phone: "0987654321",
            status: "new",
            applied: "2025-05-30"
          },
          {
            id: 2,
            name: "Carlos Eduardo Pérez",
            career: "Ingeniería en Software",
            graduation: "2023",
            experience: "2 años",
            email: "carlos.perez@live.uleam.edu.ec",
            phone: "0976543210",
            status: "reviewed",
            applied: "2025-05-29"
          },
          {
            id: 3,
            name: "Ana Lucía Mendoza",
            career: "Ingeniería en Sistemas",
            graduation: "2024",
            experience: "6 meses",
            email: "ana.mendoza@live.uleam.edu.ec",
            phone: "0965432109",
            status: "interview",
            applied: "2025-05-28"
          }
        ],
        2: [
          {
            id: 4,
            name: "Roberto Silva Moreira",
            career: "Ingeniería en Sistemas",
            graduation: "2023",
            experience: "1.5 años",
            email: "roberto.silva@live.uleam.edu.ec",
            phone: "0954321098",
            status: "new",
            applied: "2025-05-27"
          },
          {
            id: 5,
            name: "Gabriela Torres López",
            career: "Administración de Sistemas",
            graduation: "2024",
            experience: "8 meses",
            email: "gabriela.torres@live.uleam.edu.ec",
            phone: "0943210987",
            status: "reviewed",
            applied: "2025-05-26"
          }
        ],
        3: [
          {
            id: 6,
            name: "Diego Almeida Castro",
            career: "Ingeniería en Software",
            graduation: "2023",
            experience: "2 años",
            email: "diego.almeida@live.uleam.edu.ec",
            phone: "0932109876",
            status: "interview",
            applied: "2025-05-25"
          }
        ],
        4: [
          {
            id: 7,
            name: "Sofía Delgado Ruiz",
            career: "Diseño Gráfico",
            graduation: "2024",
            experience: "1 año",
            email: "sofia.delgado@live.uleam.edu.ec",
            phone: "0921098765",
            status: "new",
            applied: "2025-05-29"
          }
        ]
      },
      showModal: false,
      modalTitle: '',
      jobApplicants: [],
      stats: {
        totalJobs: 0,
        totalApplicants: 0,
        avgApplicants: 0,
        activeJobs: 0
      }
    }
  },
  mounted() {
    this.loadStatistics();
  },
  methods: {
    loadStatistics() {
      const totalJobs = this.companyJobs.length;
      const totalApplicants = this.companyJobs.reduce((sum, job) => sum + job.applicantsCount, 0);
      const avgApplicants = totalJobs ? Math.round(totalApplicants / totalJobs) : 0;
      const activeJobs = this.companyJobs.filter(job => job.status === 'activa').length;
      this.stats = { totalJobs, totalApplicants, avgApplicants, activeJobs };
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    viewApplicants(jobId, jobTitle) {
      this.modalTitle = jobTitle;
      // Aseguramos que jobApplicants sea un array aunque no haya postulantes
      this.jobApplicants = Array.isArray(this.applicants[jobId]) ? this.applicants[jobId] : [];
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    getStatusClass(status) {
      switch(status) {
        case 'new': return 'status-new';
        case 'reviewed': return 'status-reviewed';
        case 'interview': return 'status-interview';
        default: return 'status-new';
      }
    },
    getStatusText(status) {
      switch(status) {
        case 'new': return 'NUEVO';
        case 'reviewed': return 'REVISADO';
        case 'interview': return 'ENTREVISTA';
        default: return 'NUEVO';
      }
    },
    editJob(jobId) {
      alert(`Función para editar la oferta ${jobId} - Esta funcionalidad se implementaría en el sistema completo`);
    },
    viewProfile(applicantId) {
      alert(`Ver perfil completo del postulante ${applicantId} - Esta funcionalidad mostraría CV completo, portafolio, etc.`);
    },
    contactApplicant(email) {
      window.location.href = `mailto:${email}?subject=Proceso de selección - TechCorp Ecuador`;
    }
  }
}
</script>

<style scoped src="../assets/css/postulantes.css">
</style>

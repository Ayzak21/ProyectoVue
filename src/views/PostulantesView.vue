/* Modal mejorado para visibilidad */
#applicantsModal.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.modal-content {
  background: #fff;
  border-radius: 10px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 16px rgba(0,0,0,0.2);
  position: relative;
}
.close {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 2rem;
  cursor: pointer;
}
.applicant-card {
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 1rem;
  padding: 1rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}
.applicant-name {
  font-weight: bold;
  font-size: 1.2rem;
}
.applicant-details {
  font-size: 0.95rem;
  margin-bottom: 0.3rem;
}
.applicant-actions {
  margin-top: 0.5rem;
}
.action-btn {
  margin-right: 0.5rem;
  padding: 0.3rem 0.8rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}
.btn-view {
  background: #1976d2;
  color: #fff;
}
.btn-contact {
  background: #43a047;
  color: #fff;
}
.no-applicants {
  text-align: center;
  color: #f44336;
  font-weight: bold;
  margin-top: 1rem;
}
<template>
  <div class="header" style="display:flex; align-items:center; justify-content:space-between;">
    <div class="company-info">TechCorp Ecuador - Panel de Postulantes</div>
    <button class="logout-btn" @click="logout"
      style="background:transparent;color:#fff;border:2px solid #fff;border-radius:16px;padding:0.28rem 0.85rem;font-size:0.95rem;font-weight:500;cursor:pointer;transition:background 0.2s,color 0.2s,border 0.2s;"
      @mouseover="event.target.style.background='#fff';event.target.style.color='#d32f2f';event.target.style.border='2px solid #d32f2f'"
      @mouseout="event.target.style.background='transparent';event.target.style.color='#fff';event.target.style.border='2px solid #fff'"
    >Cerrar sesión</button>
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
  <!-- Interfaz moderna y dinámica para postulantes -->
  <transition name="fade-modal">
    <div v-if="showModal" id="applicantsModal" class="custom-modal" @click.self="closeModal">
      <div class="custom-modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2 class="modal-title">Postulantes para: {{ modalTitle }}</h2>
        <div v-if="jobApplicants.length > 0" class="modal-count" style="text-align:center; margin-bottom:1rem; font-size:1.1rem; color:#1976d2;">
          <strong>{{ jobApplicants.length }}</strong> postulante(s) para esta oferta
        </div>
        <div v-if="jobApplicants.length > 0" class="postulantes-list">
          <div v-for="applicant in jobApplicants" :key="applicant.id" class="postulante-card">
            <div class="postulante-info">
              <div class="postulante-name">{{ applicant.name }}</div>
              <div class="postulante-meta">
                <span><strong>Carrera:</strong> {{ applicant.career }}</span>
                <span><strong>Graduación:</strong> {{ applicant.graduation }}</span>
                <span><strong>Experiencia:</strong> {{ applicant.experience }}</span>
              </div>
            </div>
            <div class="postulante-actions">
              <button class="btn-cv" @click="viewCurriculum(applicant)">Ver Curriculum</button>
            </div>
          </div>
        </div>
        <div v-else class="no-applicants">No hay postulantes para esta oferta aún.</div>
      </div>
      <!-- Modal secundario para curriculum -->
      <transition name="fade-modal">
        <div v-if="showCVModal" class="cv-modal-overlay" @click.self="closeCVModal">
          <div class="cv-modal-content">
            <span class="close" @click="closeCVModal">&times;</span>
            <h3 class="cv-title">Curriculum de {{ selectedApplicant.name }}</h3>
            <div class="cv-details">
              <p><strong>Carrera:</strong> {{ selectedApplicant.career }}</p>
              <p><strong>Graduación:</strong> {{ selectedApplicant.graduation }}</p>
              <p><strong>Experiencia:</strong> {{ selectedApplicant.experience }}</p>
              <p><strong>Email:</strong> {{ selectedApplicant.email }}</p>
              <p><strong>Teléfono:</strong> {{ selectedApplicant.phone }}</p>
              <p><strong>Fecha de aplicación:</strong> {{ formatDate(selectedApplicant.applied) }}</p>
              <p><strong>Estado:</strong> {{ getStatusText(selectedApplicant.status) }}</p>
            </div>
            <button class="btn-contratar" @click="contratar(selectedApplicant)">Contratar</button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
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
        1: Array.from({length: 15}, (_, i) => ({
          id: i+1,
          name: `Postulante Frontend ${i+1}`,
          career: ["Ingeniería en Sistemas", "Ingeniería en Software", "Diseño Web"][i%3],
          graduation: `${2022 + (i%4)}`,
          experience: `${(i%5)+1} año(s)`,
          email: `frontend${i+1}@live.uleam.edu.ec`,
          phone: `09${Math.floor(100000000 + Math.random()*899999999)}`,
          status: ["new", "reviewed", "interview"][i%3],
          applied: `2025-05-${15 + i}`
        })),
        2: Array.from({length: 8}, (_, i) => ({
          id: i+1,
          name: `Postulante Analista ${i+1}`,
          career: ["Administración de Sistemas", "Ingeniería en Sistemas"][i%2],
          graduation: `${2022 + (i%3)}`,
          experience: `${(i%4)+1} año(s)`,
          email: `analista${i+1}@live.uleam.edu.ec`,
          phone: `09${Math.floor(100000000 + Math.random()*899999999)}`,
          status: ["new", "reviewed", "interview"][i%3],
          applied: `2025-05-${20 + i}`
        })),
        3: Array.from({length: 22}, (_, i) => ({
          id: i+1,
          name: `Postulante Backend ${i+1}`,
          career: ["Ingeniería en Software", "Ingeniería en Sistemas"][i%2],
          graduation: `${2021 + (i%5)}`,
          experience: `${(i%6)+1} año(s)`,
          email: `backend${i+1}@live.uleam.edu.ec`,
          phone: `09${Math.floor(100000000 + Math.random()*899999999)}`,
          status: ["new", "reviewed", "interview"][i%3],
          applied: `2025-05-${10 + i}`
        })),
        4: Array.from({length: 12}, (_, i) => ({
          id: i+1,
          name: `Postulante Diseño ${i+1}`,
          career: ["Diseño Gráfico", "Diseño Web"][i%2],
          graduation: `${2023 + (i%2)}`,
          experience: `${(i%3)+1} año(s)`,
          email: `diseno${i+1}@live.uleam.edu.ec`,
          phone: `09${Math.floor(100000000 + Math.random()*899999999)}`,
          status: ["new", "reviewed", "interview"][i%3],
          applied: `2025-05-${25 + i}`
        }))
      },
      showModal: false,
      modalTitle: '',
      jobApplicants: [],
      showCVModal: false,
      selectedApplicant: {},
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
    viewCurriculum(applicant) {
      this.selectedApplicant = applicant;
      this.showCVModal = true;
    },
    closeCVModal() {
      this.showCVModal = false;
      this.selectedApplicant = {};
    },
    contratar(applicant) {
      alert(`Has contratado a ${applicant.name}`);
      this.closeCVModal();
    },
    logout() {
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      this.$router.push('/');
    },
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
      // Aquí puedes implementar la funcionalidad de edición en el futuro
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
/* Botón cerrar sesión integrado al header rojo */
.logout-btn {
  background: transparent;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 20px;
  padding: 0.5rem 1.3rem;
  font-size: 1.05rem;
  font-weight: bold;
  cursor: pointer;
  margin-left: 1.5rem;
  box-shadow: none;
  transition: background 0.2s, color 0.2s, border 0.2s;
}
.logout-btn:hover {
  background: #fff;
  color: #d32f2f;
  border: 2px solid #d32f2f;
}
/* Animación para el modal */
.fade-modal-enter-active, .fade-modal-leave-active {
  transition: opacity 0.3s;
}
.fade-modal-enter, .fade-modal-leave-to {
  opacity: 0;
}

/* Modal personalizado */
.custom-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.custom-modal-content {
  background: #fff;
  border-radius: 16px;
  padding: 2.5rem 2rem 2rem 2rem;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  position: relative;
  animation: modalPop 0.3s;
  max-height: 80vh;
  overflow-y: auto;
  overscroll-behavior: contain;
}
@keyframes modalPop {
  0% { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
@media (max-width: 700px) {
  .custom-modal-content {
    max-width: 98vw;
    padding: 1.2rem 0.5rem 1rem 0.5rem;
    font-size: 0.97rem;
  }
  .modal-title {
    font-size: 1.2rem;
  }
  .postulante-card {
    flex-direction: column;
    gap: 0.7rem;
    padding: 0.7rem 0.5rem;
  }
}
.modal-title {
  color: #d32f2f;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
}
.postulantes-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.postulante-card {
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 1.2rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: box-shadow 0.2s;
}
.postulante-card:hover {
  box-shadow: 0 4px 16px rgba(211,47,47,0.12);
}
.postulante-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.postulante-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #1976d2;
}
.postulante-meta {
  display: flex;
  gap: 1.5rem;
  font-size: 0.98rem;
  color: #555;
}
.postulante-actions {
  display: flex;
  align-items: center;
}
.btn-cv {
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}
.btn-cv:hover {
  background: #1565c0;
}
.cv-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}
.cv-modal-content {
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 2px 16px rgba(0,0,0,0.22);
  position: relative;
  text-align: left;
}
.cv-title {
  color: #1976d2;
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.cv-details p {
  margin-bottom: 0.5rem;
  color: #444;
}
.btn-contratar {
  background: #43a047;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.7rem 1.5rem;
  margin-top: 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}
.btn-contratar:hover {
  background: #388e3c;
}
/* Modal grande para postulantes y curriculum */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.modal-content {
  background: #fff;
  border-radius: 10px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 16px rgba(0,0,0,0.2);
  position: relative;
}
.postulante-item {
  margin-bottom: 1.2rem;
}
.btn-cv {
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.4rem 1rem;
  cursor: pointer;
}
.btn-cv:hover {
  background: #1565c0;
}
.cv-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}
.cv-modal-content {
  background: #fff;
  border-radius: 10px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 2px 16px rgba(0,0,0,0.22);
  position: relative;
  text-align: left;
}
.btn-contratar {
  background: #43a047;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1.2rem;
  margin-top: 1.5rem;
  cursor: pointer;
  font-size: 1rem;
}
.btn-contratar:hover {
  background: #388e3c;
}
/* Popup pequeño para nombres de postulantes */
#applicantsPopup.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.popup-content {
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem 2rem;
  min-width: 280px;
  max-width: 350px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.18);
  position: relative;
  text-align: left;
}
.popup-content .close {
  position: absolute;
  top: 8px;
  right: 16px;
  font-size: 1.7rem;
  cursor: pointer;
}
</style>
